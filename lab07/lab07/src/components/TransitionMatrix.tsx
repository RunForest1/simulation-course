import React from 'react';
import { TRANSITION_MATRIX, WEATHER_CONFIG, type WeatherState } from '../types/weather';

export const TransitionMatrix: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Матрица переходов</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="text-slate-400">
                            <th className="pb-2">Из \ В</th>
                            <th className="pb-2 text-yellow-600">Ясно (1)</th>
                            <th className="pb-2 text-gray-600">Обл (2)</th>
                            <th className="pb-2 text-slate-700">Пасм (3)</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-1">
                        {[0, 1, 2].map((rowIdx) => (
                            <tr key={rowIdx} className="border-t border-slate-50">
                                <td className="py-2 font-medium text-slate-600">
                                    {WEATHER_CONFIG[(rowIdx + 1) as WeatherState].label}
                                </td>
                                {TRANSITION_MATRIX[rowIdx].map((prob, colIdx) => (
                                    <td key={colIdx} className="py-2 text-slate-700 font-mono">
                                        {prob.toFixed(2)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded">
                <p>Интенсивности заданы так, что система стремится к стационарному режиму.</p>
            </div>
        </div>
    );
};