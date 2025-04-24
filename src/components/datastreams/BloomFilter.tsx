
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface BloomFilterProps {
  size?: number;
  userUploadedData?: any[] | null;
}

export const BloomFilter = ({ size = 20, userUploadedData }: BloomFilterProps) => {
  const [filter, setFilter] = useState<boolean[]>(new Array(size).fill(false));
  const [items, setItems] = useState<string[]>([]);
  const [falsePositives, setFalsePositives] = useState<string[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      // Process user data if available
      const processItems = userUploadedData.map(item => 
        item.name || item.key || String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).slice(0, 5);
      
      setItems(processItems);
      
      // Simulate Bloom filter bits for user data
      const newFilter = new Array(size).fill(false);
      processItems.forEach(item => {
        const positions = [
          Math.floor(item.charCodeAt(0) % size),
          Math.floor((item.charCodeAt(0) * 31) % size),
          Math.floor((item.charCodeAt(0) * 37) % size)
        ];
        positions.forEach(pos => newFilter[pos] = true);
      });
      setFilter(newFilter);
      
      // Simulate some false positives
      setFalsePositives([
        String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ]);
    } else {
      // Use sample data generation
      const interval = setInterval(() => {
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
        
        if (Math.random() > 0.8) {
          setFalsePositives(prev => [
            ...prev,
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
          ].slice(-3));
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [userUploadedData, size]);

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
