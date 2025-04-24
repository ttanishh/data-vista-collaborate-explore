
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlaygroundTechnicalPanel } from './PlaygroundTechnicalPanel';

interface ChartConfig {
  type: 'line' | 'bar';
  data: any[];
  dataKey: string;
  colors?: string[];
}

export const RealWorldDemo: React.FC<{ module: string }> = ({ module }) => {
  const [selectedDataset, setSelectedDataset] = useState<string>('demo');
  
  const chartConfigs: { [key: string]: ChartConfig } = {
    urbanMobility: {
      type: 'line',
      data: [
        { hour: '6am', passengers: 1200, optimized: 1000 },
        { hour: '9am', passengers: 2800, optimized: 2200 },
        { hour: '12pm', passengers: 1800, optimized: 1600 },
        { hour: '3pm', passengers: 2000, optimized: 1800 },
        { hour: '6pm', passengers: 3000, optimized: 2400 },
        { hour: '9pm', passengers: 1500, optimized: 1300 }
      ],
      dataKey: 'hour',
      colors: ['#4f46e5', '#22c55e']
    },
    agriculture: {
      type: 'bar',
      data: [
        { month: 'Jan', rainfall: 45, soilMoisture: 30, temperature: 20 },
        { month: 'Feb', rainfall: 52, soilMoisture: 35, temperature: 22 },
        { month: 'Mar', rainfall: 48, soilMoisture: 32, temperature: 25 },
        { month: 'Apr', rainfall: 60, soilMoisture: 40, temperature: 28 },
        { month: 'May', rainfall: 55, soilMoisture: 38, temperature: 30 }
      ],
      dataKey: 'month',
      colors: ['#0ea5e9', '#84cc16', '#f59e0b']
    },
    medicalResearch: {
      type: 'line',
      data: [
        { day: 1, processing: 100, optimized: 20 },
        { day: 2, processing: 95, optimized: 18 },
        { day: 3, processing: 120, optimized: 22 },
        { day: 4, processing: 110, optimized: 21 },
        { day: 5, processing: 130, optimized: 24 }
      ],
      dataKey: 'day',
      colors: ['#6366f1', '#ec4899']
    },
    customerExperience: {
      type: 'bar',
      data: [
        { category: 'Product', positive: 75, negative: 25 },
        { category: 'Service', positive: 85, negative: 15 },
        { category: 'Support', positive: 70, negative: 30 },
        { category: 'Delivery', positive: 80, negative: 20 }
      ],
      dataKey: 'category',
      colors: ['#22c55e', '#ef4444']
    },
    predictiveMaintenance: {
      type: 'line',
      data: [
        { time: '1h', temperature: 80, vibration: 20, threshold: 90 },
        { time: '2h', temperature: 85, vibration: 25, threshold: 90 },
        { time: '3h', temperature: 95, vibration: 40, threshold: 90 },
        { time: '4h', temperature: 88, vibration: 30, threshold: 90 },
        { time: '5h', temperature: 92, vibration: 35, threshold: 90 }
      ],
      dataKey: 'time',
      colors: ['#f59e0b', '#6366f1', '#dc2626']
    },
    healthcare: {
      type: 'bar',
      data: [
        { dept: 'ER', current: 85, optimized: 65 },
        { dept: 'Surgery', current: 75, optimized: 60 },
        { dept: 'ICU', current: 90, optimized: 70 },
        { dept: 'Pediatrics', current: 70, optimized: 55 }
      ],
      dataKey: 'dept',
      colors: ['#6366f1', '#22c55e']
    }
  };

  const renderChart = (config: ChartConfig) => {
    if (config.type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={config.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.dataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(config.data[0])
              .filter(key => key !== config.dataKey)
              .map((key, index) => (
                <Line 
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={config.colors?.[index] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  strokeWidth={2}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={config.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={config.dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(config.data[0])
            .filter(key => key !== config.dataKey)
            .map((key, index) => (
              <Bar 
                key={key}
                dataKey={key}
                fill={config.colors?.[index] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Handle the module name transformation to match chartConfigs keys
  const getModuleKey = (moduleName: string) => {
    // Convert to lowercase and remove spaces
    const key = moduleName.toLowerCase().replace(/\s+/g, '');
    // Return the key if it exists, otherwise default to urbanMobility
    return chartConfigs[key] ? key : 'urbanMobility';
  };

  const moduleKey = getModuleKey(module);
  const config = chartConfigs[moduleKey];

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            {module} Application Demo
          </h3>
          <div className="mt-4">
            {config && renderChart(config)}
          </div>
        </div>
      </Card>
      <PlaygroundTechnicalPanel 
        module={moduleKey as any}
      />
    </div>
  );
};
