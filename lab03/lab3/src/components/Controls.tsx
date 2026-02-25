import React from 'react';
import { TREE, FIRE, EMPTY, WATER } from '../constants';

// Описываем интерфейс пропсов с новыми полями
interface ControlsProps {
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
    onIgniteCenter: () => void;
    probFire: number;
    setProbFire: (val: number) => void;
    probGrowth: number;
    setProbGrowth: (val: number) => void;
    speed: number;
    setSpeed: (val: number) => void;
    drawMode: number;
    setDrawMode: (val: number) => void;
    windDirection: number;
    setWindDirection: (val: number) => void;
    temperature: number;
    setTemperature: (val: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
    isRunning,
    onToggle,
    onReset,
    onIgniteCenter,
    probFire,
    setProbFire,
    probGrowth,
    setProbGrowth,
    speed,
    setSpeed,
    drawMode,
    setDrawMode,
    // Деструктуризация новых пропсов
    windDirection, setWindDirection,
    temperature, setTemperature,
}) => {
    // Базовые классы для кнопок
    const baseBtnClasses = "px-4 py-2.5 text-sm font-bold text-white rounded transition-opacity opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Классы для конкретных типов кнопок
    const btnClasses = {
        start: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
        pause: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-gray-900",
        reset: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500",
        fire: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    };

    // Хелпер для текста ветра
    const getWindText = (dir: number) => {
        switch (dir) {
            case 1: return 'Влево';
            case 2: return 'Вправо';
            case 3: return 'Вверх';
            case 4: return 'Вниз';
            default: return 'Штиль (нет)';
        }
    };

    return (
        <div className="mb-5 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Управление</h3>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-2.5 mb-4">
                <button
                    onClick={onToggle}
                    className={`${baseBtnClasses} ${isRunning ? btnClasses.pause : btnClasses.start}`}
                >
                    {isRunning ? 'Пауза' : 'Старт'}
                </button>

                <button
                    onClick={onReset}
                    className={`${baseBtnClasses} ${btnClasses.reset}`}
                >
                    Сброс
                </button>

                <button
                    onClick={onIgniteCenter}
                    className={`${baseBtnClasses} ${btnClasses.fire}`}
                >
                    Поджечь центр
                </button>
            </div>

            {/* Основные параметры */}
            <div className="space-y-3 mb-4">
                {/* Вероятность молнии */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Вероятность молнии (f): <span className="font-mono">{probFire.toFixed(3)}</span>
                    </label>
                    <input
                        type="range" min="0" max="0.01" step="0.001"
                        value={probFire}
                        onChange={(e) => setProbFire(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Вероятность роста */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Вероятность роста (p): <span className="font-mono">{probGrowth.toFixed(3)}</span>
                    </label>
                    <input
                        type="range" min="0" max="0.1" step="0.005"
                        value={probGrowth}
                        onChange={(e) => setProbGrowth(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                </div>

                {/* Скорость симуляции */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Задержка (мс): <span className="font-mono">{speed}</span>
                    </label>
                    <input
                        type="range" min="0" max="1000" step="50"
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Меньше = быстрее</p>
                </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                Доп. правила
            </h4>

            {/* Ветер */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ветер:
                    <span className={`ml-2 font-mono font-bold ${windDirection !== 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                        {getWindText(windDirection)}
                    </span>
                </label>
                <input
                    type="range" min="0" max="4" step="1"
                    value={windDirection}
                    onChange={(e) => setWindDirection(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* Температура */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Температура:
                    <span className={`ml-2 font-mono font-bold ${temperature > 1 ? 'text-red-600' : 'text-cyan-600'}`}>
                        {temperature.toFixed(1)}x
                    </span>
                </label>
                <input
                    type="range" min="0.5" max="2.0" step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <p className="text-xs text-gray-500 mt-1">Выше = огонь распространяется легче</p>
            </div>


            <hr className="my-4 border-gray-300" />

            {/* Режим рисования */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Режим рисования:
                </label>
                <div className="flex items-center gap-2">
                    <select
                        value={drawMode}
                        onChange={(e) => setDrawMode(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={TREE}>🌲 Дерево</option>
                        <option value={FIRE}>🔥 Огонь</option>
                        <option value={EMPTY}>⬜ Ластик</option>
                        <option value={WATER}>🟦 Вода</option>
                    </select>
                    <span className="text-xs text-gray-500">
                        (Зажмите ЛКМ на поле)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Controls;