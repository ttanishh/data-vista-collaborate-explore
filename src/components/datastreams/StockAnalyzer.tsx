
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

interface StockAnalyzerProps {
  userUploadedData?: any[] | null;
}

export const StockAnalyzer = ({ userUploadedData }: StockAnalyzerProps) => {
  const [data, setData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      // Process user data if available
      const processedData = userUploadedData.map((item, index) => ({
        time: index,
        price: Number(item.price || item.value || item.count || 0)
      }));
      
      setData(processedData.slice(-30));
      
      // Analyze for significant changes
      processedData.forEach((item, index) => {
        if (index > 0) {
          const change = item.price - processedData[index - 1].price;
          if (Math.abs(change) > 3) {
            const alertType = change > 0 ? 'spike' : 'drop';
            setAlerts(prev => [...prev, 
              `${alertType.toUpperCase()}: $${Math.abs(change).toFixed(2)} change at ${new Date().toLocaleTimeString()}`
            ].slice(-3));
          }
        }
      });
    } else {
      // Use sample data generation
      let basePrice = 100;
      let time = 0;
      
      const interval = setInterval(() => {
        const change = (Math.random() - 0.5) * 5;
        const newPrice = basePrice + change;
        basePrice = newPrice;
        
        if (Math.abs(change) > 3) {
          const alertType = change > 0 ? 'spike' : 'drop';
          setAlerts(prev => [...prev, 
            `${alertType.toUpperCase()}: $${Math.abs(change).toFixed(2)} change at ${new Date().toLocaleTimeString()}`
          ].slice(-3));
        }
        
        setData(prev => [...prev, {
          time: time++,
          price: newPrice
        }].slice(-30));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userUploadedData]);

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
