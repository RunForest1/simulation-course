import React, { useState, useEffect, useRef } from 'react';
import Controls from './components/Controls';
import ServerView from './components/ServerView';
import QueueView from './components/QueueView';
import StatsPanel from './components/StatsPanel';
import type { Client, SimulationStats } from './types';
import { getExponential, calculateTheoreticalMetrics } from './utils/mm1';

const App: React.FC = () => {
    // Параметры системы
    const [lambda, setLambda] = useState<number>(0.8);
    const [mu, setMu] = useState<number>(1.2);

    // Состояние симуляции
    const [queue, setQueue] = useState<Client[]>([]);
    const [server, setServer] = useState<Client | null>(null);
    const [time, setTime] = useState<number>(0);
    const [stats, setStats] = useState<SimulationStats>({
        served: 0,
        lost: 0,
        avgWait: 0
    });

    // Рефы для управления симуляцией
    const timerRef = useRef<number | null>(null);
    const nextArrivalTime = useRef<number>(0);
    const nextDepartureTime = useRef<number>(Infinity);
    const clientIdCounter = useRef<number>(0);
    const waitTimes = useRef<number[]>([]);

    // Инициализация первого события прибытия
    useEffect(() => {
        nextArrivalTime.current = getExponential(lambda);
    }, []);

    // Основной цикл симуляции
    useEffect(() => {
        const tick = () => {
            setTime((prev) => prev + 0.1);
            const currentTime = time + 0.1;

            let serverUpdated = server;
            const queueUpdated = [...queue];
            const statsUpdated = { ...stats };

            // 1. Проверка прибытия нового клиента
            if (currentTime >= nextArrivalTime.current) {
                const newClient: Client = {
                    id: ++clientIdCounter.current,
                    arrivalTime: currentTime
                };

                if (!serverUpdated) {
                    // Сервер свободен
                    serverUpdated = newClient;
                    serverUpdated.serviceStartTime = currentTime;
                    nextDepartureTime.current = currentTime + getExponential(mu);
                } else {
                    // Сервер занят, клиент в очередь
                    queueUpdated.push(newClient);
                }

                // Планируем следующее прибытие
                nextArrivalTime.current = currentTime + getExponential(lambda);
            }

            // 2. Проверка завершения обслуживания
            if (serverUpdated && currentTime >= nextDepartureTime.current) {
                const finishedClient = serverUpdated;
                const waitTime = (finishedClient.serviceStartTime || currentTime) - finishedClient.arrivalTime;
                waitTimes.current.push(waitTime);

                statsUpdated.served += 1;

                // Обновляем среднее время ожидания
                const totalWait = waitTimes.current.reduce((a, b) => a + b, 0);
                statsUpdated.avgWait = totalWait / waitTimes.current.length;

                // Берем следующего из очереди
                if (queueUpdated.length > 0) {
                    const nextClient = queueUpdated.shift()!;
                    serverUpdated = nextClient;
                    serverUpdated.serviceStartTime = currentTime;
                    nextDepartureTime.current = currentTime + getExponential(mu);
                } else {
                    serverUpdated = null;
                    nextDepartureTime.current = Infinity;
                }
            }

            // Обновление состояния
            setServer(serverUpdated);
            setQueue(queueUpdated);
            setStats(statsUpdated);
        };

        timerRef.current = window.setInterval(tick, 50);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [time, lambda, mu, queue, server, stats]);

    // Расчет теоретических метрик
    const metrics = calculateTheoreticalMetrics(lambda, mu);

    return (
        <div className="min-h-screen min-w-screen bg-white p-6 font-sans text-gray-800">
            <div className='container mx-auto'>
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Симуляция системы M/M/1
                </h1>

                <Controls
                    lambda={lambda}
                    mu={mu}
                    rho={metrics.rho}
                    onLambdaChange={setLambda}
                    onMuChange={setMu}
                />

                <div className="flex flex-col md:flex-row gap-8 items-start justify-center mb-8">
                    <ServerView client={server} />
                    <QueueView queue={queue} />
                </div>

                <StatsPanel
                    stats={stats}
                    queueLength={queue.length}
                    theoreticalLq={metrics.Lq}
                    theoreticalWq={metrics.Wq}
                    isStable={metrics.isStable}
                />
            </div>
        </div>
    );
};

export default App;