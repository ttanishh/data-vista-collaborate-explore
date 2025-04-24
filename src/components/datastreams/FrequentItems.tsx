
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { FrequencyChart } from './visualizations/FrequencyChart';
import { generateRandomFrequencyData } from '@/utils/streamData';

interface FrequentItemsProps {
  userUploadedData?: any[] | null;
}

export const FrequentItems = ({ userUploadedData }: FrequentItemsProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      // Process user data if available
      const processedData = userUploadedData.map((item, index) => ({
        time: index,
        naive: Number(item.value || item.count || Math.random() * 100),
        lossy: Number(item.value || item.count || Math.random() * 100) * 0.9,
        sticky: Number(item.value || item.count || Math.random() * 100) * 0.85
      }));
      setData(processedData.slice(-20));
    } else {
      // Use sample data generation
      let count = 0;
      const interval = setInterval(() => {
        const { naive, lossy, sticky } = generateRandomFrequencyData();
        setData(prev => [...prev, {
          time: count++,
          naive,
          lossy,
          sticky
        }].slice(-20));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userUploadedData]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Frequent Items Comparison</h3>
      <FrequencyChart data={data} />
    </Card>
  );
};
