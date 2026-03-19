/**
 * Генерация экспоненциально распределенного случайного числа
 * Формула: -ln(U) / λ, где U ~ Uniform(0,1)
 */
export const getExponential = (rate: number): number => {
  return -Math.log(Math.random()) / rate;
};

/**
 * Расчет теоретических характеристик системы M/M/1
 * Возвращает null, если система нестабильна (ρ >= 1)
 */
export const calculateTheoreticalMetrics = (lambda: number, mu: number) => {
  const rho = lambda / mu;

  if (rho >= 1) {
    return {
      rho,
      isStable: false,
      Lq: null, // Средняя длина очереди
      Wq: null, // Среднее время ожидания в очереди
      Ls: null, // Среднее число заявок в системе
      Ws: null, // Среднее время пребывания в системе
    };
  }

  return {
    rho,
    isStable: true,
    Lq: (rho * rho) / (1 - rho),
    Wq: rho / (mu * (1 - rho)),
    Ls: rho / (1 - rho),
    Ws: 1 / (mu - lambda),
  };
};
