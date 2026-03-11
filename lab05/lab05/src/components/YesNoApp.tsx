import React, { useState } from 'react';
import { checkEventProbability } from '../utils/probability';

interface YesNoAppProps {
    defaultProbability?: number; // По умолчанию 0.5 (честная монетка)
}

export const YesNoApp: React.FC<YesNoAppProps> = ({ defaultProbability = 0.5 }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<'YES' | 'NO' | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAsk = () => {
        if (!question.trim()) return;

        setIsAnimating(true);
        setAnswer(null);

        // Имитация задержки "думания"
        setTimeout(() => {
            // Алгоритм: Базовый датчик α. Если α < p -> ДА, иначе НЕТ.
            const isYes = checkEventProbability(defaultProbability);
            setAnswer(isYes ? 'YES' : 'NO');
            setIsAnimating(false);
        }, 600);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Скажи «да» или «нет»
            </h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Пойти сегодня в университет?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                />

                <button
                    onClick={handleAsk}
                    disabled={!question.trim() || isAnimating}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 
            ${!question.trim() || isAnimating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                >
                    {isAnimating ? 'Думаю...' : 'Спросить'}
                </button>

                {answer && (
                    <div className={`mt-6 p-8 text-center rounded-lg animate-fade-in ${answer === 'YES' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        <span className="text-4xl font-black tracking-widest">
                            {answer === 'YES' ? 'ДА!' : 'НЕТ!'}
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
                Вероятность «Да»: {(defaultProbability * 100).toFixed(0)}%
            </div>
        </div>
    );
};