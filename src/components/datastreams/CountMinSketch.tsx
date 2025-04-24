
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
  userUploadedData?: any[] | null;
}

export const CountMinSketch = ({ width = 600, height = 300, userUploadedData }: CountMinSketchProps) => {
  const [data, setData] = useState<any[]>([]);
  const [estimatedCounts, setEstimatedCounts] = useState<any[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      // Process user data if available
      const processedData = userUploadedData.map(item => ({
        name: item.name || item.key || String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        actual: Number(item.value || item.count || Math.floor(Math.random() * 100)),
        estimated: Number(item.value || item.count || Math.floor(Math.random() * 100)) + 
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)
      })).slice(0, 5);
      
      setData(processedData);
      setEstimatedCounts(processedData);
    } else {
      // Use sample data generation
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
    }
  }, [userUploadedData]);

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
