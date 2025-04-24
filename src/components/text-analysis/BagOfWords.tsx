
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface BagOfWordsProps {
  text: string;
}

export const BagOfWords = ({ text }: BagOfWordsProps) => {
  const analyzeBagOfWords = () => {
    const words = text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3);

    const uniqueWords = Array.from(new Set(words));
    const bagOfWords = uniqueWords.map(word => ({
      word,
      count: words.filter(w => w === word).length,
      frequency: (words.filter(w => w === word).length / words.length * 100).toFixed(2)
    }));

    return bagOfWords.sort((a, b) => b.count - a.count);
  };

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Bag of Words Analysis</h3>
      <div className="overflow-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Frequency (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyzeBagOfWords().map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.word}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.frequency}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
