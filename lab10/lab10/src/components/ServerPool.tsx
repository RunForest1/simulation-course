import React from 'react';
import { Client } from '../models/Client';

interface ServerPoolProps {
    servers: (Client | null)[];
}

const ServerPool: React.FC<ServerPoolProps> = ({ servers }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 h-full">
            <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">
                Пул серверов ({servers.length})
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {servers.map((client, idx) => (
                    <div
                        key={idx}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300 ${client
                                ? 'bg-blue-50 border-blue-500 shadow-inner'
                                : 'bg-gray-50 border-gray-200 border-dashed'
                            }`}
                    >
                        <span className="text-[10px] text-gray-400 font-mono mb-1">S{idx + 1}</span>
                        {client ? (
                            <>
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse shadow-lg">
                                    #{client.id}
                                </div>
                                <span className="text-[9px] text-blue-400 mt-1">
                                    {(client.finishTime! - (client.serviceStartTime || 0)).toFixed(1)}s
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-300 text-xl">○</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServerPool;