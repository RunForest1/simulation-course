export type WeatherState = 1 | 2 | 3;

export interface WeatherConfig {
  label: string;
  color: string;
  bg: string;
  icon: string;
}

export const WEATHER_CONFIG: Record<WeatherState, WeatherConfig> = {
  1: {
    label: "Ясно",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    icon: "☀️",
  },
  2: {
    label: "Облачно",
    color: "text-gray-600",
    bg: "bg-gray-200",
    icon: "⛅",
  },
  3: {
    label: "Пасмурно",
    color: "text-slate-700",
    bg: "bg-slate-300",
    icon: "☁️",
  },
};

// Матрица переходных вероятностей
export const TRANSITION_MATRIX: number[][] = [
  [0.6, 0.3, 0.1], // Из Ясно
  [0.2, 0.5, 0.3], // Из Облачно
  [0.1, 0.2, 0.7], // Из Пасмурно
];
