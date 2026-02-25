import React from 'react';
import { COLORS, TREE, FIRE } from '../constants';

// Описываем интерфейс пропсов
interface StatisticsProps {
    step: number;
    trees: number;
    fire: number;
}

const Statistics: React.FC<StatisticsProps> = ({ step, trees, fire }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Статистика</h3>

            <div className="space-y-2">
                <p className="text-gray-700">
                    Шаг: <strong className="font-bold text-gray-900">{step}</strong>
                </p>

                <p className="text-gray-700">
                    Деревья:{' '}
                    <strong className="font-bold" style={{ color: COLORS[TREE] }}>
                        {trees}
                    </strong>
                </p>

                <p className="text-gray-700">
                    Огонь:{' '}
                    <strong className="font-bold" style={{ color: COLORS[FIRE] }}>
                        {fire}
                    </strong>
                </p>
            </div>
        </div>
    );
};

export default Statistics;