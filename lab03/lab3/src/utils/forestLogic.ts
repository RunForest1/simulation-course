import { COLS, WATER, ROWS, EMPTY, TREE, FIRE } from '../constants';

export type Grid = number[][];
export type Stats = { trees: number; fire: number };

// Создание пустой сетки
export const createEmptyGrid = (): Grid => 
  Array.from({ length: COLS }, () => Array(ROWS).fill(EMPTY));

// Генерация случайного леса
export const initializeRandomForest = (probability: number = 0.5): Grid => {
  const grid = createEmptyGrid();
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (Math.random() < probability) {
        grid[x][y] = TREE;
      }
    }
  }
  return grid;
};

// Подсчет количества деревьев и огня
export const countStats = (grid: Grid): Stats => {
  let fire = 0;
  let trees = 0;
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[x][y] === FIRE) fire++;
      else if (grid[x][y] === TREE) trees++;
    }
  }
  return { trees, fire };
};

/**
 * Вычисление следующего шага с учетом дополнительных правил:
 * - windDirection: 0 (нет), 1 (влево), 2 (вправо), 3 (вверх), 4 (вниз)
 * - temperature: множитель риска (1.0 = норма, >1 = жарко, <1 = холодно)
 */
export const computeNextStep = (
  currentGrid: Grid, 
  probFire: number, 
  probGrowth: number,
  windDirection: number = 0,
  temperature: number = 1.0,
): { nextGrid: Grid; stats: Stats } => {
  
  const nextGrid = currentGrid.map(row => [...row]);
  let fireCount = 0;
  let treeCount = 0;

  // Направления ветра: 1=Right, 2=Left, 3=Down, 4=Up
  // Соседи: [dx, dy, directionCode]
  const neighbors = [
    { dx: 1, dy: 0, dir: 1 },   // Слева
    { dx: -1, dy: 0, dir: 2 },  // Справа
    { dx: 0, dy: 1, dir: 3 },   // Сверху
    { dx: 0, dy: -1, dir: 4 }   // Снизу
  ];

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      
      const cell = currentGrid[x][y];
      // Если это клетка реки -> она всегда пустая и не горит
      if (cell == WATER) {
        nextGrid[x][y] = WATER;
        continue;
      }

      if (cell === FIRE) {
        // Огонь живет один шаг, потом гаснет
        nextGrid[x][y] = EMPTY;
      } 
      else if (cell === TREE) {
        treeCount++;
        
        let ignitionChance = 0; // Базовый шанс возгорания от соседей

        // Проверка соседей
        for (const n of neighbors) {
          const nx = x + n.dx;
          const ny = y + n.dy;

          // Проверка границ массива
          if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
            if (currentGrid[nx][ny] === FIRE) {
              // Если сосед горит, базовый шанс = 1.0 (100%)
              let chance = 1.0;

              // Если направление ветра совпадает с направлением ОТ соседа К нам,
              // то шанс возгорания резко возрастает.
              if (windDirection === n.dir) {
                chance *= 2.5; // Усиливаем огонь по ветру
              }

              // Обновляем максимальный шанс (если несколько соседей горят, берем лучший)
              if (chance > ignitionChance) {
                ignitionChance = chance;
              }
            }
          }
        }

        // Температура влияет на общий шанс возгорания (умножаем итоговый шанс)
        const finalChance = ignitionChance * temperature;

        // Возгорание от соседа
        if (Math.random() < finalChance) {
          nextGrid[x][y] = FIRE;
          fireCount++;
        } 
        // Спонтанное возгорание (Молния)
        else if (Math.random() < (probFire * temperature)) {
          nextGrid[x][y] = FIRE;
          fireCount++;
        }

      } 
      else if (cell === EMPTY) {
        // Рост нового дерева (влажность можно реализовать как обратный множитель, но пока оставим просто)
        if (Math.random() < probGrowth) {
          nextGrid[x][y] = TREE;
          treeCount++;
        }
      }
    }
  }

  return { nextGrid, stats: { trees: treeCount, fire: fireCount } };
};

// Создание очага в центре
export const igniteCenter = (grid: Grid): Grid => {
  const newGrid = grid.map(row => [...row]);
  const cx = Math.floor(COLS / 2);
  const cy = Math.floor(ROWS / 2);
  
  newGrid[cx][cy] = FIRE;
  if (cx + 1 < COLS) newGrid[cx + 1][cy] = FIRE;
  if (cx - 1 >= 0) newGrid[cx - 1][cy] = FIRE;
  
  return newGrid;
};

// Изменение состояние клетки конкретной
export const updateCell = (grid: Grid, x: number, y: number, state: number): Grid => {
  const newGrid = grid.map(row => [...row]);
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    newGrid[x][y] = state;
  }
  return newGrid;
};