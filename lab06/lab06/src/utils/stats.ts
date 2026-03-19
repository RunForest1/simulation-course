/**
 * 1. Дискретные случайные величины (ДСВ)
 * 2. Нормальное распределение (Метод Бокса-Мюллера)
 */

export interface DistributionItem {
  value: number; // xi: Возможное значение случайной величины
  probability: number; // pi: Вероятность появления этого значения (0 <= pi <= 1)
}

export interface ExperimentResult {
  n: number; // Объем выборки (количество экспериментов)

  empiricalMean: number; // Выборочное среднее
  theoreticalMean: number; // Теоретическое мат. ожидание
  meanErrorPercent: number; // Относительная погрешность среднего (%)

  empiricalVariance: number; // Выборочная дисперсия 
  theoreticalVariance: number; // Теоретическая дисперсия
  varianceErrorPercent: number; // Относительная погрешность дисперсии 

  // Критерий согласия Пирсона (Хи-квадрат)
  chiSquared: number; // Расчетное значение статистики χ²
  chiCritical: number; // Табличное (критическое) значение χ² для α=0.05
  isHypothesisAccepted: boolean; // true, если гипотеза о соответствии принята (χ² ≤ χ²_crit)

  // Эмпирический ряд распределения (частости)
  empiricalProbs: Record<number, number>;
}

export interface NormalStats {
  mean: number; // Выборочное среднее
  variance: number; // Выборочная дисперсия
  
  // Данные для построения гистограммы
  histogramData: {
    binStart: number; // Левая граница интервала
    count: number; // Абсолютная частота (сколько значений попало в интервал)
    frequency: number; // Относительная частота (count / n)
    theoreticalProb: number; // Теоретическая вероятность попадания в этот интервал
  }[];
  chiSquared: number; // Статистика χ² для проверки нормальности
  chiCritical: number; // Критическое значение χ²
  isHypothesisAccepted: boolean;
}

/**
 * Генерация псевдослучайного числа в диапазоне [0, 1)
 */
const random = () => Math.random();

/**
 * Таблица критических значений распределения Хи-квадрат (χ²)
 * Уровень значимости α = 0.05 (доверительная вероятность 95%)
 * @param df - степени свободы (degrees of freedom)
 */
const getChiCriticalValue = (df: number): number => {
  const table: Record<number, number> = {
    1: 3.841,
    2: 5.991,
    3: 7.815,
    4: 9.488,
    5: 11.07,
    6: 12.592,
    7: 14.067,
    8: 15.507,
    9: 16.919,
    10: 18.307,
    11: 19.675,
    12: 21.026,
    13: 22.362,
    14: 23.685,
    15: 24.996,
  };
  // Для df > 15 возвращаем аппроксимированное значение или последнее из таблицы
  return table[df] || 25.0;
};

// ДИСКРЕТНАЯ СЛУЧАЙНАЯ ВЕЛИЧИНА 

/**
 * Генерация реализаций ДСВ методом интервалов (обратная функция)
 * Алгоритм:
 * 1. Строим накопленную сумму вероятностей (функцию распределения F(x)).
 * 2. Генерируем равномерное число r ∈ [0, 1).
 * 3. Находим первое значение xi, для которого F(xi) > r.
 *
 * @param distribution - Ряд распределения [{value, probability}, ...]
 * @returns Сгенерированное значение случайной величины
 */
export const generateDiscreteRV = (
  distribution: DistributionItem[],
): number => {
  const r = random();
  let cumulative = 0;

  for (const item of distribution) {
    cumulative += item.probability;
    // Проверка попадания в интервал с учетом погрешности (epsilon)
    if (
      r < cumulative - 1e-9 ||
      (Math.abs(r - cumulative) < 1e-9 &&
        item === distribution[distribution.length - 1])
    ) {
      return item.value;
    }
  }
  // Возвращаем последнее значение на случай ошибок округления суммы вероятностей до < 1
  return distribution[distribution.length - 1].value;
};

/**
 * Расчет теоретических числовых характеристик ДСВ
 * Мат. ожидание: E[X] = Σ (xi * pi)
 * Дисперсия:      Var(X) = E[X²] - (E[X])² = Σ (xi² * pi) - (E[X])²
 *
 * @param distribution - Ряд распределения
 * @returns Объект { mean: E[X], variance: Var(X) }
 */
