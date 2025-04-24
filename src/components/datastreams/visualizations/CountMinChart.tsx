
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CountMinChartProps {
  data: Array<{
    name: string;
    actual: number;
    estimated: number;
  }>;
}

export const CountMinChart = ({ data }: CountMinChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="actual" fill="#8884d8" name="Actual Count" />
          <Bar dataKey="estimated" fill="#82ca9d" name="Estimated Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
