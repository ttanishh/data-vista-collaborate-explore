
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CountMinSketchProps {
  width?: number;
  height?: number;
}

export const CountMinSketch = ({ width = 600, height = 300 }: CountMinSketchProps) => {
  const [data, setData] = useState<any[]>([]);
  const [estimatedCounts, setEstimatedCounts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate stream data and Count-Min Sketch estimation
    const interval = setInterval(() => {
      const items = ['A', 'B', 'C', 'D', 'E'];
      const newData = items.map(item => ({
        name: item,
        actual: Math.floor(Math.random() * 100),
      }));
      
      const estimates = newData.map(d => ({
        ...d,
        estimated: d.actual + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)
      }));
      
      setData(newData);
      setEstimatedCounts(estimates);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Count-Min Sketch Explorer</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={estimatedCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="actual" fill="#8884d8" name="Actual Count" />
            <Bar dataKey="estimated" fill="#82ca9d" name="Estimated Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Shows real-time comparison between actual and estimated frequencies
      </div>
    </Card>
  );
};
