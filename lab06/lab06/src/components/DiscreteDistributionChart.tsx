import React from 'react';
import type { ExperimentResult, DistributionItem } from '../utils/stats';

interface DiscreteDistributionChartProps {
    results: ExperimentResult[];
    distribution: DistributionItem[];
}

export const DiscreteDistributionChart: React.FC<DiscreteDistributionChartProps> = ({
    results,
    distribution,
}) => {
    // Берем результат для наибольшего N (10000), так как он наиболее показателен
    const finalResult = results.find((r) => r.n === 10000) || results[results.length - 1];

    const values = distribution.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);

    // Настройки графика
    const width = 600;
    const height = 300;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Масштабирование
    const xScale = chartWidth / (maxVal - minVal + 1);
    const maxProb = Math.max(
        ...distribution.map((d) => d.probability),
        ...Object.values(finalResult.empiricalProbs)
    );
    const yScale = chartHeight / (maxProb * 1.2); // 20% запаса сверху

    const getX = (val: number) => padding + (val - minVal) * xScale + xScale / 2;
    const getY = (prob: number) => height - padding - prob * yScale;
    const barWidth = xScale * 0.6;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
                Распределение вероятностей (N = {finalResult.n})
            </h3>
            <div className="w-full overflow-x-auto">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-w-2xl mx-auto">
                    {/* Оси */}
                    <line
                        x1={padding}
                        y1={height - padding}
                        x2={width - padding}
                        y2={height - padding}
                        stroke="#94a3b8"
                        strokeWidth="2"
                    />
                    <line
                        x1={padding}
                        y1={padding}
                        x2={padding}
                        y2={height - padding}
                        stroke="#94a3b8"
                        strokeWidth="2"
                    />

                    {/* Подписи осей */}
                    <text x={width / 2} y={height - 10} textAnchor="middle" className="text-xs fill-slate-500">
                        Значение (x)
                    </text>
                    <text
                        x={15}
                        y={height / 2}
                        textAnchor="middle"
                        transform={`rotate(-90, 15, ${height / 2})`}
                        className="text-xs fill-slate-500"
                    >
                        Вероятность (P)
                    </text>

                    {/* Столбцы эмпирических вероятностей */}
                    {distribution.map((item) => {
                        const empProb = finalResult.empiricalProbs[item.value] || 0;
                        const x = getX(item.value) - barWidth / 2;
                        const y = getY(empProb);
                        const h = height - padding - y;

                        return (
                            <g key={`emp-${item.value}`}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={h}
                                    fill="#818cf8" // indigo-400
                                    fillOpacity="0.7"
                                    stroke="#4f46e5" // indigo-600
                                    strokeWidth="1"
                                />
                                <text
                                    x={getX(item.value)}
                                    y={y - 5}
                                    textAnchor="middle"
                                    className="text-[10px] fill-slate-700"
                                >
                                    {empProb.toFixed(3)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Линия теоретических вероятностей */}
                    <polyline
                        points={distribution
                            .map((item) => `${getX(item.value)},${getY(item.probability)}`)
                            .join(' ')}
                        fill="none"
                        stroke="#10b981" // emerald-500
                        strokeWidth="3"
                        strokeDasharray="5,5"
                    />

                    {/* Точки и подписи для теоретических вероятностей */}
                    {distribution.map((item) => (
                        <g key={`theo-${item.value}`}>
                            <circle
                                cx={getX(item.value)}
                                cy={getY(item.probability)}
                                r="4"
                                fill="#10b981"
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={getX(item.value)}
                                y={getY(item.probability) - 10}
                                textAnchor="middle"
                                className="text-[10px] fill-emerald-700 font-bold"
                            >
                                {item.probability.toFixed(3)}
                            </text>
                        </g>
                    ))}

                    {/* Подписи по оси X */}
                    {distribution.map((item) => (
                        <text
                            key={`label-${item.value}`}
                            x={getX(item.value)}
                            y={height - padding + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-700"
                        >
                            {item.value}
                        </text>
                    ))}
                </svg>
            </div>
            <div className="mt-4 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-400 opacity-70 border border-indigo-600"></div>
                    <span className="text-slate-700">Эмпирическая вероятность</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 border-t-2 border-dashed border-emerald-500"></div>
                    <span className="text-slate-700">Теоретическая вероятность</span>
                </div>
            </div>
        </div>
    );
};