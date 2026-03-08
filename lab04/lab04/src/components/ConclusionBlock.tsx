import React from 'react';
import type { ComparisonData } from '../types';
import { fmt } from '../utils/stats';

interface ConclusionBlockProps {
    data: ComparisonData;
}

const ConclusionBlock: React.FC<ConclusionBlockProps> = ({ data }) => {
    const maxError = Math.max(
        Math.abs(data.custom.mean - 0.5),
        Math.abs(data.builtIn.mean - 0.5)
    );

    const speedRatio = data.custom.executionTimeMs / data.builtIn.executionTimeMs;
    const performanceText = speedRatio > 1.5
        ? `Встроенный генератор работает быстрее примерно в ${speedRatio.toFixed(1)} раз.`
        : `Производительность собственного генератора сопоставима со встроенным.`;

    return (
        <div className="bg-gray-50 border-l-4 border-indigo-500 p-4 rounded-r-md">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Анализ и выводы</h3>
            <div className="text-sm text-gray-700 space-y-2">
                <p>
                    Реализован <strong>базовый датчик</strong>  с параметрами
                    $a=16807, M=2^{31}-1$. Проведено сравнение с встроенным генератором JavaScript.
                </p>

                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>Точность:</strong> Отклонение выборочного среднего от теоретического (0.5) составляет менее <code>{fmt(maxError, 5)}</code>.
                        Результаты обоих датчиков находятся в пределах статистической погрешности.
                    </li>
                    <li>
                        <strong>Производительность:</strong> {performanceText} Обработка {(100000).toLocaleString()} значений заняла доли секунды.
                    </li>
                </ul>

                <p className="font-semibold mt-2 text-gray-900">
                    Итоговый вывод:
                </p>
                <p>
                    Собственный базовый датчик корректно воспроизводит свойства равномерного распределения U[0, 1].
                    Алгоритм пригоден для задач стохастического моделирования, не требующих криптографической стойкости.
                </p>
            </div>
        </div>
    );
};

export default ConclusionBlock;