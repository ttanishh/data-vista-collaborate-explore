
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database } from "lucide-react";

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
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-muted/50">
        <h3 className="font-medium flex items-center gap-2">
          <Database className="h-4 w-4" />
          Sample Datasets
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Try these pre-configured datasets or upload your own data in JSON/CSV format
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {datasets.map((dataset, index) => (
          <Card key={index} className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-medium">{dataset.name}</h3>
              <p className="text-sm text-muted-foreground">{dataset.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-muted-foreground">
                {dataset.size} • {dataset.format}
              </div>
              <Button 
                className="flex items-center gap-2"
                variant="outline"
                size="sm"
                onClick={() => onDownload(index)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
