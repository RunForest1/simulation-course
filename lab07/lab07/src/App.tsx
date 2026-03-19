import { useState, useEffect, useRef, useMemo } from 'react';
import { type WeatherState } from './types/weather';
import { getNextState, calculateStationaryDistribution } from './utils/markov';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Controls } from './components/Controls';
import { TransitionMatrix } from './components/TransitionMatrix';
import { StatisticsTable } from './components/StatisticsTable';
import { AnalysisSummary } from './components/AnalysisSummary';

export default function App() {
  const [currentState, setCurrentState] = useState<WeatherState>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [dayCount, setDayCount] = useState(0);
  const [stats, setStats] = useState<[number, number, number]>([0, 0, 0]);

  const timerRef = useRef<number | null>(null);
  const speed = 800;

  // Теоретическое распределение (вычисляем один раз при монтировании)
  const theoreticalDist = useMemo(() => calculateStationaryDistribution(), []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setCurrentState((prev) => {
          const next = getNextState(prev);

          setStats((prevStats) => {
            const newStats = [...prevStats] as [number, number, number];
            newStats[next - 1]++;
            return newStats;
          });

          setDayCount((d) => d + 1);
          return next;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentState(1);
    setDayCount(0);
    setStats([0, 0, 0]);
  };

  // Подготовка данных для таблицы статистики
  const statsData = useMemo(() => {
    return [0, 1, 2].map((idx) => {
      const state = (idx + 1) as WeatherState;
      const count = stats[idx];
      const empirical = dayCount > 0 ? count / dayCount : 0;
      const theoretical = theoreticalDist[idx];
      return {
        state,
        count,
        empirical,
        theoretical,
        error: Math.abs(theoretical - empirical),
      };
    });
  }, [stats, dayCount, theoreticalDist]);

  const maxError = Math.max(...statsData.map(d => d.error));

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Лабораторная №7: Марковская модель погоды</h1>
          <p className="text-slate-600 mt-2">
            Моделирование дискретной цепи Маркова с визуализацией в реальном времени.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <WeatherDisplay dayCount={dayCount} currentState={currentState} />
            <Controls
              isRunning={isRunning}
              onToggle={() => setIsRunning(!isRunning)}
              onReset={handleReset}
            />
          </div>
          <TransitionMatrix />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Статистический анализ</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatisticsTable data={statsData} totalDays={dayCount} />
            <AnalysisSummary totalDays={dayCount} maxError={maxError} />
          </div>
        </div>

      </div>
    </div>
  );
}