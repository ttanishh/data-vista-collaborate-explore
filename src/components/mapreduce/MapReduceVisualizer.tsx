
import React, { useRef, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  key: string;
  value: number;
}

interface MapReduceVisualizerProps {
  data: any[];
  phase: 'map' | 'shuffle' | 'reduce' | 'complete';
  operation: string;
  progress: {
    map: number;
    shuffle: number;
    reduce: number;
  };
}

export const MapReduceVisualizer = ({ data, phase, operation, progress }: MapReduceVisualizerProps) => {
  const [mappedData, setMappedData] = useState<DataPoint[]>([]);
  const [reducedData, setReducedData] = useState<DataPoint[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!data) return;

    // Simulate map phase
    if (phase === 'map' || phase === 'shuffle') {
      const mapped = processMapPhase(data, operation);
      setMappedData(mapped);
    }

    // Simulate reduce phase
    if (phase === 'reduce' || phase === 'complete') {
      const reduced = processReducePhase(mappedData);
      setReducedData(reduced);
    }
  }, [data, phase, operation]);

  const processMapPhase = (inputData: any[], op: string): DataPoint[] => {
    let result: DataPoint[] = [];

    switch (op) {
      case "wordcount":
        // Split text into words and count initial occurrences
        inputData.forEach(item => {
          if (item.text) {
            const words = item.text.toLowerCase().split(/\s+/);
            words.forEach(word => {
              if (word) {
                result.push({ key: word, value: 1 });
              }
            });
          }
        });
        break;

      case "aggregate":
        // Map each item to its category
        inputData.forEach(item => {
          if (item.category && item.value) {
            result.push({ key: item.category, value: Number(item.value) });
          }
        });
        break;

      case "filter":
        // Map items that meet the filter condition
        inputData.forEach(item => {
          if (item.value && Number(item.value) > 50) {
            result.push({ key: String(item.id || 'item'), value: Number(item.value) });
          }
        });
        break;
    }

    return result;
  };

  const processReducePhase = (mappedData: DataPoint[]): DataPoint[] => {
    const reduced = new Map<string, number>();
    
    mappedData.forEach(({ key, value }) => {
      reduced.set(key, (reduced.get(key) || 0) + value);
    });

    return Array.from(reduced.entries())
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Keep top 10 for visualization
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`p-4 ${phase === 'map' ? "ring-2 ring-primary" : ""}`}>
          <div className="space-y-3">
            <Label>Map Phase</Label>
            <Progress value={progress.map} />
            <p className="text-xs text-muted-foreground">
              Processing {mappedData.length} key-value pairs
            </p>
          </div>
        </Card>

        <Card className={`p-4 ${phase === 'shuffle' ? "ring-2 ring-primary" : ""}`}>
          <div className="space-y-3">
            <Label>Shuffle & Sort</Label>
            <Progress value={progress.shuffle} />
            <p className="text-xs text-muted-foreground">
              Organizing data by keys
            </p>
          </div>
        </Card>

        <Card className={`p-4 ${phase === 'reduce' ? "ring-2 ring-primary" : ""}`}>
          <div className="space-y-3">
            <Label>Reduce Phase</Label>
            <Progress value={progress.reduce} />
            <p className="text-xs text-muted-foreground">
              Combining {reducedData.length} final results
            </p>
          </div>
        </Card>
      </div>

      <div className="border rounded-lg p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={phase === 'complete' ? reducedData : mappedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill={phase === 'complete' ? "#8884d8" : "#82ca9d"}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Map Output</h4>
          <div className="h-[200px] overflow-auto">
            <pre className="text-xs">
              {JSON.stringify(mappedData.slice(0, 50), null, 2)}
            </pre>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-2">Reduce Output</h4>
          <div className="h-[200px] overflow-auto">
            <pre className="text-xs">
              {JSON.stringify(reducedData, null, 2)}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};
