import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { type SimulationStats } from '../utils/poissonMath';

interface Props {
    stats: SimulationStats;
}

// Интерфейс для данных графика
export interface ChartDataItem {
    k: number;
    count: number;
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
    // Проверяем, что tooltip активен и есть данные
    if (active && payload && payload.length > 0) {
        // Получаем данные из первого элемента payload
        const data = payload[0].payload as ChartDataItem;
        const label = payload[0].name || data.k.toString();

        return (
            <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md text-sm">
                <p className="font-bold text-gray-800 mb-1">Заявок: {label}</p>
                <p className="text-indigo-600">
                    Частота: <span className="font-semibold">{data.count}</span> раз
                </p>
            </div>
        );
    }
    return null;
};

export const DistributionChart: React.FC<Props> = ({ stats }) => {
    const chartData = useMemo(() => {
        const dist = stats.distribution;
        const keys = Object.keys(dist).map(Number).sort((a, b) => a - b);
        if (keys.length === 0) return [];

        // Фильтрация по диапазону ±3σ
        const mean = stats.theoreticalMean;
        const stdDev = Math.sqrt(stats.theoreticalVariance);

        const minK = Math.max(0, Math.floor(mean - 3 * stdDev));
        const maxK = Math.ceil(mean + 3 * stdDev);

        const filteredKeys = keys.filter(k => k >= minK && k <= maxK);

        if (filteredKeys.length === 0) return [];

        return filteredKeys.map(k => ({
            k,
            count: dist[k],
            name: `Заявок: ${k}`
        }));
    }, [stats]);

    if (chartData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500 h-64 flex items-center justify-center">
                Нет данных для отображения в текущем диапазоне
            </div>
        );
    }

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Распределение числа заявок</h2>
            <p className="text-sm text-gray-500 mb-6">
                Гистограмма частоты появления k заявок за интервал T (диапазон ±3σ от среднего)
            </p>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                        <XAxis
                            dataKey="k"
                            type="number"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={{ stroke: '#9ca3af' }}
                            tickLine={{ stroke: '#9ca3af' }}
                            label={{ value: 'Число заявок (k)', position: 'insideBottom', offset: -10, fill: '#6b7280' }}
                            domain={['dataMin', 'dataMax']}
                            interval="preserveStartEnd"
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={{ stroke: '#9ca3af' }}
                            tickLine={{ stroke: '#9ca3af' }}
                            label={{ value: 'Частота', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                        />

                        {/* Используем вынесенный компонент */}
                        <Tooltip content={<CustomTooltip />} />

                        <Bar
                            dataKey="count"
                            fill="#6366f1"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1000}
                            background={{ fill: '#f3f4f6' }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-400 px-2">
                <span>Теор. среднее: {stats.theoreticalMean.toFixed(2)}</span>
                <span>Эмп. среднее: {stats.mean.toFixed(2)}</span>
            </div>
        </section>
    );
};