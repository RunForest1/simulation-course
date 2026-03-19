// Формула Эрланга B (для системы с отказами, без очереди)
// Используется как приблизительная оценка вероятности отказа
export const calculateErlangB = (
  lambda: number,
  mu: number,
  n: number,
): number => {
  const rho = lambda / mu;
  let sum = 0;

  // Вычисляем сумму ряда
  for (let k = 0; k <= n; k++) {
    let factorial = 1;
    for (let i = 1; i <= k; i++) factorial *= i;
    sum += Math.pow(rho, k) / factorial;
  }

  let numeratorFactorial = 1;
  for (let i = 1; i <= n; i++) numeratorFactorial *= i;

  const numerator = Math.pow(rho, n) / numeratorFactorial;
  return numerator / sum;
};
