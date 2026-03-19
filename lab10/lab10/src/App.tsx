import React, { useState, useEffect, useRef } from 'react';
import Controls from './components/Controls';
import ServerPool from './components/ServerPool';
import QueueView from './components/QueueView';
import StatsPanel from './components/StatsPanel';
import { MMnSystem } from './models/System';
import { Client } from './models/Client';
import { calculateErlangB } from './utils/mmn';

const App: React.FC = () => {
    // Параметры
    const [lambda, setLambda] = useState(1.2);
    const [mu, setMu] = useState(1.0);
    const [n, setN] = useState(2);
    const [maxQueue, setMaxQueue] = useState(5);
    const [patience, setPatience] = useState(4.0);

    // Состояние для рендера
    const [currentTime, setCurrentTime] = useState(0);
    const [queueSnapshot, setQueueSnapshot] = useState<Client[]>([]);
    const [serversSnapshot, setServersSnapshot] = useState<(Client | null)[]>([]);
    const [stats, setStats] = useState({ served: 0, rejected: 0, leftQueue: 0, avgWait: 0, queueLength: 0, busyServers: 0 });

    // НОВОЕ: Состояние для отображения счетчика клиентов
    const [totalClientsCreated, setTotalClientsCreated] = useState(0);

    // Рефы логики (не используются в JSX напрямую)
    const systemRef = useRef<MMnSystem>(new MMnSystem(n, maxQueue));
    const nextArrivalTime = useRef(0);
    const timerRef = useRef<number | null>(null);
    const clientIdCounter = useRef(0);

    // Инициализация первого прихода
    useEffect(() => {
        nextArrivalTime.current = -Math.log(Math.random()) / lambda;
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [lambda]);

    // Обновление конфигурации системы при изменении ползунков
    useEffect(() => {
        systemRef.current.resizeServers(n);
        systemRef.current.setMaxQueue(maxQueue);
    }, [n, maxQueue]);

    // Основной цикл симуляции
    useEffect(() => {
        const tick = () => {
            const dt = 0.1;
            const newTime = currentTime + dt;
            setCurrentTime(newTime);

            const sys = systemRef.current;

            // 1. Генерация прибытия
            if (newTime >= nextArrivalTime.current) {
                const client = new Client(++clientIdCounter.current, newTime, mu, patience);
                sys.arrive(client);
                nextArrivalTime.current = newTime + (-Math.log(Math.random()) / lambda);

                // ОБНОВЛЕНИЕ: Синхронизируем ref со state для отображения
                setTotalClientsCreated(clientIdCounter.current);
            }

            // 2. Шаг системы (обработка событий)
            sys.step(newTime);

            // 3. Обновление состояния для React
            setQueueSnapshot(sys.getQueue());
            setServersSnapshot(sys.getServers());
            setStats(sys.getStats());
        };

        timerRef.current = window.setInterval(tick, 50);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [currentTime, lambda, mu, patience]);

    const rho = lambda / (n * mu);
    const erlangB = rho < 1 ? calculateErlangB(lambda, mu, n) : 1;

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Лабораторная 10: M/M/n/K</h1>
                    <p className="text-gray-600 mt-2">
                        Многоканальная СМО с ограниченной очередью и нетерпеливыми заявками.
                        <span className="block text-sm mt-1 text-orange-600 font-medium">
                            Красные заявки в очереди скоро уйдут (нетерпение).
                        </span>
                    </p>
                </header>

                <Controls
                    lambda={lambda} mu={mu} n={n} maxQueue={maxQueue} patience={patience}
                    onLambdaChange={setLambda} onMuChange={setMu} onNChange={setN}
                    onMaxQueueChange={setMaxQueue} onPatienceChange={setPatience}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-100">
                    <ServerPool servers={serversSnapshot} />
                    <QueueView queue={queueSnapshot} currentTime={currentTime} maxQueue={maxQueue} />
                </div>

                <StatsPanel stats={stats} rho={rho} erlangB={erlangB} />

                <div className="mt-8 text-center text-xs text-gray-400">
                    Время моделирования: {currentTime.toFixed(1)} | Всего создано заявок: {totalClientsCreated}
                </div>
            </div>
        </div>
    );
};

export default App;