/**
 * Базовый датчик случайного события.
 * Возвращает true, если случайное число α < p.
 * P{α < p} = p
 */
export const checkEventProbability = (p: number): boolean => {
  const alpha = Math.random();
  return alpha < p;
};

/**
 * Генерация события из полной группы несовместных событий.
 * @param probabilities Массив вероятностей [p1, p2, ..., pm], где сумма = 1.
 * @returns Индекс наступившего события (k).
 */
export const generateGroupEvent = (probabilities: number[]): number => {
  const alpha = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (alpha < cumulativeProbability) {
      return i;
    }
  }

  // Защита от ошибок округления (если alpha очень близко к 1)
  return probabilities.length - 1;
};
