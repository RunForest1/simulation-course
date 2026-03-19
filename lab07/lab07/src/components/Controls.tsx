interface Props {
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
}

export const Controls: React.FC<Props> = ({ isRunning, onToggle, onReset }) => {
    return (
        <div className="flex gap-4 mt-8">
            <button
                onClick={onToggle}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${isRunning
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
            >
                {isRunning ? 'Пауза' : 'Старт'}
            </button>
            <button
                onClick={onReset}
                className="px-6 py-2 rounded-lg font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
                Сброс
            </button>
        </div>
    );
};