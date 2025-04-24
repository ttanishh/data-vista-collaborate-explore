
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";

export const StockAnalyzer = () => {
  const [data, setData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    let basePrice = 100;
    let time = 0;
    
    const interval = setInterval(() => {
      // Simulate price changes
      const change = (Math.random() - 0.5) * 5;
      const newPrice = basePrice + change;
      basePrice = newPrice;
      
      // Detect significant changes
      if (Math.abs(change) > 3) {
        const alertType = change > 0 ? 'spike' : 'drop';
        setAlerts(prev => [...prev, `${alertType.toUpperCase()}: $${Math.abs(change).toFixed(2)} change at ${new Date().toLocaleTimeString()}`].slice(-3));
      }
      
      setData(prev => [...prev, {
        time: time++,
        price: newPrice
      }].slice(-30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Real-time Stock Analysis</h3>
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
      <div className="mt-4 space-y-2">
        {alerts.map((alert, i) => (
          <Alert key={i} variant={alert.includes('SPIKE') ? "default" : "destructive"}>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        ))}
      </div>
    </Card>
  );
};
