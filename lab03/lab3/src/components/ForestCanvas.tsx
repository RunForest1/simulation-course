import React from 'react';
import { CELL_SIZE, COLORS, EMPTY, CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

// Объявление интерфейса пропсов
interface ForestCanvasProps {
    grid: number[][];
    onCellInteract: (x: number, y: number) => void;
}

const ForestCanvas: React.FC<ForestCanvasProps> = ({ grid, onCellInteract }) => {

    const draw = (canvas: HTMLCanvasElement) => {

        if (!canvas || grid.length === 0) return;

        const ctx = canvas.getContext('2d'); // Получаем методы для рисования
        if (!ctx) return;

        // Очищаем холст
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const rows = grid.length;
        const cols = grid[0].length;

        // Проходим по каждой клетке массива
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                const cell = grid[x][y];
                if (cell !== EMPTY) {
                    ctx.fillStyle = COLORS[cell]; // Заполняем нужным цветом
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // рисуем в нужном месте
                }
            }
        }
    };

    // Обработка координат мыши
    const getGridCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = e.currentTarget; // Берем элемент из события
        if (!canvas || grid.length === 0) return { x: -1, y: -1 };

        const rect = canvas.getBoundingClientRect();

        // (Где нажали мышкой - где начался холст) / размер клетки
        const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

        // Проверка границы поля
        if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
            return { x, y };
        }
        return { x: -1, y: -1 };
    };


    // Клик
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getGridCoordinates(e);
        if (x !== -1 && y !== -1) onCellInteract(x, y);
    };

    // Зажата
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (e.buttons === 1) { // Только если зажата левая кнопка
            const { x, y } = getGridCoordinates(e);
            if (x !== -1 && y !== -1) onCellInteract(x, y);
        }
    };

    return (
        <canvas
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className="border-2 border-gray-800 bg-white cursor-crosshair"
            style={{
                imageRendering: 'pixelated',
                backgroundColor: COLORS[EMPTY]
            }}
            // Используем callback-ref. Он вызывается каждый раз, когда компонент рендерится.
            // Это гарантирует, что мы нарисуем актуальный grid сразу после того, как React обновит DOM.
            ref={(canvas) => {
                if (canvas) draw(canvas);
            }}
        />
    );
};

export default ForestCanvas;