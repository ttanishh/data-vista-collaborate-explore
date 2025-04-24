
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StockChartProps {
  data: Array<{
    time: number;
    price: number;
  }>;
}

export const StockChart = ({ data }: StockChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            dot={false}
            name="Stock Price" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
