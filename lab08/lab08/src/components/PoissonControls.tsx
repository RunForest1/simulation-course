import React from 'react';

interface Props {
    lambda: number;
    setLambda: (val: number) => void;
    T: number;
    setT: (val: number) => void;
    intervalsCount: number;
    setIntervalsCount: (val: number) => void;
    onRun: () => void;
    isSimulating: boolean;
}

export const PoissonControls: React.FC<Props> = ({
    lambda, setLambda, T, setT, intervalsCount, setIntervalsCount, onRun, isSimulating
}) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Параметры моделирования</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Интенсивность (&lambda;)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={lambda}
                        onChange={(e) => setLambda(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Интервал времени (T)
                    </label>
                    <input
                        type="number"
                        step="1"
                        min="1"
                        value={T}
                        onChange={(e) => setT(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Число экспериментов (N)
                    </label>
                    <input
                        type="number"
                        step="100"
                        min="10"
                        value={intervalsCount}
                        onChange={(e) => setIntervalsCount(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onRun}
                    disabled={isSimulating}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${isSimulating
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                        }`}
                >
                    {isSimulating ? 'Моделирование...' : 'Запустить моделирование'}
                </button>
            </div>
        </section>
    );
};