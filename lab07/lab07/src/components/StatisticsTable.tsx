import React from 'react';
import { WEATHER_CONFIG, type WeatherState, TRANSITION_MATRIX } from '../types/weather';

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

export const StatisticsTable: React.FC<Props> = ({ data, totalDays }) => {

    const handleExportCSV = () => {
        // Формируем заголовки
        const headers = [
            'Состояние',
            'Количество дней',
            'P эмпирическое',
            'P теоретическое',
            'Ошибка (|Δ|)'
        ];

        // Формируем строки данных
        const rows = data.map(row => [
            WEATHER_CONFIG[row.state].label,
            row.count.toString(),
            row.empirical.toFixed(6).replace('.', ','), // Замена точки на запятую для Excel
            row.theoretical.toFixed(6).replace('.', ','),
            row.error.toFixed(6).replace('.', ',')
        ]);

        // Добавляем мета-информацию об эксперименте
        const metaInfo = [
            ['Лабораторная работа №7: Марковская модель погоды'],
            ['Дата выполнения:', new Date().toLocaleString('ru-RU')],
            ['Всего шагов моделирования:', totalDays.toString()],
            [],
            ['Матрица переходных вероятностей:'],
            ...TRANSITION_MATRIX.map((row, idx) => [
                `Из состояния ${idx + 1} (${WEATHER_CONFIG[(idx + 1) as WeatherState].label})`,
                ...row.map(val => val.toFixed(2))
            ]),
            []
        ];

        // Собираем всё в CSV строку
        // Используем точку с запятой (;) как разделитель, т.к. в русских настройках Excel запятая - это десятичный разделитель
        const csvContent = [
            ...metaInfo.map(row => row.join(';')),
            headers.join(';'),
            ...rows.map(row => row.join(';'))
        ].join('\n');

        // Создаем Blob с UTF-8 BOM для корректного отображения кириллицы в Excel
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });

        // Создаем ссылку и инициируем скачивание
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `markov_weather_report_${new Date().getTime()}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Освобождаем память
        URL.revokeObjectURL(url);
    };

    return (
        <div className="lg:col-span-2 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-slate-700">Результаты статистики</h4>
                <button
                    onClick={handleExportCSV}
                    disabled={totalDays === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${totalDays === 0
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Экспорт в CSV
                </button>
            </div>

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

            {totalDays === 0 && (
                <p className="text-center text-slate-400 text-sm mt-4 italic">
                    Запустите моделирование для сбора данных перед экспортом.
                </p>
            )}
        </div>
    );
};