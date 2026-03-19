import React from 'react';

interface ControlsProps {
    lambda: number;
    mu: number;
    n: number;
    maxQueue: number;
    patience: number;
    onLambdaChange: (v: number) => void;
    onMuChange: (v: number) => void;
    onNChange: (v: number) => void;
    onMaxQueueChange: (v: number) => void;
    onPatienceChange: (v: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
    lambda, mu, n, maxQueue, patience,
    onLambdaChange, onMuChange, onNChange, onMaxQueueChange, onPatienceChange
}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">λ (Вход)</label>
                <input type="range" min="0.1" max="5.0" step="0.1" value={lambda} onChange={e => onLambdaChange(+e.target.value)} className="w-full accent-blue-600" />
                <div className="text-right text-sm font-mono">{lambda.toFixed(1)}</div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">μ (Сервис)</label>
                <input type="range" min="0.1" max="5.0" step="0.1" value={mu} onChange={e => onMuChange(+e.target.value)} className="w-full accent-green-600" />
                <div className="text-right text-sm font-mono">{mu.toFixed(1)}</div>
            </div>
            <div>
                <label className="block text-xs font-bold text-blue-700 mb-1">n (Серверы)</label>
                <input type="range" min="1" max="12" step="1" value={n} onChange={e => onNChange(+e.target.value)} className="w-full accent-blue-700" />
                <div className="text-right text-sm font-mono">{n}</div>
            </div>
            <div>
                <label className="block text-xs font-bold text-orange-600 mb-1">Макс. очередь</label>
                <input type="range" min="0" max="30" step="1" value={maxQueue} onChange={e => onMaxQueueChange(+e.target.value)} className="w-full accent-orange-600" />
                <div className="text-right text-sm font-mono">{maxQueue}</div>
            </div>
            <div>
                <label className="block text-xs font-bold text-red-600 mb-1">Терпение (ср.)</label>
                <input type="range" min="0.5" max="10.0" step="0.5" value={patience} onChange={e => onPatienceChange(+e.target.value)} className="w-full accent-red-600" />
                <div className="text-right text-sm font-mono">{patience.toFixed(1)}</div>
            </div>
        </div>
    );
};

export default Controls;