export const calculateTheoreticalStats = (distribution: DistributionItem[]) => {
  const mean = distribution.reduce(
    (acc, item) => acc + item.value * item.probability,
    0,
  );

  const meanSq = distribution.reduce(
    (acc, item) => acc + Math.pow(item.value, 2) * item.probability,
    0,
  );

  const variance = meanSq - Math.pow(mean, 2);
  return { mean, variance };
};

/**
 * Проведение серии экспериментов для одного объема выборки N
 * Вычисляет эмпирические характеристики и сравнивает их с теоретическими.
 *
 * @param distribution - Исходный ряд распределения
 * @param n - Количество испытаний (объем выборки)
 */
const runSingleExperiment = (
  distribution: DistributionItem[],
  n: number,
): Omit<ExperimentResult, "n"> => {
  const counts: Record<number, number> = {};
  distribution.forEach((item) => (counts[item.value] = 0));

  let sumX = 0; // Σ xi (для среднего)
  let sumX2 = 0; // Σ xi² (для дисперсии)

  // Генерация выборки
  for (let i = 0; i < n; i++) {
    const val = generateDiscreteRV(distribution);
    counts[val]++;
    sumX += val;
    sumX2 += val * val;
  }

  // Расчет эмпирических вероятностей (частостей)
  const empiricalProbs: Record<number, number> = {};
  distribution.forEach((item) => {
    empiricalProbs[item.value] = counts[item.value] / n;
  });

  // Расчет эмпирических характеристик
  const empiricalMean = sumX / n;
  const empiricalVariance = sumX2 / n - Math.pow(empiricalMean, 2);

  // Получение теоретических характеристик
  const { mean: theoMean, variance: theoVar } =
    calculateTheoreticalStats(distribution);

  // Расчет относительных погрешностей (%)
  const meanErrorPercent =
    theoMean !== 0 ? Math.abs((empiricalMean - theoMean) / theoMean) * 100 : 0;

  const varianceErrorPercent =
    theoVar !== 0 ? Math.abs((empiricalVariance - theoVar) / theoVar) * 100 : 0;

  // Расчет критерия Хи-квадрат Пирсона
  // Формула: χ² = Σ ((ni - N*pi)² / (N*pi))
  // где ni - наблюдаемая частота, N*pi - ожидаемая частота
  let chiSquared = 0;
  distribution.forEach((item) => {
    const observed = counts[item.value];
    const expected = n * item.probability;
    if (expected > 0) {
      chiSquared += Math.pow(observed - expected, 2) / expected;
    }
  });

  // Сравнение с критическим значением
  // Степени свободы k = m - 1, где m - количество различных значений
  const degreesOfFreedom = distribution.length - 1;
  const chiCritical = getChiCriticalValue(degreesOfFreedom);

  return {
    empiricalMean,
    theoreticalMean: theoMean,
    meanErrorPercent,
    empiricalVariance,
    theoreticalVariance: theoVar,
    varianceErrorPercent,
    chiSquared,
    chiCritical,
    isHypothesisAccepted: chiSquared <= chiCritical,
    empiricalProbs,
  };
};

/**
 * Запуск полного цикла моделирования для стандартных объемов выборок
 * @param distribution - Ряд распределения
 * @returns Массив результатов для N = [10, 100, 1000, 10000]
 */
export const runFullSimulation = (
  distribution: DistributionItem[],
): ExperimentResult[] => {
  const ns = [10, 100, 1000, 10000];
  return ns.map((n) => ({
    n,
    ...runSingleExperiment(distribution, n),
  }));
};

// НЕПРЕРЫВНОЕ (НОРМАЛЬНОЕ) РАСПРЕДЕЛЕНИЕ

/**
 * Генератор нормальной случайной величины методом Бокса-Мюллера
 * Преобразует две независимые равномерные величины U1, U2 ~ U(0,1)
 * в две независимые нормальные Z1, Z2 ~ N(0,1).
 *
 * Формула: Z = sqrt(-2*ln(U1)) * cos(2*π*U2)
 * Для произвольных параметров: X = μ + σ * Z
 *
 * @param mu - Математическое ожидание (μ)
 * @param sigma - Среднеквадратичное отклонение (σ)
 * @returns Случайное число с распределением N(μ, σ²)
 */
