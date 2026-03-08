import React from 'react';
import { SAMPLE_SIZE, THEORETICAL_MEAN, THEORETICAL_VARIANCE } from '../utils/stats';
import { fmt } from '../utils/stats';

const ParamsCard: React.FC = () => {
    return (
        <div className="mb-8 p-4 bg-gray-100 rounded-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Параметры модели</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div><span className="font-medium">Размер выборки:</span> {SAMPLE_SIZE.toLocaleString()}</div>
                <div><span className="font-medium">Распределение:</span> Равномерное U[0; 1]</div>
                <div><span className="font-medium">Теор. Среднее:</span> {fmt(THEORETICAL_MEAN)}</div>
                <div><span className="font-medium">Теор. Дисперсия:</span> {fmt(THEORETICAL_VARIANCE)} (1/12)</div>
            </div>
        </div>
    );
};

export default ParamsCard;