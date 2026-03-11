import React, { useState, useMemo } from 'react';
import {
  runFullSimulation,
  calculateTheoreticalStats,
  runNormalExperiment,
  type DistributionItem,
  type ExperimentResult,
  type NormalStats
} from './utils/stats';

// Импорт компонентов для Части 1 (ДСВ)
import { DistributionInput } from './components/DistributionInput';
import { StatsSummary } from './components/StatsSummary';
import { ResultsTable } from './components/ResultsTable';
import { Conclusion } from './components/Conclusion';

// Импорт компонента для Части 2 (Нормальное распределение)
import { NormalHistogram } from './components/NormalHistogram';

const INITIAL_DIST: DistributionItem[] = [
  { value: 1, probability: 0.264 },
  { value: 2, probability: 0.128 },
  { value: 3, probability: 0.228 },
  { value: 4, probability: 0.207 },
  { value: 5, probability: 0.173 },
];

const App: React.FC = () => {
  // ============================
  // Состояние для Части 1: ДСВ
  // ============================
  const [distribution, setDistribution] = useState<DistributionItem[]>(INITIAL_DIST);
  const [results, setResults] = useState<ExperimentResult[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // ============================
  // Состояние для Части 2: Нормальное распределение
  // ============================
  const [normalResults, setNormalResults] = useState<Record<number, NormalStats> | null>(null);
  const [isNormalCalculating, setIsNormalCalculating] = useState(false);

  // Обработчик изменения вероятностей с нормализацией (Часть 1)
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

  // Запуск эксперимента для ДСВ (Часть 1)
  const startSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const data = runFullSimulation(distribution);
      setResults(data);
      setIsCalculating(false);
    }, 50);
  };

  // Запуск эксперимента для нормального распределения (Часть 2)
  const startNormalSimulation = () => {
    setIsNormalCalculating(true);
    setTimeout(() => {
      const ns = [10, 100, 1000, 10000];
      const results: Record<number, NormalStats> = {};
      ns.forEach(n => {
        results[n] = runNormalExperiment(n, 0, 1); // N(0, 1)
      });
      setNormalResults(results);
      setIsNormalCalculating(false);
    }, 100);
  };

  // Теоретические характеристики для ДСВ (мемоизация)
  const theoreticalStats = useMemo(() => calculateTheoreticalStats(distribution), [distribution]);
  const totalProb = distribution.reduce((acc, i) => acc + i.probability, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ============================
            ОБЩИЙ ЗАГОЛОВОК ЛАБОРАТОРНОЙ
            ============================ */}
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

          {/* Панель управления для нормальной величины */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-600 mb-4">
              Генерация нормально распределенной величины <strong>N(0, 1)</strong> методом Бокса-Мюллера.
              Построение гистограмм и проверка гипотезы о нормальности распределения с помощью критерия χ².
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="text-sm text-slate-500">
                Параметры: μ = 0, σ = 1, количество бинов = 20
              </div>
              <button
                onClick={startNormalSimulation}
                disabled={isNormalCalculating}
                className={`px-6 py-2.5 rounded-lg font-semibold text-white shadow-md transition-all ${isNormalCalculating
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
                  }`}
              >
                {isNormalCalculating ? 'Расчет...' : 'Смоделировать'}
              </button>
            </div>
          </div>

          {/* Результаты: гистограммы */}
          {normalResults && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-medium text-slate-700">Гистограммы распределения при разных объёмах выборки:</h3>

              {/* Сетка 2×2 для гистограмм */}
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

              {/* Вывод по второй части */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                <h4 className="font-bold text-emerald-900 mb-2">Вывод:</h4>
                <p className="text-emerald-800 text-sm leading-relaxed">
                  При малых <strong>N</strong> (10, 100) гистограмма имеет нерегулярную форму,
                  существенно отличающуюся от теоретической кривой Гаусса.
                  С ростом <strong>N</strong> (до 1000 и 10000) эмпирическое распределение всё точнее
                  аппроксимирует нормальный закон: выборочные характеристики сходятся к теоретическим
                  (μ=0, σ²=1), а критерий χ² подтверждает гипотезу о нормальности.
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