import React from 'react';

export const Conclusion: React.FC = () => {
    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Вывод по работе
            </h3>
            <p className="text-indigo-800 leading-relaxed text-sm md:text-base">
                В ходе имитационного моделирования было проведено 4 серии экспериментов с объемами выборок
                <strong> N = 10, 100, 1000, 10000</strong>.
                <br /><br />
                1. <strong>Сходимость характеристик:</strong> С ростом N относительные погрешности выборочного среднего и дисперсии монотонно уменьшаются. При малых N (10, 100) погрешность может достигать значительных величин (&gt;10-20%), тогда как при N=10000 она стремится к нулю (&lt;1%).
                <br />
                2. <strong>Критерий χ²:</strong> При малых объемах выборки гипотеза о соответствии эмпирического распределения теоретическому часто <span className="font-bold text-rose-600">отклоняется</span> из-за случайных флуктуаций частот. При увеличении N (особенно 1000 и 10000) статистика χ² стабилизируется и становится меньше критического значения, что позволяет <span className="font-bold text-emerald-600">принять гипотезу</span>.
                <br /><br />
                Это подтверждает работоспособность алгоритма генерации ДСВ методом интервалов и закон больших чисел.
            </p>
        </div>
    );
};