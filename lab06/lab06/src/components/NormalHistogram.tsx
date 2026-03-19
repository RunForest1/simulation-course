import React from 'react';
import type { NormalStats } from '../utils/stats';

interface Props {
    stats: NormalStats;
    n: number;
    title: string;
}

export const NormalHistogram: React.FC<Props> = ({ stats, n, title }) => {
    const { histogramData, mean, variance, chiSquared, chiCritical, isHypothesisAccepted } = stats;

    if (histogramData.length === 0) return null;

    const maxCount = Math.max(...histogramData.map(d => d.count));
    const height = 300; // Высота области графика
    const width = 100;  // Ширина области графика в условных единицах SVG

    const actualBinWidth = Math.abs(histogramData[1].binStart - histogramData[0].binStart);

    // Функция плотности нормального распределения
    const normalPDF = (x: number, mu: number, sigma: number) => {
        const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
        const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
        return coeff * Math.exp(exponent);
    };

    const sigma = Math.sqrt(variance);
    const minBinStart = histogramData[0].binStart;
    // Максимальная граница последнего бина
    const maxBinEnd = histogramData[histogramData.length - 1].binStart + actualBinWidth;

    // Генерируем точки для плавной кривой
    // Нам нужно больше точек, чем бинов, для гладкости
    const curvePointsCount = 100;
    const curvePoints: { x: number, y: number }[] = [];

    for (let i = 0; i <= curvePointsCount; i++) {
        const t = i / curvePointsCount; // от 0 до 1
        const xVal = minBinStart + t * (maxBinEnd - minBinStart);

        // Теоретическая плотность
        const pdfVal = normalPDF(xVal, mean, sigma);

        // Масштабирование в координаты SVG
        // X: пропорционально позиции в диапазоне
        const svgX = t * width;

        // Y: 
        // Теоретическая частота = PDF * N * binWidth
        const expectedCount = pdfVal * n * actualBinWidth;
        const svgY = height - (expectedCount / maxCount) * height;

        curvePoints.push({ x: svgX, y: svgY });
    }

    // Создаем путь для кривой
    const pathD = curvePoints.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                    <span className="text-slate-500">Выборочное среднее:</span> <br />
                    <span className="font-mono font-bold">{mean.toFixed(4)}</span>
                    <span className="text-xs text-slate-400 ml-2">(теор. {stats.mean.toFixed(2)})</span>
                </div>
                <div>
                    <span className="text-slate-500">Выборочная дисперсия:</span> <br />
                    <span className="font-mono font-bold">{variance.toFixed(4)}</span>
                    <span className="text-xs text-slate-400 ml-2">(теор. {stats.variance.toFixed(2)})</span>
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
                <svg className="w-full h-full" viewBox={`0 0 ${width} ${height + 40}`} preserveAspectRatio="none">
                    {/* Ось X */}
                    <line x1="0" y1={height} x2={width} y2={height} stroke="#cbd5e1" strokeWidth="1" />

                    {/* Ось Y (опционально) */}
                    <line x1="0" y1="0" x2="0" y2={height} stroke="#cbd5e1" strokeWidth="1" />

                    {/* Столбцы гистограммы */}
                    {histogramData.map((d, i) => {
                        const barHeight = (d.count / maxCount) * height;
                        const barW = width / histogramData.length;
                        const x = i * barW;
                        const y = height - barHeight;

                        return (
                            <rect
                                key={i}
                                x={x + 0.5}
                                y={y}
                                width={barW - 1}
                                height={barHeight}
                                fill="#818cf8" // indigo-400
                                fillOpacity="0.6"
                                stroke="#4f46e5"
                                strokeWidth="0.5"
                            />
                        );
                    })}

                    {/* Кривая теоретического распределения */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#10b981" // emerald-500
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Подписи оси X */}
                <div className="absolute bottom-0 left-0 text-[10px] text-slate-400 transform translate-y-4">
                    {minBinStart.toFixed(1)}
                </div>
                <div className="absolute bottom-0 right-0 text-[10px] text-slate-400 transform translate-y-4">
                    {maxBinEnd.toFixed(1)}
                </div>
                {/* Центр (0), если попадает в диапазон */}
                {minBinStart <= 0 && maxBinEnd >= 0 && (
                    <div className="absolute bottom-0 left-1/2 text-[10px] text-slate-400 transform -translate-x-1/2 translate-y-4">
                        0
                    </div>
                )}
            </div>

            <div className="mt-2 flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-indigo-400 opacity-60 border border-indigo-600"></div>
                    <span className="text-slate-600">Эмпирическое</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-6 border-t-2 border-emerald-500"></div>
                    <span className="text-slate-600">Теоретическое (Гаусс)</span>
                </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">Гистограмма частот и кривая плотности</p>
        </div>
    );
};