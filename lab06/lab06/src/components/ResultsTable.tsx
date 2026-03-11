import React from 'react';
import type { ExperimentResult } from '../utils/stats';
import { ResultRow } from './ResultRow'; 

interface Props {
    results: ExperimentResult[];
}

const NS = [10, 100, 1000, 10000];

export const ResultsTable: React.FC<Props> = ({ results }) => {

    // Функция для подготовки данных для одной строки таблицы
    const prepareRowData = (
        getValue: (r: ExperimentResult) => string,
        getSubValue?: (r: ExperimentResult) => string
    ) => {
        const rowData: Record<number, { value: string; subValue?: string }> = {};
        NS.forEach(n => {
            const r = results.find(res => res.n === n);
            if (r) {
                rowData[n] = {
                    value: getValue(r),
                    subValue: getSubValue ? getSubValue(r) : undefined,
                };
            }
        });
        return rowData;
    };

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-sm text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="p-4 font-medium w-1/4 sticky left-0 bg-slate-50">Параметр</th>
                        {NS.map(n => (
                            <th key={n} className="p-4 font-medium text-center border-l border-slate-100 min-w-35">
                                N = {n.toLocaleString()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <ResultRow
                        label="Выборочное среднее"
                        subLabel="Отн. погрешность"
                        data={prepareRowData(
                            (r) => r.empiricalMean.toFixed(3),
                            (r) => r.meanErrorPercent.toFixed(2)
                        )}
                        highlightError
                    />
                    <ResultRow
                        label="Выборочная дисперсия"
                        subLabel="Отн. погрешность"
                        data={prepareRowData(
                            (r) => r.empiricalVariance.toFixed(3),
                            (r) => r.varianceErrorPercent.toFixed(2)
                        )}
                        highlightError
                    />
                    <ResultRow
                        label="Статистика χ²"
                        subLabel="Крит. значение (α=0.05)"
                        data={prepareRowData(
                            (r) => r.chiSquared.toFixed(3),
                            (r) => r.chiCritical.toFixed(3)
                        )}
                    />
                    <tr className="hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
                        <td className="p-4 font-medium text-slate-700 align-middle sticky left-0 bg-white">Гипотеза о соответствии</td>
                        {NS.map(n => {
                            const r = results.find(res => res.n === n);
                            if (!r) return null;
                            return (
                                <td key={n} className="p-4 text-center border-l border-slate-100">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${r.isHypothesisAccepted
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-rose-100 text-rose-800'
                                        }`}>
                                        {r.isHypothesisAccepted ? 'ПРИНЯТА' : 'ОТКЛОНЕНА'}
                                    </span>
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};