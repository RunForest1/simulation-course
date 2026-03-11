import React from 'react';
import type { NormalStats } from '../utils/stats';


interface Props {
    stats: NormalStats;
    n: number;
    title: string;
}

export const NormalHistogram: React.FC<Props> = ({ stats, n, title }) => {
    const { histogramData, mean, variance, chiSquared, chiCritical, isHypothesisAccepted } = stats;

    const maxCount = Math.max(...histogramData.map(d => d.count));
    const height = 200; // Высота графика в пикселях
    const barWidth = 100 / histogramData.length; // Процентная ширина столбца

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">{title} (N = {n.toLocaleString()})</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                    <span className="text-slate-500">Выборочное среднее:</span> <br />
                    <span className="font-mono font-bold">{mean.toFixed(4)}</span>
                    <span className="text-xs text-slate-400 ml-2">(теор. 0)</span>
                </div>
                <div>
                    <span className="text-slate-500">Выборочная дисперсия:</span> <br />
                    <span className="font-mono font-bold">{variance.toFixed(4)}</span>
                    <span className="text-xs text-slate-400 ml-2">(теор. 1)</span>
                </div>
                <div>
                    <span className="text-slate-500">Критерий χ²:</span> <br />
                    <span className={`font-mono font-bold ${chiSquared > chiCritical ? 'text-red-600' : 'text-green-600'}`}>
                        {chiSquared.toFixed(3)}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">(крит. {chiCritical.toFixed(3)})</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${isHypothesisAccepted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isHypothesisAccepted ? 'ПРИНЯТА' : 'ОТКЛОНЕНА'}
                    </span>
                </div>
            </div>

            {/* Область графика */}
            <div className="relative w-full overflow-hidden" style={{ height: `${height + 40}px` }}>
                <svg className="w-full h-full" viewBox={`0 0 100 ${height + 40}`} preserveAspectRatio="none">
                    {/* Ось X */}
                    <line x1="0" y1={height} x2="100" y2={height} stroke="#cbd5e1" strokeWidth="1" />

                    {/* Столбцы гистограммы */}
                    {histogramData.map((d, i) => {
                        const barHeight = (d.count / maxCount) * height;
                        const x = i * barWidth;
                        const y = height - barHeight;

                        return (
                            <rect
                                key={i}
                                x={x + 0.5} // Небольшой отступ
                                y={y}
                                width={barWidth - 1}
                                height={barHeight}
                                fill="#6366f1"
                                fillOpacity="0.7"
                                stroke="#4f46e5"
                                strokeWidth="0.5"
                            />
                        );
                    })}

                    {/* Теоретическая кривая (упрощенно рисуем поверх) */}
                    {/* Для идеальной точности нужно рассчитывать точки кривой Гаусса, здесь схематично */}
                    <path
                        d={`M 0 ${height} L 100 ${height}`}
                        stroke="transparent"
                        fill="none"
                    />
                </svg>

                {/* Подписи оси X (мин, макс) */}
                <div className="absolute bottom-0 left-0 text-[10px] text-slate-400 transform translate-y-4">
                    {histogramData[0].binStart.toFixed(1)}
                </div>
                <div className="absolute bottom-0 right-0 text-[10px] text-slate-400 transform translate-y-4">
                    {histogramData[histogramData.length - 1].binStart.toFixed(1)}
                </div>
                <div className="absolute bottom-0 left-1/2 text-[10px] text-slate-400 transform -translate-x-1/2 translate-y-4">
                    0
                </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-8">Гистограмма эмпирических частот</p>
        </div>
    );
};