import React, { useState } from 'react';
import { CustomRNG } from './utils/rng';
import { calculateStats, SAMPLE_SIZE, THEORETICAL_MEAN, THEORETICAL_VARIANCE } from './utils/stats';
import type { ComparisonData } from './types';

// Импорт компонентов
import ParamsCard from './components/ParamsCard';
import ResultsTable from './components/ResultsTable';
import ConclusionBlock from './components/ConclusionBlock';

const App: React.FC = () => {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const runSimulation = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const seed = Date.now();

      // Кастомный генератор
      const customRng = new CustomRNG(seed);
      const customValues = new Array(SAMPLE_SIZE);
      let t0 = performance.now();
      for (let i = 0; i < SAMPLE_SIZE; i++) {
        customValues[i] = customRng.next();
      }
      const customStats = calculateStats(customValues, t0);

      // Встроенный генератор
      const builtInValues = new Array(SAMPLE_SIZE);
      t0 = performance.now();
      for (let i = 0; i < SAMPLE_SIZE; i++) {
        builtInValues[i] = Math.random();
      }
      const builtInStats = calculateStats(builtInValues, t0);

      setData({
        theoreticalMean: THEORETICAL_MEAN,
        theoreticalVariance: THEORETICAL_VARIANCE,
        custom: customStats,
        builtIn: builtInStats
      });
      setIsCalculating(false);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">

        {/* Заголовок */}
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Лабораторная работа: Стохастическое моделирование
          </h1>
          <p className="text-indigo-100 mt-1">
            Сравнение базового датчика и встроенного генератора
          </p>
        </div>

        <div className="p-6">
          {/* Параметры */}
          <ParamsCard />

          {/* Кнопка */}
          <div className="flex justify-center mb-8">
            <button
              onClick={runSimulation}
              disabled={isCalculating}
              className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${isCalculating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                }`}
            >
              {isCalculating ? 'Вычисление...' : 'Запустить моделирование'}
            </button>
          </div>

          {/* Результаты и Выводы */}
          {data && (
            <>
              <ResultsTable data={data} />
              <ConclusionBlock data={data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;