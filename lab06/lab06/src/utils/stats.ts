export interface DistributionItem {
  value: number; // Значение случайной величины
  probability: number; // Вероятность
}

export interface ExperimentResult {
  n: number;
  empiricalMean: number;
  theoreticalMean: number;
  meanErrorPercent: number;

  empiricalVariance: number;
  theoreticalVariance: number;
  varianceErrorPercent: number;

  chiSquared: number;
  chiCritical: number;
  isHypothesisAccepted: boolean;

  empiricalProbs: Record<number, number>;
}

// Генерация равномерного случайного числа [0, 1)
const random = () => Math.random();

/**
 * Генерация ДСВ по заданному ряду распределения (Метод интервалов)
 */
export const generateDiscreteRV = (distribution: DistributionItem[],): number => {
  const r = random();
  let cumulative = 0;

  for (const item of distribution) {
    cumulative += item.probability;
    // Используем небольшое epsilon для защиты от ошибок округления float
    if (r < cumulative - 1e-9 ||(Math.abs(r - cumulative) < 1e-9 && item === distribution[distribution.length - 1])) {
      return item.value;
    }
  }
  return distribution[distribution.length - 1].value;
};

/**
 * Расчет теоретических характеристик
 * E = Σ xi * pi
 * D = Σ xi^2 * pi - E^2
 */
export const calculateTheoreticalStats = (distribution: DistributionItem[]) => {
  // Мат. ожидание 
  const mean = distribution.reduce( 
    (acc, item) => acc + item.value * item.probability,
    0,
  );
  const meanSq = distribution.reduce(
    (acc, item) => acc + Math.pow(item.value, 2) * item.probability,
    0,
  );

  // Дисперсия
  const variance = meanSq - Math.pow(mean, 2);
  return { mean, variance };
};

/**
 * Запуск серии экспериментов для одного N
 */
const runSingleExperiment = (distribution: DistributionItem[],n: number,): Omit<ExperimentResult, "n"> => {
  const counts: Record<number, number> = {};
  // Заполняем нулями
  distribution.forEach((item) => (counts[item.value] = 0));

  // Накопление сумм для среднего
  let sumX = 0;
  let sumX2 = 0;

  // Генерация выборки
for (let i = 0; i < n; i++) {
  const val = generateDiscreteRV(distribution);
  counts[val]++; // Считаем частоты (n_i)
  sumX += val; // Копим сумму для среднего
  sumX2 += val * val; // Копим сумму квадратов для дисперсии
}

  // Эмпирические вероятности(ряд)
  const empiricalProbs: Record<number, number> = {};
  distribution.forEach((item) => {
    empiricalProbs[item.value] = counts[item.value] / n;
  });

  // Эмпирическое среднее и дисперсия
  const empiricalMean = sumX / n;
  // Формула дисперсии: E[X^2] - (E[X])^2
  const empiricalVariance = sumX2 / n - Math.pow(empiricalMean, 2);

  // Теоретические значения
  const { mean: theoMean, variance: theoVar } =
    calculateTheoreticalStats(distribution);

  // Относительные погрешности (%)
  const meanErrorPercent =
    theoMean !== 0 ? Math.abs((empiricalMean - theoMean) / theoMean) * 100 : 0;

  const varianceErrorPercent =
    theoVar !== 0 ? Math.abs((empiricalVariance - theoVar) / theoVar) * 100 : 0;

  // Критерий Хи-квадрат
  // X^2 = Σ (ni - N*pi)^2 / (N*pi)
  let chiSquared = 0;
  distribution.forEach((item) => {
    const observed = counts[item.value]; // Наблюдаемая частота
    const expected = n * item.probability; // Ожидаемая частота
    if (expected > 0) {
      chiSquared += Math.pow(observed - expected, 2) / expected;
    }
  });

  // Степени свободы k = m - 1 (m - количество значений) (Сравнение с крит.значением)
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
    isHypothesisAccepted: chiSquared <= chiCritical, // Принята ли гипотеза
    empiricalProbs,
  };
};

/**
 * Таблица критических значений χ² для α = 0.05
 * Значения взяты из стандартных таблиц распределения Пирсона
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
  return table[df] || 25.0; // Аппроксимация для больших df
};

/**
 * Главная функция запуска для всех требуемых N
 */
export const runFullSimulation = (distribution: DistributionItem[],): ExperimentResult[] => {
  const ns = [10, 100, 1000, 10000];
  return ns.map((n) => ({
    n,
    ...runSingleExperiment(distribution, n),
  }));
};


