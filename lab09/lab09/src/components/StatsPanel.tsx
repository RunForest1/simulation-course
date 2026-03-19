import React from 'react';
import { type SimulationStats } from '../types';

interface StatsPanelProps {
    stats: SimulationStats;
    queueLength: number;
    theoreticalLq: number | null;
    theoreticalWq: number | null;
    isStable: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
    stats,
    queueLength,
    theoreticalLq,
    theoreticalWq,
    isStable
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Эмпирические данные */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">Эмпирические данные</h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        Обслужено клиентов:{' '}
                        <span className="font-mono">{stats.served}</span>
                    </li>
                    <li>
                        Среднее время ожидания (эксп):{' '}
                        <span className="font-mono">{stats.avgWait.toFixed(3)}</span>
                    </li>
                    <li>
                        Текущая длина очереди:{' '}
                        <span className="font-mono">{queueLength}</span>
                    </li>
                </ul>
            </div>

            {/* Теоретические значения */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">
                    Теоретические значения (M/M/1)
                </h3>
                {isStable ? (
                    <ul className="space-y-1 text-sm">
                        <li>
                            Ср. длина очереди (Lq):{' '}
                            <span className="font-mono text-blue-600">
                                {theoreticalLq?.toFixed(3)}
                            </span>
                        </li>
                        <li>
                            Ср. время ожидания (Wq):{' '}
                            <span className="font-mono text-blue-600">
                                {theoreticalWq?.toFixed(3)}
                            </span>
                        </li>
                        <li className="text-xs text-gray-500 mt-2">
                            *Расчет верен только при ρ &lt; 1
                        </li>
                    </ul>
                ) : (
                    <p className="text-sm text-red-600">
                        Стационарный режим не достигается (ρ ≥ 1).
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsPanel;