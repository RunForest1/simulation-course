import React from 'react';
import type { DistributionItem } from '../utils/stats';

interface Props {
    distribution: DistributionItem[];
    onChange: (index: number, value: string) => void;
    totalProb: number;
}

export const DistributionInput: React.FC<Props> = ({ distribution, onChange, totalProb }) => {
    const isValid = Math.abs(totalProb - 1) < 0.001;

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-lg font-semibold text-slate-700">Параметры распределения</h2>
                <div className={`text-sm px-3 py-1 rounded-full transition-colors ${isValid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    ΣP = {totalProb.toFixed(4)} {!isValid && '(нормализовано)'}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {distribution.map((item, idx) => (
                    <div key={idx} className="flex flex-col group">
                        <label className="text-xs font-medium text-slate-500 mb-1 group-focus-within:text-indigo-600 transition-colors">
                            x = {item.value}
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={item.probability.toFixed(3)}
                            onChange={(e) => onChange(idx, e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-center font-mono text-sm"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 text-center">P(x)</span>
                    </div>
                ))}
            </div>

            {/* Подсказка, если сумма далека от 1 */}
            {!isValid && (
                <p className="text-xs text-amber-600 mb-4">
                    * Вероятности автоматически нормализуются при вводе.
                </p>
            )}
        </section>
    );
};