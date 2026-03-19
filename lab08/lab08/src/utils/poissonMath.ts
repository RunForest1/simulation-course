export interface SimulationStats {
  totalIntervals: number;
  mean: number;
  variance: number;
  theoreticalMean: number;
  theoreticalVariance: number;
  distribution: Record<number, number>;
}

const random = () => Math.random();

const generateExponential = (lambda: number) => {
  const u = random();
  // Защита от логарифма нуля
  if (u === 0) return generateExponential(lambda);
  return -Math.log(u) / lambda;
};

export const simulateInterval = (lambda: number, T: number): number => {
  let currentTime = 0;
  let count = 0;

  while (currentTime < T) {
    const dt = generateExponential(lambda);
    currentTime += dt;
    if (currentTime <= T) {
      count++;
    }
  }
  return count;
};

export const runSimulation = (
  lambda: number,
  T: number,
  count: number,
): number[] => {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(simulateInterval(lambda, T));
  }
  return results;
};

export const calculateStats = (
  results: number[],
  lambda: number,
  T: number,
): SimulationStats => {
  const n = results.length;
  if (n === 0) {
    return {
      totalIntervals: 0,
      mean: 0,
      variance: 0,
      theoreticalMean: 0,
      theoreticalVariance: 0,
      distribution: {},
    };
  }

  const mean = results.reduce((a, b) => a + b, 0) / n;
  const variance =
    results.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    (n > 1 ? n - 1 : n);

  const distribution: Record<number, number> = {};
  results.forEach((val) => {
    distribution[val] = (distribution[val] || 0) + 1;
  });

  const expectedValue = lambda * T;

  return {
    totalIntervals: n,
    mean,
    variance,
    theoreticalMean: expectedValue,
    theoreticalVariance: expectedValue,
    distribution,
  };
};
