/**
 * Базовый датчик
 * Параметры: a = 16807, M = 2^31 - 1 (число Парка-Миллера)
 */
export class CustomRNG {
  private seed: number;
  private readonly a: number = 16807;
  private readonly m: number = 2147483647; // 2^31 - 1 (макс. положительное число)

  constructor(seed: number) {
    this.seed = seed % this.m;
    if (this.seed <= 0) this.seed += 1;
  }

  // xi+1 =(β⋅xi)modM) формула датчика
  next(): number {
    this.seed = (this.a * this.seed) % this.m;
    return this.seed / this.m;
  }
}