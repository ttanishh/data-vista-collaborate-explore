
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

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
        const naive = Math.random() * 100;
        const lossy = naive * (1 - Math.random() * 0.1);
        const sticky = naive * (1 - Math.random() * 0.15);
        
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
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="naive" stroke="#8884d8" name="Naive Counting" />
            <Line type="monotone" dataKey="lossy" stroke="#82ca9d" name="Lossy Counting" />
            <Line type="monotone" dataKey="sticky" stroke="#ffc658" name="Sticky Sampling" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
