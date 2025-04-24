
export const generateSampleStockData = (basePrice: number) => {
  const change = (Math.random() - 0.5) * 5;
  return basePrice + change;
};

export const generateRandomFrequencyData = () => ({
  naive: Math.random() * 100,
  lossy: Math.random() * 90,
  sticky: Math.random() * 85
});

export const isSignificantChange = (change: number, threshold: number = 3) => {
  return Math.abs(change) > threshold;
};
