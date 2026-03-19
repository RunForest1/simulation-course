import React from 'react';

interface Props {
    totalDays: number;
    maxError: number;
}

export const AnalysisSummary: React.FC<Props> = ({ totalDays, maxError }) => {
    return (
        <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
            <h4 className="font-semibold text-slate-700 mb-2">Выводы:</h4>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                <li>
                    Всего смоделировано дней: <strong>{totalDays}</strong>
                </li>
                <li>
                    При увеличении числа испытаний эмпирические вероятности стремятся к теоретическим значениям стационарного распределения.
                </li>
                <li>
                    Текущая максимальная ошибка: <strong className={maxError < 0.05 ? "text-green-600" : "text-orange-600"}>
                        {maxError.toFixed(4)}
                    </strong>
                </li>
                {totalDays < 50 && (
                    <li className="text-orange-500 italic">
                        *Для точного совпадения требуется больше шагов моделирования.
                    </li>
                )}
            </ul>
        </div>
    );
};