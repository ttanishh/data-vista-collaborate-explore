
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingProgressProps {
  processingProgress: number;
}

export const ProcessingProgress = ({ processingProgress }: ProcessingProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span>Processing...</span>
        <span>{processingProgress}%</span>
      </div>
      <Progress value={processingProgress} />
    </div>
  );
};
