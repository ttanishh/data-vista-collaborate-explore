
import React from 'react';
import { Card } from "@/components/ui/card";

export const UsageGuide = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usage Guide</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Getting Started</h3>
          <p className="text-muted-foreground">
            The Data Science Playground allows you to apply various data science operations 
            to your data and visualize the results interactively.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Step 1: Select a Module</h3>
          <p className="text-muted-foreground">
            Choose one of our six specialized data science modules, each offering different
            operations and visualization techniques.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Step 2: Select an Operation</h3>
          <p className="text-muted-foreground">
            Each module offers several operations that can be applied to your data.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Step 3: Upload Your Data</h3>
          <p className="text-muted-foreground">
            Upload JSON or CSV files to analyze. The playground supports files up to 10MB.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Step 4: Process and Visualize</h3>
          <p className="text-muted-foreground">
            Click "Process Data" to apply the selected operation to your data. The results
            will be displayed in the visualization panel.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Advanced Settings</h3>
          <p className="text-muted-foreground">
            Use the advanced settings to customize preprocessing options and visualization types.
          </p>
        </div>
      </div>
    </Card>
  );
};
