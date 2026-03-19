import { TRANSITION_MATRIX, type WeatherState } from "../types/weather";


export const getNextState = (currentState: WeatherState): WeatherState => {
  const row = TRANSITION_MATRIX[currentState - 1];
  const rand = Math.random();
  let cumulative = 0;

  for (let i = 0; i < row.length; i++) {
    cumulative += row[i];
    if (rand < cumulative) {
      return (i + 1) as WeatherState;
    }
  }
  return currentState;
};

export const calculateStationaryDistribution = (): number[] => {
  let matrix = TRANSITION_MATRIX.map((row) => [...row]);

  // Метод степеней для сходимости
  for (let k = 0; k < 50; k++) {
    const newMatrix = Array(3)
      .fill(0)
      .map(() => Array(3).fill(0));
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let l = 0; l < 3; l++) {
          newMatrix[i][j] += matrix[i][l] * matrix[l][j];
        }
      }
    }
    matrix = newMatrix;
  }
  return matrix[0];
};
