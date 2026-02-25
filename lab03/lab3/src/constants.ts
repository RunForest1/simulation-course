export const COLS = 100; // Столбцы
export const ROWS = 100; // Строки
export const CELL_SIZE = 5; // Размер ячейки
export const CANVAS_WIDTH = COLS * CELL_SIZE;
export const CANVAS_HEIGHT = ROWS * CELL_SIZE;

export const EMPTY = 0;
export const TREE = 1;
export const FIRE = 2;
export const WATER = 3;

export const COLORS: Record<number, string> = {
  [EMPTY]: '#895129',
  [TREE]: '#2E8B57',
  [FIRE]: '#FF4500',
  [WATER]: '#0000FF',
};

export const DEFAULT_PROB_FIRE = 0.002;
export const DEFAULT_PROB_GROWTH = 0.01;