import type { StatsResult } from "../types";


export const THEORETICAL_MEAN = 0.5;
export const THEORETICAL_VARIANCE = 1 / 12;
export const SAMPLE_SIZE = 100000;

export const calculateStats = (
  values: number[],
  startTime: number,
): StatsResult => {
  const n = values.length;

  // Выборочное среднее
  const mean = values.reduce((acc, val) => acc + val, 0) / n;

  // Выборочная дисперсия (несмещенная оценка)
  const variance =
    values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);

  const endTime = performance.now();

  return {
    mean,
    variance,
    executionTimeMs: endTime - startTime,
  };
};

export const fmt = (num: number, digits: number = 6): string =>
  num.toFixed(digits);
