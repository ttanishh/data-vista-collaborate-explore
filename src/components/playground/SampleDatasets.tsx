
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Dataset {
  name: string;
  description: string;
  size: string;
  format: string;
  data: any;
}

interface SampleDatasetsProps {
  datasets: Dataset[];
  onDownload: (index: number) => void;
}

export const SampleDatasets = ({ datasets, onDownload }: SampleDatasetsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {datasets.map((dataset, index) => (
        <div key={index} className="border rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-medium">{dataset.name}</h3>
            <p className="text-sm text-muted-foreground">{dataset.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-muted-foreground">
              {dataset.size} • {dataset.format}
            </div>
            <Button 
              className="text-primary hover:text-primary/80 text-sm font-medium"
              variant="outline"
              size="sm"
              onClick={() => onDownload(index)}
            >
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
