import React from 'react';
import { type WeatherState, WEATHER_CONFIG } from '../types/weather';

interface Props {
    dayCount: number;
    currentState: WeatherState;
}

export const WeatherDisplay: React.FC<Props> = ({ dayCount, currentState }) => {
    const config = WEATHER_CONFIG[currentState];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-sm uppercase tracking-wide text-slate-400 mb-4">
                Текущий день: {dayCount}
            </div>

            <div
                className={`w-48 h-48 rounded-full flex items-center justify-center text-6xl shadow-lg transition-all duration-500 ${config.bg}`}
            >
                {config.icon}
            </div>

            <h2 className={`mt-6 text-2xl font-semibold ${config.color}`}>
                {config.label}
            </h2>
            <p className="text-slate-400 text-sm mt-1">Состояние: {currentState}</p>
        </div>
    );
};