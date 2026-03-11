import React from 'react';

interface Props {
    theoreticalMean: number;
    theoreticalVariance: number;
    isCalculating: boolean;
    onStart: () => void;
}

export const StatsSummary: React.FC<Props> = ({
    theoreticalMean,
    theoreticalVariance,
    isCalculating,
    onStart
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 mt-4">
            <div className="text-sm text-slate-600 space-y-1 w-full sm:w-auto">
                <p className="flex justify-between sm:block">
                    <span className="font-medium sm:inline block mr-2">Теоретическое среднее (E):</span>
                    <span className="font-mono font-bold text-slate-800">{theoreticalMean.toFixed(4)}</span>
                </p>
                <p className="flex justify-between sm:block">
                    <span className="font-medium sm:inline block mr-2">Теоретическая дисперсия (D):</span>
                    <span className="font-mono font-bold text-slate-800">{theoreticalVariance.toFixed(4)}</span>
                </p>
            </div>

            <button
                onClick={onStart}
                disabled={isCalculating}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isCalculating
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                    }`}
            >
                {isCalculating && (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isCalculating ? 'Расчет...' : 'Запустить эксперимент'}
            </button>
        </div>
    );
};