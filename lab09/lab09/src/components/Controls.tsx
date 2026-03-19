import React from 'react';

interface ControlsProps {
    lambda: number;
    mu: number;
    rho: number;
    onLambdaChange: (val: number) => void;
    onMuChange: (val: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
    lambda, mu, rho, onLambdaChange, onMuChange
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
                <label className="block text-sm font-medium mb-1">
                    λ (Входной поток): {lambda.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={lambda}
                    onChange={(e) => onLambdaChange(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    μ (Обслуживание): {mu.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={mu}
                    onChange={(e) => onMuChange(parseFloat(e.target.value))}
                    className="w-full accent-green-600"
                />
            </div>
            <div className="col-span-2 text-sm text-gray-600">
                Загрузка системы (ρ):{' '}
                <span className={`font-bold ${rho >= 1 ? 'text-red-600' : 'text-blue-600'}`}>
                    {rho.toFixed(3)}
                </span>
                {rho >= 1 && (
                    <span className="ml-2 text-red-500">⚠️ Система перегружена</span>
                )}
            </div>
        </div>
    );
};

export default Controls;