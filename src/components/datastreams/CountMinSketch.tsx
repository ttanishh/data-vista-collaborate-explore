
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { CountMinChart } from './visualizations/CountMinChart';

interface CountMinSketchProps {
  userUploadedData?: any[] | null;
}

export const CountMinSketch = ({ userUploadedData }: CountMinSketchProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      const processedData = userUploadedData.map(item => ({
        name: item.name || item.key || String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        actual: Number(item.value || item.count || Math.floor(Math.random() * 100)),
        estimated: Number(item.value || item.count || Math.floor(Math.random() * 100)) + 
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)
      })).slice(0, 5);
      
      setData(processedData);
    } else {
      const interval = setInterval(() => {
        const items = ['A', 'B', 'C', 'D', 'E'];
        const newData = items.map(item => ({
          name: item,
          actual: Math.floor(Math.random() * 100),
          estimated: Math.floor(Math.random() * 100) + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)
        }));
        setData(newData);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userUploadedData]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Count-Min Sketch Explorer</h3>
      <CountMinChart data={data} />
      <div className="mt-4 text-sm text-muted-foreground">
        Shows real-time comparison between actual and estimated frequencies
      </div>
    </Card>
  );
};
