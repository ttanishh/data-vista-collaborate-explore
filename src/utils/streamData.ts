
export const generateSampleStockData = (basePrice: number) => {
  // Simulated market data with small random fluctuations
  const change = (Math.random() - 0.5) * 5;  // Random price change between -2.5 and +2.5
  return basePrice + change;
};

export const generateRandomFrequencyData = () => ({
  naive: Math.floor(Math.random() * 100),    // Simple counter
  lossy: Math.floor(Math.random() * 90),     // Lossy counting (simulated)
  sticky: Math.floor(Math.random() * 85)      // Sticky sampling (simulated)
});

export const isSignificantChange = (change: number, threshold: number = 3) => {
  return Math.abs(change) > threshold;
};

// Sample data format examples for user reference
export const sampleDataFormats = {
  stockData: [
    { timestamp: '2024-01-01T10:00:00', price: 100.50 },
    { timestamp: '2024-01-01T10:01:00', price: 101.20 }
  ],
  frequencyData: [
    { item: 'A', count: 50 },
    { item: 'B', count: 30 }
  ],
  bloomFilterData: [
    { value: 'apple' },
    { value: 'banana' }
  ]
};
