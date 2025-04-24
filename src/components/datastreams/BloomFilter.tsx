
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface BloomFilterProps {
  size?: number;
}

export const BloomFilter = ({ size = 20 }: BloomFilterProps) => {
  const [filter, setFilter] = useState<boolean[]>(new Array(size).fill(false));
  const [items, setItems] = useState<string[]>([]);
  const [falsePositives, setFalsePositives] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new items being added
      const newItem = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const positions = [
        Math.floor(Math.random() * size),
        Math.floor(Math.random() * size),
        Math.floor(Math.random() * size)
      ];
      
      setFilter(prev => {
        const newFilter = [...prev];
        positions.forEach(pos => newFilter[pos] = true);
        return newFilter;
      });
      
      setItems(prev => [...prev, newItem].slice(-5));
      
      // Simulate false positives
      if (Math.random() > 0.8) {
        setFalsePositives(prev => [
          ...prev,
          String.fromCharCode(65 + Math.floor(Math.random() * 26))
        ].slice(-3));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [size]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Bloom Filter Visualization</h3>
      <div className="grid grid-cols-10 gap-1">
        {filter.map((bit, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded flex items-center justify-center text-xs
              ${bit ? 'bg-primary text-white' : 'bg-secondary'}`}
          >
            {i}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-sm">
          <span className="font-medium">Recent Items: </span>
          {items.join(', ')}
        </div>
        <div className="text-sm text-destructive">
          <span className="font-medium">False Positives: </span>
          {falsePositives.join(', ')}
        </div>
      </div>
    </Card>
  );
};
