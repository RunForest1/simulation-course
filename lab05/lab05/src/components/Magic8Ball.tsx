import React, { useState, useMemo } from 'react';
import { generateGroupEvent } from '../utils/probability';

// Конфигурация событий (полная группа)
// Сумма вероятностей должна быть равна 1.
const ANSWERS = [
    { text: 'Бесспорно', prob: 0.15 },
    { text: 'Предрешено', prob: 0.10 },
    { text: 'Никаких сомнений', prob: 0.10 },
    { text: 'Определённо да', prob: 0.10 },
    { text: 'Можешь быть уверен', prob: 0.05 },
    { text: 'Мне кажется — да', prob: 0.05 },
    { text: 'Вероятнее всего', prob: 0.05 },
    { text: 'Хорошие перспективы', prob: 0.05 },
    { text: 'Знаки говорят — да', prob: 0.05 },
    { text: 'Да', prob: 0.05 },
    { text: 'Пока не ясно', prob: 0.05 },
    { text: 'Спроси позже', prob: 0.05 },
    { text: 'Лучше не рассказывать', prob: 0.05 },
    { text: 'Сейчас нельзя предсказать', prob: 0.05 },
    { text: 'Спроси снова', prob: 0.05 },
    { text: 'Не думай об этом', prob: 0.02 }, // Оставшиеся 2%
    { text: 'Мои источники говорят — нет', prob: 0.02 },
    { text: 'Перспективы не очень', prob: 0.02 },
    { text: 'Весьма сомнительно', prob: 0.02 },
    { text: 'Нет', prob: 0.02 },
];

interface StatRow {
    text: string;
    count: number;
    frequency: number;
}

export const Magic8Ball: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [lastAnswer, setLastAnswer] = useState<string | null>(null);
    const [stats, setStats] = useState<number[]>(new Array(ANSWERS.length).fill(0));
    const [totalAttempts, setTotalAttempts] = useState(0);

    const handlePredict = () => {
        if (!question.trim()) return;

        // Извлекаем массив вероятностей
        const probabilities = ANSWERS.map(a => a.prob);

        // Генерируем событие из группы (возвращает индекс k)
        const selectedIndex = generateGroupEvent(probabilities);

        // Обновляем статистику
        const newStats = [...stats];
        newStats[selectedIndex]++;

        setStats(newStats);
        setTotalAttempts(prev => prev + 1);
        setLastAnswer(ANSWERS[selectedIndex].text);
    };

    // Вычисление относительных частот (эмпирических вероятностей)
    const statisticsTable: StatRow[] = useMemo(() => {
        return ANSWERS.map((item, index) => ({
            text: item.text,
            count: stats[index],
            frequency: totalAttempts > 0 ? stats[index] / totalAttempts : 0,
        })).filter(row => row.count > 0); // Показываем только те, что выпадали
    }, [stats, totalAttempts]);

    return (
        <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Интерфейс шара */}
            <div className="bg-indigo-900 text-white rounded-xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

                <h2 className="text-2xl font-bold mb-6 z-10">Magic 8-Ball</h2>

                <div className="w-48 h-48 bg-black rounded-full border-4 border-gray-600 flex items-center justify-center shadow-inner mb-6 z-10 relative">
                    <div className="w-40 h-40 bg-indigo-950 rounded-full flex items-center justify-center p-4 text-center">
                        <span className={`text-lg font-medium transition-opacity duration-300 ${lastAnswer ? 'opacity-100' : 'opacity-30'}`}>
                            {lastAnswer || 'Задай вопрос...'}
                        </span>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Спроси о будущем..."
                    className="w-full px-4 py-2 bg-indigo-800 border border-indigo-600 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-white outline-none mb-4 z-10"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                />

                <button
                    onClick={handlePredict}
                    disabled={!question.trim()}
                    className="px-8 py-2 bg-white text-indigo-900 font-bold rounded-full hover:bg-gray-100 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                    Узнать судьбу
                </button>
            </div>

            {/* Статистика */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 overflow-hidden flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Статистика ответов
                </h3>
                <div className="mb-2 text-sm text-gray-500">
                    Всего попыток: <span className="font-bold text-gray-800">{totalAttempts}</span>
                </div>

                <div className="overflow-y-auto flex-1 max-h-87.5 pr-2">
                    {statisticsTable.length === 0 ? (
                        <p className="text-gray-400 text-center italic mt-10">Пока нет данных для анализа</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-3 py-2">Ответ</th>
                                    <th className="px-3 py-2 text-right">Частота (nk)</th>
                                    <th className="px-3 py-2 text-right">Вероятность (ṗk)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statisticsTable.map((row, idx) => (
                                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-3 py-2 font-medium text-gray-700">{row.text}</td>
                                        <td className="px-3 py-2 text-right text-gray-600">{row.count}</td>
                                        <td className="px-3 py-2 text-right text-blue-600 font-mono">
                                            {(row.frequency * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};