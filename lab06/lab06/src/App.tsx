import React, { useState, useMemo } from 'react';
import {
  runFullSimulation,
  calculateTheoreticalStats,
  runNormalExperiment,
  type DistributionItem,
  type ExperimentResult,
  type NormalStats
} from './utils/stats';

// Импорт компонентов для  (ДСВ)
import { DistributionInput } from './components/DistributionInput';
import { StatsSummary } from './components/StatsSummary';
import { ResultsTable } from './components/ResultsTable';
import { Conclusion } from './components/Conclusion';

// Импорт компонента для (Нормальное распределение)
import { NormalHistogram } from './components/NormalHistogram';
import { DiscreteDistributionChart } from './components/DiscreteDistributionChart';

const INITIAL_DIST: DistributionItem[] = [
  { value: 1, probability: 0.264 },
  { value: 2, probability: 0.128 },
  { value: 3, probability: 0.228 },
  { value: 4, probability: 0.207 },
  { value: 5, probability: 0.173 },
];

const App: React.FC = () => {
  // Состояние для ДСВ
  const [distribution, setDistribution] = useState<DistributionItem[]>(INITIAL_DIST);
  const [results, setResults] = useState<ExperimentResult[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Состояние для Нормальное распределение
  const [normalResults, setNormalResults] = useState<Record<number, NormalStats> | null>(null);
  const [isNormalCalculating, setIsNormalCalculating] = useState(false);

  // Поля состояния для параметров нормального распределения
  const [normalMean, setNormalMean] = useState<string>('0');
  const [normalVariance, setNormalVariance] = useState<string>('1');
  const [binCount, setBinCount] = useState<string>('20');

  // Обработчик изменения вероятностей с нормализацией 
  const handleProbChange = (index: number, val: string) => {
    const newDist = [...distribution];
    const prob = parseFloat(val);

    if (!isNaN(prob) && prob >= 0) {
      newDist[index] = { ...newDist[index], probability: prob };

      const sum = newDist.reduce((acc, item) => acc + item.probability, 0);
      if (sum > 0) {
        const normalized = newDist.map(item => ({
          ...item,
          probability: item.probability / sum
        }));
        setDistribution(normalized);
      } else {
        setDistribution(newDist);
      }
      setResults(null); // Сброс результатов при изменении входных данных
    }
  };

  // Запуск эксперимента для ДСВ 
  const startSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const data = runFullSimulation(distribution);
      setResults(data);
      setIsCalculating(false);
    }, 50);
  };

  // Запуск эксперимента для нормального распределения 
  const startNormalSimulation = () => {
    const mu = parseFloat(normalMean);
    const variance = parseFloat(normalVariance);
    const bins = parseInt(binCount);

    if (isNaN(mu) || isNaN(variance) || isNaN(bins) || variance <= 0 || bins <= 0) {
      alert("Пожалуйста, введите корректные числовые значения. Дисперсия и количество бинов должны быть больше 0.");
      return;
    }

    const sigma = Math.sqrt(variance);

    setIsNormalCalculating(true);
    setTimeout(() => {
      const ns = [10, 100, 1000, 10000];
      const results: Record<number, NormalStats> = {};
      ns.forEach(n => {
        results[n] = runNormalExperiment(n, mu, sigma, bins);
      });
      setNormalResults(results);
      setIsNormalCalculating(false);
    }, 100);
  };

  // Теоретические характеристики для ДСВ
  const theoreticalStats = useMemo(() => calculateTheoreticalStats(distribution), [distribution]);
  const totalProb = distribution.reduce((acc, i) => acc + i.probability, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        <header className="mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
            Лабораторная 6: Моделирование случайных величин
          </h1>
          <p className="text-slate-500 mt-2">
            Часть 1: Дискретные величины | Часть 2: Нормальное распределение
          </p>
        </header>

        {/* =====================================================
            ЧАСТЬ 1: ДИСКРЕТНАЯ СЛУЧАЙНАЯ ВЕЛИЧИНА
            ===================================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              Часть 1
            </span>
            <h2 className="text-xl font-bold text-indigo-800">
              Дискретная случайная величина
            </h2>
          </div>

          <DistributionInput
            distribution={distribution}
            onChange={handleProbChange}
            totalProb={totalProb}
          />

          <div className="-mt-4">
            <StatsSummary
              theoreticalMean={theoreticalStats.mean}
              theoreticalVariance={theoreticalStats.variance}
              isCalculating={isCalculating}
              onStart={startSimulation}
            />
          </div>

          {results && (
            <div className="space-y-6 animate-fade-in-up">
              <ResultsTable results={results} />
              {/* Добавляем график для дискретного распределения */}
              <DiscreteDistributionChart results={results} distribution={distribution} />
              <Conclusion />
            </div>
          )}
        </section>

        {/* =====================================================
            ЧАСТЬ 2: НОРМАЛЬНОЕ РАСПРЕДЕЛЕНИЕ
            ===================================================== */}
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Часть 2
            </span>
            <h2 className="text-xl font-bold text-indigo-800">
              Нормальная случайная величина
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-600 mb-4">
              Генерация нормально распределенной величины методом Бокса-Мюллера.
              Построение гистограмм и проверка гипотезы о нормальности распределения с помощью критерия χ².
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="mean-input" className="block text-sm font-medium text-slate-700 mb-1">
                  Среднее (μ)
                </label>
                <input
                  id="mean-input"
                  type="number"
                  step="any"
                  value={normalMean}
                  onChange={(e) => setNormalMean(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="variance-input" className="block text-sm font-medium text-slate-700 mb-1">
                  Дисперсия (σ²)
                </label>
                <input
                  id="variance-input"
                  type="number"
                  step="any"
                  value={normalVariance}
                  onChange={(e) => setNormalVariance(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="bins-input" className="block text-sm font-medium text-slate-700 mb-1">
                  Кол-во гистограмм
                </label>
                <input
                  id="bins-input"
                  type="number"
                  min="1"
                  value={binCount}
                  onChange={(e) => setBinCount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={startNormalSimulation}
              disabled={isNormalCalculating}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-white shadow-md transition-all ${isNormalCalculating
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
                }`}
            >
              {isNormalCalculating ? 'Расчет...' : 'Смоделировать'}
            </button>
          </div>

          {normalResults && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-medium text-slate-700">Гистограммы распределения при разных объёмах выборки:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[10, 100, 1000, 10000].map(n => (
                  <NormalHistogram
                    key={n}
                    n={n}
                    stats={normalResults[n]}
                    title={`N = ${n.toLocaleString()}`}
                  />
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                <h4 className="font-bold text-emerald-900 mb-2">Вывод:</h4>
                <p className="text-emerald-800 text-sm leading-relaxed">
                  При малых <strong>N</strong> (10, 100) гистограмма имеет нерегулярную форму,
                  существенно отличающуюся от теоретической кривой Гаусса.
                  С ростом <strong>N</strong> (до 1000 и 10000) эмпирическое распределение всё точнее
                  аппроксимирует нормальный закон: выборочные характеристики сходятся к теоретическим,
                  а критерий χ² подтверждает гипотезу о нормальности.
                  Это демонстрирует действие <strong>центральной предельной теоремы</strong>
                  и корректность метода Бокса-Мюллера.
                </p>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default App;