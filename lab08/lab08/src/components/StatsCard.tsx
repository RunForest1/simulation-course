import React from 'react';

interface Props {
    label: string;
    value: number;
    theory?: number;
    colorClass: string;
}

export const StatsCard: React.FC<Props> = ({ label, value, theory, colorClass }) => (
    <div className={`p-4 rounded-lg border ${colorClass} bg-opacity-10`}>
        <h3 className="text-sm font-medium text-gray-500 uppercase">{label}</h3>
        <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-800">{value.toFixed(4)}</span>
            {theory !== undefined && (
                <span className="text-sm text-gray-500">
                    (теор: {theory.toFixed(4)})
                </span>
            )}
        </div>
    </div>
);