// --- НОВАЯ ЧАСТЬ: НОРМАЛЬНОЕ РАСПРЕДЕЛЕНИЕ ---

export interface NormalStats {
  mean: number;
  variance: number;
  histogramData: { binStart: number; count: number; frequency: number; theoreticalProb: number }[];
  chiSquared: number;
  chiCritical: number;
  isHypothesisAccepted: boolean;
}

/**
 * Генератор нормальной случайной величины (Метод Бокса-Мюллера)
 * Возвращает число с мат. ожиданием 0 и дисперсией 1.
 * Для общих параметров: X = mu + sigma * Z
 */
export const generateNormalRV = (mu: number = 0, sigma: number = 1): number => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mu + sigma * z;
};

/**
 * Расчет статистики для нормальной величины и построение гистограммы
 * @param n Объем выборки
 * @param mu Мат. ожидание (по умолчанию 0)
 * @param sigma Стандартное отклонение (по умолчанию 1)
 * @param binCount Количество столбцов гистограммы (по умолчанию 15-20)
 */

export const runNormalExperiment = (
  n: number, 
  mu: number = 0, 
  sigma: number = 1, 
  binCount: number = 20
): NormalStats => {
  const samples: number[] = [];
  
  // Генерация выборки
  for (let i = 0; i < n; i++) {
    samples.push(generateNormalRV(mu, sigma));
  }

  // Выборочные характеристики
  const sampleMean = samples.reduce((a, b) => a + b, 0) / n;
  const sampleVariance = samples.reduce((acc, val) => acc + Math.pow(val - sampleMean, 2), 0) / n;

  // Построение гистограммы
  // Находим мин и макс для определения диапазона (или берем +/- 4 сигмы для красоты)
  const minVal = Math.min(...samples);
  const maxVal = Math.max(...samples);
  // Расширяем диапазон немного, чтобы крайние значения попали внутрь
  const rangeMin = Math.min(minVal, mu - 4 * sigma);
  const rangeMax = Math.max(maxVal, mu + 4 * sigma);
  const binWidth = (rangeMax - rangeMin) / binCount;

  const bins = new Array(binCount).fill(0);
  
  samples.forEach(val => {
    const binIndex = Math.floor((val - rangeMin) / binWidth);
    // Защита от выхода за границы из-за погрешностей
    if (binIndex >= 0 && binIndex < binCount) {
      bins[binIndex]++;
    } else if (binIndex === binCount) {
      bins[binCount - 1]++; // Последний бин включает правую границу
    }
  });

  // Расчет теоретических вероятностей и критерия хи-квадрат
  let chiSquared = 0;
  const histogramData = bins.map((count, i) => {
    const binStart = rangeMin + i * binWidth;
    const binEnd = binStart + binWidth;
    
    // Теоретическая вероятность попадания в интервал [binStart, binEnd]
    // Используем функцию распределения Phi (CDF) нормального закона
    const pStart = normalCDF(binStart, mu, sigma);
    const pEnd = normalCDF(binEnd, mu, sigma);
    const theoreticalProb = pEnd - pStart;
    
    const expected = n * theoreticalProb;
    
    if (expected > 0) {
      chiSquared += Math.pow(count - expected, 2) / expected;
    }

    return {
      binStart,
      count,
      frequency: count / n,
      theoreticalProb
    };
  });

  // Степени свободы: k = m - 1 - r (где r=2, т.к. оценили mu и sigma по выборке)

  const degreesOfFreedom = Math.max(1, binCount - 3); 
  const chiCritical = getChiCriticalValue(degreesOfFreedom);

  return {
    mean: sampleMean,
    variance: sampleVariance,
    histogramData,
    chiSquared,
    chiCritical,
    isHypothesisAccepted: chiSquared <= chiCritical
  };
};

/**
 * Функция распределения (CDF) стандартного нормального закона
 * Приближение через функцию ошибок (erf)
 */
const normalCDF = (x: number, mu: number, sigma: number): number => {
  const z = (x - mu) / (sigma * Math.SQRT2);
  return 0.5 * (1 + erf(z));
};

/**
 * Аппроксимация функции ошибок (erf)
 */
const erf = (z: number): number => {
  const sign = z >= 0 ? 1 : -1;
  z = Math.abs(z);
  
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const t = 1.0 / (1.0 + p * z);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

  return sign * y;
};