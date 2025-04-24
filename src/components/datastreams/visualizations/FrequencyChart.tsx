
import React from 'react';
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

interface FrequencyChartProps {
  data: Array<{
    time: number;
    naive: number;
    lossy: number;
    sticky: number;
  }>;
}

export const FrequencyChart = ({ data }: FrequencyChartProps) => {
  return (
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
  );
};
