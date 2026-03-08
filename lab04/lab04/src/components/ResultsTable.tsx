import React from 'react';
import { fmt } from '../utils/stats';
import type { ComparisonData } from '../types';

interface ResultsTableProps {
    data: ComparisonData;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Параметр</th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Теоретическое</th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-blue-600 uppercase tracking-wider">Свой датчик</th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-green-600 uppercase tracking-wider">Встроенный (Math.random)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Выборочное среднее</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-500">{fmt(data.theoreticalMean)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-blue-700">{fmt(data.custom.mean)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-green-700">{fmt(data.builtIn.mean)}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Выборочная дисперсия</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-500">{fmt(data.theoreticalVariance)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-blue-700">{fmt(data.custom.variance)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-green-700">{fmt(data.builtIn.variance)}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Отклонение среднего</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-300">-</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-red-600">
                            {fmt(Math.abs(data.custom.mean - data.theoreticalMean))}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-red-600">
                            {fmt(Math.abs(data.builtIn.mean - data.theoreticalMean))}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Время выполнения</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-300">-</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-gray-600">{data.custom.executionTimeMs.toFixed(2)} мс</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-sm text-gray-600">{data.builtIn.executionTimeMs.toFixed(2)} мс</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;