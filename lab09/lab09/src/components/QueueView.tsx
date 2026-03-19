import React from 'react';
import { type Client } from '../types';

interface QueueViewProps {
    queue: Client[];
}

const QueueView: React.FC<QueueViewProps> = ({ queue }) => {
    return (
        <div className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 relative min-h-[200px]">
            <h2 className="absolute top-2 left-4 text-sm font-semibold text-gray-500">
                Очередь ({queue.length})
            </h2>
            <div className="mt-8 flex flex-wrap gap-2 content-start">
                {queue.map((client) => (
                    <div
                        key={client.id}
                        className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-sm border border-orange-500"
                    >
                        #{client.id}
                    </div>
                ))}
                {queue.length === 0 && (
                    <div className="text-gray-400 text-sm italic mt-4 w-full text-center">
                        Пусто
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueueView;