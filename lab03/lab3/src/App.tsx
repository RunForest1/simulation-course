import React, { useState, useEffect, useRef } from 'react';
import { TREE, DEFAULT_PROB_FIRE, DEFAULT_PROB_GROWTH } from './constants';
import type { Grid } from './utils/forestLogic';
import {
  initializeRandomForest,
  countStats,
  computeNextStep,
  igniteCenter,
  updateCell
} from './utils/forestLogic';
import ForestCanvas from './components/ForestCanvas';
import Controls from './components/Controls';
import Statistics from './components/Statistics';

const App: React.FC = () => {
  // --- STATE ---
  const [grid, setGrid] = useState<Grid>(() => initializeRandomForest(0.5));
  const [stats, setStats] = useState(() => {
    const initialGrid = initializeRandomForest(0.5);
    return { ...countStats(initialGrid), step: 0 };
  });

  const [isRunning, setIsRunning] = useState(false);
  const [probFire, setProbFire] = useState(DEFAULT_PROB_FIRE);
  const [probGrowth, setProbGrowth] = useState(DEFAULT_PROB_GROWTH);
  const [drawMode, setDrawMode] = useState(TREE);

  // Скорость (задержка в мс)
  const [speed, setSpeed] = useState(100);

  const [windDirection, setWindDirection] = useState(0); // 0: Нет, 1: Влево, 2: Вправо, 3: Вверх, 4: Вниз
  const [temperature, setTemperature] = useState(1.0);  // 1.0: Норма, >1: Жарко, <1: Холодно

  // Ref для хранения актуальных значений внутри таймера
  const gridRef = useRef(grid);
  const probFireRef = useRef(probFire);
  const probGrowthRef = useRef(probGrowth);
  const speedRef = useRef(speed);
  const windDirectionRef = useRef(windDirection);
  const temperatureRef = useRef(temperature);

  // Синхронизация Ref с State
  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { probFireRef.current = probFire; }, [probFire]);
  useEffect(() => { probGrowthRef.current = probGrowth; }, [probGrowth]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { windDirectionRef.current = windDirection; }, [windDirection]);
  useEffect(() => { temperatureRef.current = temperature; }, [temperature]);

  // --- ЗАПУСК / ОСТАНОВКА ---
  useEffect(() => {
    let timerId: number | undefined;

    if (isRunning) {
      const runLoop = () => {
        const currentGrid = gridRef.current;

        if (!currentGrid || currentGrid.length === 0) {
          timerId = window.setTimeout(runLoop, speedRef.current);
          return;
        }

        const { nextGrid, stats: newStats } = computeNextStep(
          currentGrid,
          probFireRef.current,
          probGrowthRef.current,
          windDirectionRef.current,   
          temperatureRef.current,   
        );

        setGrid(nextGrid);
        setStats(prev => ({ ...newStats, step: prev.step + 1 }));

        timerId = window.setTimeout(runLoop, speedRef.current);
      };

      runLoop();
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isRunning]);

  // --- ОБРАБОТЧИКИ ---
  const handleReset = () => {
    setIsRunning(false);
    const newGrid = initializeRandomForest(0);
    setGrid(newGrid);
    setStats({ ...countStats(newGrid), step: 0 });
  };

  const handleIgniteCenter = () => {
    setIsRunning(false);
    const newGrid = igniteCenter(grid);
    setGrid(newGrid);
    setStats(prev => ({ ...countStats(newGrid), step: prev.step }));
  };

  const handleCellInteract = (x: number, y: number) => {
    const newGrid = updateCell(grid, x, y, drawMode);
    setGrid(newGrid);
    if (!isRunning) {
      setStats(prev => ({ ...countStats(newGrid), step: prev.step }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Лесные пожары (Клеточный автомат)
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <Controls
              isRunning={isRunning}
              onToggle={() => setIsRunning(!isRunning)}
              onReset={handleReset}
              onIgniteCenter={handleIgniteCenter}
              probFire={probFire}
              setProbFire={setProbFire}
              probGrowth={probGrowth}
              setProbGrowth={setProbGrowth}
              speed={speed}
              setSpeed={setSpeed}
              drawMode={drawMode}
              setDrawMode={setDrawMode}
              windDirection={windDirection}
              setWindDirection={setWindDirection}
              temperature={temperature}
              setTemperature={setTemperature}
            />

            <Statistics
              step={stats.step}
              trees={stats.trees}
              fire={stats.fire}
            />
          </div>

          <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow-md flex justify-center items-center border border-gray-200">
            <ForestCanvas
              grid={grid}
              onCellInteract={handleCellInteract}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;