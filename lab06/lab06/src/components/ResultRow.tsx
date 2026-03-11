import React from 'react';

interface ResultRowProps {
    label: string;
    subLabel?: string;
    // Вместо функций получаем уже готовые данные для каждого N
    data: Record<number, { value: string; subValue?: string | null }>;
    highlightError?: boolean;
}

const NS = [10, 100, 1000, 10000];

export const ResultRow: React.FC<ResultRowProps> = ({
    label,
    subLabel,
    data,
    highlightError = false
}) => {
    return (
        <tr className="hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
            <td className="p-4 align-middle">
                <div className="font-medium text-slate-700">{label}</div>
                {subLabel && <div className="text-xs text-slate-400">{subLabel}</div>}
            </td>
            {NS.map(n => {
                const cellData = data[n];
                if (!cellData) return null;

                const val = cellData.value;
                const subVal = cellData.subValue || null;

                let contentClass = "text-slate-600";
                if (highlightError && subVal) {
                    const err = parseFloat(subVal);
                    if (err > 10) contentClass = "text-rose-600 font-bold";
                    else if (err > 5) contentClass = "text-amber-600 font-medium";
                }

                return (
                    <td key={n} className="p-4 text-center border-l border-slate-100 align-middle">
                        <div className={`${contentClass}`}>{val}</div>
                        {subVal && (
                            <div className={`text-xs mt-1 ${highlightError && contentClass.includes('rose') ? 'text-rose-500 font-bold' : 'text-slate-400'
                                }`}>
                                ({subVal}%)
                            </div>
                        )}
                    </td>
                );
            })}
        </tr>
    );
};