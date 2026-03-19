import { useState, useMemo } from 'react';
import { PoissonControls } from './components/PoissonControls';
import { StatsCard } from './components/StatsCard';
import { DistributionChart } from './components/DistributionChart';
import { ConclusionBlock } from './components/ConclusionBlock';
import { runSimulation, calculateStats, type SimulationStats } from './utils/poissonMath';

function App() {
  // Параметры
  const [lambda, setLambda] = useState<number>(2.0);
  const [T, setT] = useState<number>(5.0);
  const [intervalsCount, setIntervalsCount] = useState<number>(1000);

  // Состояние
  const [results, setResults] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Запуск
  const handleRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newResults = runSimulation(lambda, T, intervalsCount);
      setResults(newResults);
      setIsSimulating(false);
    }, 50);
  };

  // Статистика
  const stats: SimulationStats = useMemo(() =>
    calculateStats(results, lambda, T),
    [results, lambda, T]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Пуассоновский поток событий</h1>
          <p className="text-gray-600 mt-2">
            Моделирование потока заявок на сервер. Анализ распределения числа заявок за интервал времени $T$.
          </p>
        </header>

        <PoissonControls
          lambda={lambda} setLambda={setLambda}
          T={T} setT={setT}
          intervalsCount={intervalsCount} setIntervalsCount={setIntervalsCount}
          onRun={handleRun}
          isSimulating={isSimulating}
        />

        {results.length > 0 && (
          <>
            {/* Сетка статистики */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                label="Среднее (эмпирическое)"
                value={stats.mean}
                theory={stats.theoreticalMean}
                colorClass="border-blue-500 text-blue-700 bg-blue-50"
              />
              <StatsCard
                label="Дисперсия (эмпирическая)"
                value={stats.variance}
                theory={stats.theoreticalVariance}
                colorClass="border-purple-500 text-purple-700 bg-purple-50"
              />
              <StatsCard
                label="Теор. среднее (&lambda;T)"
                value={stats.theoreticalMean}
                colorClass="border-gray-300 text-gray-600 bg-gray-50"
              />
              <StatsCard
                label="Теор. дисперсия (&lambda;T)"
                value={stats.theoreticalVariance}
                colorClass="border-gray-300 text-gray-600 bg-gray-50"
              />
            </section>

            {/* График */}
            <DistributionChart stats={stats} />

            {/* Вывод */}
            <ConclusionBlock
              stats={stats}
              lambda={lambda}
              T={T}
              intervalsCount={intervalsCount}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;