export const generateNormalRV = (mu: number = 0, sigma: number = 1): number => {
  let u = 0,
    v = 0;
  // Избегаем ln(0)
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mu + sigma * z;
};

/**
 * Функция распределения нормального закона через функцию ошибок
 * Φ(x) = 0.5 * (1 + erf((x - μ) / (σ * √2)))
 */
const normalCDF = (x: number, mu: number, sigma: number): number => {
  const z = (x - mu) / (sigma * Math.SQRT2);
  return 0.5 * (1 + erf(z));
};

/**
 * Аппроксимация функции ошибок (erf) с высокой точностью
 * Используется разложение, предложенное в численных методах
 */
const erf = (z: number): number => {
  const sign = z >= 0 ? 1 : -1;
  z = Math.abs(z);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * z);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

  return sign * y;
};

/**
 * Основной эксперимент для нормального распределения
 * 1. Генерирует выборку объема N.
 * 2. Строит группированный вариационный ряд (гистограмму).
 * 3. Сравнивает эмпирические частоты с теоретическими вероятностями через χ².
 *
 * @param n - Объем выборки
 * @param mu - Параметры генеральной совокупности (μ)
 * @param sigma - Параметры генеральной совокупности (σ)
 * @param binCount - Количество интервалов группировки (m)
 */
export const runNormalExperiment = (
  n: number,
  mu: number = 0,
  sigma: number = 1,
  binCount: number = 20,
): NormalStats => {
  const samples: number[] = [];

  // Генерация выборки
  for (let i = 0; i < n; i++) {
    samples.push(generateNormalRV(mu, sigma));
  }

  // Выборочные характеристики
  const sampleMean = samples.reduce((a, b) => a + b, 0) / n;
  const sampleVariance =
    samples.reduce((acc, val) => acc + Math.pow(val - sampleMean, 2), 0) / n;

  // Определение диапазона для гистограммы
  const minVal = Math.min(...samples);
  const maxVal = Math.max(...samples);
  const rangeMin = Math.min(minVal, mu - 4 * sigma);
  const rangeMax = Math.max(maxVal, mu + 4 * sigma);
  const binWidth = (rangeMax - rangeMin) / binCount;

  // Заполнение интервалов (бинов)
  const bins = new Array(binCount).fill(0);

  samples.forEach((val) => {
    // Индекс бина: floor((x - min) / width)
    const binIndex = Math.floor((val - rangeMin) / binWidth);

    // Коррекция граничных случаев
    if (binIndex >= 0 && binIndex < binCount) {
      bins[binIndex]++;
    } else if (binIndex === binCount) {
      bins[binCount - 1]++;
    }
  });

  // Расчет χ² и подготовка данных для графика
  let chiSquared = 0;
  const histogramData = bins.map((count, i) => {
    const binStart = rangeMin + i * binWidth;
    const binEnd = binStart + binWidth;

    // Теоретическая вероятность попадания в интервал [binStart, binEnd]:
    // P = Φ(binEnd) - Φ(binStart)
    const pStart = normalCDF(binStart, mu, sigma);
    const pEnd = normalCDF(binEnd, mu, sigma);
    const theoreticalProb = pEnd - pStart;

    const expected = n * theoreticalProb; // Ожидаемая частота

    if (expected > 0) {
      chiSquared += Math.pow(count - expected, 2) / expected;
    }

    return {
      binStart,
      count,
      frequency: count / n,
      theoreticalProb,
    };
  });

  // Определение степеней свободы
  // k = m - 1 - r, где m - число бинов, r - число оцененных параметров (μ и σ оценили по выборке => r=2)
  const degreesOfFreedom = Math.max(1, binCount - 3);
  const chiCritical = getChiCriticalValue(degreesOfFreedom);

  return {
    mean: sampleMean,
    variance: sampleVariance,
    histogramData,
    chiSquared,
    chiCritical,
    isHypothesisAccepted: chiSquared <= chiCritical,
  };
};
