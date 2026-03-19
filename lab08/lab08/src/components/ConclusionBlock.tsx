import React from 'react';
import { type SimulationStats } from '../utils/poissonMath';

interface Props {
    stats: SimulationStats;
    lambda: number;
    T: number;
    intervalsCount: number;
}

export const ConclusionBlock: React.FC<Props> = ({ stats, lambda, T, intervalsCount }) => {
    return (
        <section className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Вывод</h2>
            <p className="text-green-900 leading-relaxed">
                В ходе моделирования пуассоновского потока с интенсивностью <strong>&lambda; = {lambda}</strong> на интервале времени <strong>T = {T}</strong> было проведено <strong>{intervalsCount}</strong> экспериментов.
                <br /><br />
                Эмпирическое среднее значение (<strong>{stats.mean.toFixed(4)}</strong>) и дисперсия (<strong>{stats.variance.toFixed(4)}</strong>) близки к теоретическим значениям для распределения Пуассона, где
                $M[X] = D[X] = \lambda \cdot T = <strong>{stats.theoreticalMean.toFixed(4)}</strong>$.
                <br /><br />
                Небольшие отклонения объясняются случайным характером моделирования и конечным числом испытаний. С увеличением числа экспериментов эмпирические характеристики будут стремиться к теоретическим.
            </p>
        </section>
    );
};