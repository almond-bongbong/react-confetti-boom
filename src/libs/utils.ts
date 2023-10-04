export const randomNumBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

export const isBrowser = () => typeof window !== 'undefined';
