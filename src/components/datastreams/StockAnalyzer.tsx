
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StockChart } from './visualizations/StockChart';
import { generateSampleStockData, isSignificantChange } from '@/utils/streamData';

interface StockAnalyzerProps {
  userUploadedData?: any[] | null;
}

export const StockAnalyzer = ({ userUploadedData }: StockAnalyzerProps) => {
  const [data, setData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (userUploadedData) {
      const processedData = userUploadedData.map((item, index) => ({
        time: index,
        price: Number(item.price || item.value || item.count || 0)
      }));
      
      setData(processedData.slice(-30));
      
      processedData.forEach((item, index) => {
        if (index > 0) {
          const change = item.price - processedData[index - 1].price;
          if (isSignificantChange(change)) {
            const alertType = change > 0 ? 'spike' : 'drop';
            setAlerts(prev => [...prev, 
              `${alertType.toUpperCase()}: $${Math.abs(change).toFixed(2)} change at ${new Date().toLocaleTimeString()}`
            ].slice(-3));
          }
        }
      });
    } else {
      let basePrice = 100;
      let time = 0;
      
      const interval = setInterval(() => {
        const newPrice = generateSampleStockData(basePrice);
        const change = newPrice - basePrice;
        basePrice = newPrice;
        
        if (isSignificantChange(change)) {
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
      <StockChart data={data} />
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
