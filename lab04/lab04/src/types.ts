export interface StatsResult {
  mean: number;
  variance: number;
  executionTimeMs: number;
}

export interface ComparisonData {
  theoreticalMean: number;
  theoreticalVariance: number;
  custom: StatsResult;
  builtIn: StatsResult;
}