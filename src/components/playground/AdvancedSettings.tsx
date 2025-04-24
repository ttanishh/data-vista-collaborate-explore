
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedSettingsProps {
  preprocessData: boolean;
  setPreprocessData: (value: boolean) => void;
  selectedVisualization: string;
  setSelectedVisualization: (value: string) => void;
}

export const AdvancedSettings = ({ 
  preprocessData, 
  setPreprocessData,
  selectedVisualization,
  setSelectedVisualization
}: AdvancedSettingsProps) => {
  const visualizationTypes = [
    { id: 'auto', name: 'Automatic (Based on Data)' },
    { id: 'line', name: 'Line Chart' },
    { id: 'bar', name: 'Bar Chart' },
    { id: 'pie', name: 'Pie Chart' },
    { id: 'scatter', name: 'Scatter Plot' },
    { id: 'area', name: 'Area Chart' },
    { id: 'heatmap', name: 'Heat Map' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-start space-x-2">
        <Switch 
          id="preprocess-data" 
          checked={preprocessData} 
          onCheckedChange={setPreprocessData} 
        />
        <div className="grid gap-1.5">
          <Label htmlFor="preprocess-data" className="cursor-pointer">
            Preprocess data
          </Label>
          <p className="text-xs text-muted-foreground">
            Clean and normalize data before processing
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="visualization-type">Visualization Type</Label>
        <Select
          value={selectedVisualization}
          onValueChange={setSelectedVisualization}
        >
          <SelectTrigger id="visualization-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {visualizationTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
