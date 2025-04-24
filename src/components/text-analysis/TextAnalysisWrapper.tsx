
import React from 'react';
import { Card } from "@/components/ui/card";
import { FrequencyAnalysis } from './FrequencyAnalysis';
import { BagOfWords } from './BagOfWords';
import { WordCloud } from './WordCloud';

interface TextAnalysisWrapperProps {
  text: string;
}

export const TextAnalysisWrapper = ({ text }: TextAnalysisWrapperProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <FrequencyAnalysis text={text} />
      <BagOfWords text={text} />
      <Card className="md:col-span-2">
        <WordCloud text={text} width={800} height={400} />
      </Card>
    </div>
  );
};
