import React from 'react';
import { WEATHER_CONFIG, type WeatherState } from '../types/weather';

interface StatRow {
    state: WeatherState;
    count: number;
    empirical: number;
    theoretical: number;
    error: number;
}

interface Props {
    data: StatRow[];
    totalDays: number;
}

export const StatisticsTable: React.FC<Props> = ({ data }) => {

    const content = `${data.map((row) => (
        `${row.state}\n
        --${row.empirical.toFixed(4)}\n
        --${row.theoretical.toFixed(4)}\n
        --${row.error.toFixed(4)}\n`

    ))
        }`
    console.log(content);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'results.txt'


    document.body.appendChild(link);
    link.click();

    return (
        <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 text-slate-500">
                        <th className="p-3 text-left rounded-l-lg">Состояние</th>
                        <th className="p-3 text-right">Дней</th>
                        <th className="p-3 text-right">P эмпирическое</th>
                        <th className="p-3 text-right">P теоретическое</th>
                        <th className="p-3 text-right rounded-r-lg">Ошибка (|Δ|)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.state} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            <td className="p-3 font-medium flex items-center gap-2">
                                <span>{WEATHER_CONFIG[row.state].icon}</span>
                                {WEATHER_CONFIG[row.state].label}
                            </td>
                            <td className="p-3 text-right font-mono">{row.count}</td>
                            <td className="p-3 text-right font-mono text-blue-600">{row.empirical.toFixed(4)}</td>
                            <td className="p-3 text-right font-mono text-slate-500">{row.theoretical.toFixed(4)}</td>
                            <td className="p-3 text-right font-mono text-red-500">{row.error.toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};