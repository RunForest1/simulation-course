import React from 'react';
import { Client } from '../models/Client';

interface QueueViewProps {
    queue: Client[];
    currentTime: number;
    maxQueue: number;
}

const QueueView: React.FC<QueueViewProps> = ({ queue, currentTime, maxQueue }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 h-full relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                    Очередь
                </h2>
                <span className={`text-xs font-mono px-2 py-1 rounded ${queue.length >= maxQueue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {queue.length} / {maxQueue}
                </span>
            </div>

            <div className="flex flex-wrap gap-2 content-start min-h-40">
                {queue.map((client) => {
                    const timeLeft = client.deadline - currentTime;
                    const isUrgent = timeLeft < 1.5; // Порог "паники"

                    return (
                        <div
                            key={client.id}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all duration-300 ${isUrgent
                                    ? 'bg-red-500 animate-bounce border-2 border-red-700 scale-110 z-10'
                                    : 'bg-orange-400 hover:bg-orange-500'
                                }`}
                            title={`Истекает через: ${timeLeft.toFixed(2)}`}
                        >
                            #{client.id}
                        </div>
                    );
                })}
                {queue.length === 0 && (
                    <div className="w-full text-center text-gray-400 text-sm italic mt-10">
                        Очередь пуста
                    </div>
                )}
            </div>

            {queue.length >= maxQueue && (
                <div className="absolute bottom-0 left-0 w-full bg-red-50 text-red-600 text-xs text-center py-1 border-t border-red-100">
                    ⚠️ Очередь переполнена (Отказы)
                </div>
            )}
        </div>
    );
};

export default QueueView;