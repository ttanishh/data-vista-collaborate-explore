
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlaygroundTechnicalPanel } from './PlaygroundTechnicalPanel';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ChartConfig {
  type: 'line' | 'bar';
  data: any[];
  dataKey: string;
  colors?: string[];
}

export const RealWorldDemo: React.FC<{ module: string }> = ({ module }) => {
  const [selectedDataset, setSelectedDataset] = useState<string>('demo');
  const [userInputMode, setUserInputMode] = useState<boolean>(false);
  const [userInputValue, setUserInputValue] = useState<string>('');
  const [userInputLabel, setUserInputLabel] = useState<string>('');
  const { toast } = useToast();
  
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
    },
    introduction: {
      type: 'line',
      data: [
        { stage: 'Data Collection', healthcare: 80, finance: 65, retail: 45, transportation: 55 },
        { stage: 'Data Cleaning', healthcare: 70, finance: 85, retail: 60, transportation: 50 },
        { stage: 'Exploratory Analysis', healthcare: 90, finance: 75, retail: 50, transportation: 65 },
        { stage: 'Modeling', healthcare: 85, finance: 90, retail: 70, transportation: 80 },
        { stage: 'Deployment', healthcare: 65, finance: 80, retail: 75, transportation: 70 }
      ],
      dataKey: 'stage',
      colors: ['#6366f1', '#f59e0b', '#22c55e', '#ec4899']
    },
    largeScaleData: {
      type: 'bar',
      data: [
        { metric: 'Completeness', before: 65, after: 95 },
        { metric: 'Accuracy', before: 70, after: 90 },
        { metric: 'Consistency', before: 60, after: 85 },
        { metric: 'Timeliness', before: 75, after: 95 }
      ],
      dataKey: 'metric',
      colors: ['#94a3b8', '#22c55e']
    },
    dataManipulation: {
      type: 'bar',
      data: [
        { nodes: 2, sequential: 100, parallel: 55 },
        { nodes: 4, sequential: 100, parallel: 32 },
        { nodes: 8, sequential: 100, parallel: 18 },
        { nodes: 16, sequential: 100, parallel: 10 }
      ],
      dataKey: 'nodes',
      colors: ['#94a3b8', '#4f46e5']
    },
    textAnalysis: {
      type: 'bar',
      data: [
        { category: 'Product Reviews', positive: 65, neutral: 20, negative: 15 },
        { category: 'Support Tickets', positive: 40, neutral: 30, negative: 30 },
        { category: 'Social Media', positive: 55, neutral: 25, negative: 20 },
        { category: 'Surveys', positive: 70, neutral: 15, negative: 15 }
      ],
      dataKey: 'category',
      colors: ['#22c55e', '#94a3b8', '#ef4444']
    },
    dataStreams: {
      type: 'line',
      data: [
        { time: '0s', value: 50, threshold: 100 },
        { time: '10s', value: 55, threshold: 100 },
        { time: '20s', value: 62, threshold: 100 },
        { time: '30s', value: 58, threshold: 100 },
        { time: '40s', value: 70, threshold: 100 },
        { time: '50s', value: 115, threshold: 100 },
        { time: '60s', value: 95, threshold: 100 },
        { time: '70s', value: 75, threshold: 100 }
      ],
      dataKey: 'time',
      colors: ['#6366f1', '#dc2626']
    },
    advancedAnalysis: {
      type: 'line',
      data: [
        { user: 'User A', similarity: 0.8, recommendations: 5 },
        { user: 'User B', similarity: 0.6, recommendations: 4 },
        { user: 'User C', similarity: 0.9, recommendations: 7 },
        { user: 'User D', similarity: 0.7, recommendations: 5 },
        { user: 'User E', similarity: 0.5, recommendations: 3 }
      ],
      dataKey: 'user',
      colors: ['#0ea5e9', '#f59e0b']
    }
  };

  // Function to add user input data to charts
  const addUserDataPoint = () => {
    if (!userInputValue || !userInputLabel) return;
    
    const moduleKey = getModuleKey(module);
    const config = chartConfigs[moduleKey];
    
    if (!config) return;
    
    // Create a new data point
    const newDataPoint: any = {};
    newDataPoint[config.dataKey] = userInputLabel;
    
    // For each key in the first data item (except the dataKey)
    Object.keys(config.data[0])
      .filter(key => key !== config.dataKey)
      .forEach(key => {
        newDataPoint[key] = parseInt(userInputValue);
      });
    
    // Add the new data point
    chartConfigs[moduleKey].data = [...config.data, newDataPoint];
    
    toast({
      title: "Data point added",
      description: `Added new data for ${userInputLabel} with value ${userInputValue}`,
    });
    
    // Clear the input fields
    setUserInputValue('');
    setUserInputLabel('');
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
                  activeDot={{ r: 8 }}
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
    // Check if module name is already a key
    if (chartConfigs[moduleName]) return moduleName;
    
    // Convert to camelCase and check
    const camelCased = moduleName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    if (chartConfigs[camelCased]) return camelCased;
    
    // Convert to lowercase and remove spaces
    const key = moduleName.toLowerCase().replace(/\s+/g, '');
    
    // Return the key if it exists, otherwise default to introduction
    return chartConfigs[key] ? key : 'introduction';
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
          
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="user-input-mode" 
              checked={userInputMode}
              onCheckedChange={setUserInputMode} 
            />
            <Label htmlFor="user-input-mode">Enable user input</Label>
          </div>
          
          {userInputMode && (
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="flex-1">
                <Label htmlFor="input-label" className="sr-only">Label</Label>
                <Input
                  id="input-label"
                  placeholder={`Enter ${config.dataKey} (e.g., "New Point")`}
                  value={userInputLabel}
                  onChange={(e) => setUserInputLabel(e.target.value)}
                />
              </div>
              
              <div className="flex-1">
                <Label htmlFor="input-value" className="sr-only">Value</Label>
                <Input
                  id="input-value"
                  type="number"
                  placeholder="Enter value (e.g., 75)"
                  value={userInputValue}
                  onChange={(e) => setUserInputValue(e.target.value)}
                />
              </div>
              
              <Button onClick={addUserDataPoint} disabled={!userInputValue || !userInputLabel}>
                Add Data Point
              </Button>
            </div>
          )}
          
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
