import React from 'react';
import { type Client } from '../types';

interface ServerViewProps {
    client: Client | null;
}

const ServerView: React.FC<ServerViewProps> = ({ client }) => {
    return (
        <div className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 relative min-h-[200px] flex flex-col items-center justify-center">
            <h2 className="absolute top-2 left-4 text-sm font-semibold text-gray-500">
                Сервер
            </h2>
            {client ? (
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse shadow-lg transition-all">
                    #{client.id}
                </div>
            ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    Свободен
                </div>
            )}
        </div>
    );
};

export default ServerView;