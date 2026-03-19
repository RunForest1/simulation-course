import React from 'react';
import { type SystemStats } from '../types';

interface StatsPanelProps {
    stats: SystemStats;
    rho: number;
    erlangB?: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, rho, erlangB }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-xs text-green-600 font-bold uppercase">Обслужено</div>
                <div className="text-2xl font-bold text-green-700 font-mono">{stats.served}</div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="text-xs text-red-600 font-bold uppercase">Отказы (Вход)</div>
                <div className="text-2xl font-bold text-red-700 font-mono">{stats.rejected}</div>
                <div className="text-[10px] text-red-400 mt-1">
                    Теория (Эрланг): {(erlangB || 0).toFixed(3)}
                </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="text-xs text-orange-600 font-bold uppercase">Ушли (Нетерпение)</div>
                <div className="text-2xl font-bold text-orange-700 font-mono">{stats.leftQueue}</div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-xs text-blue-600 font-bold uppercase">Ср. ожидание</div>
                <div className="text-2xl font-bold text-blue-700 font-mono">{stats.avgWait.toFixed(3)}</div>
                <div className="text-[10px] text-blue-400 mt-1">
                    Нагрузка ρ: {rho.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;