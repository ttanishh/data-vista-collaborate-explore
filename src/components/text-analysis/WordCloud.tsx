
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

interface WordCloudProps {
  text: string;
  width?: number;
  height?: number;
}

export const WordCloud = ({ text, width = 600, height = 400 }: WordCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Process text
    const words = text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .reduce((acc: Record<string, number>, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    // Convert to array and sort by frequency
    const wordArray = Object.entries(words)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 50);

    // Find max frequency for scaling
    const maxFreq = Math.max(...wordArray.map(([, freq]) => freq));

    // Draw words
    let y = 40;
    let x = 20;
    
    wordArray.forEach(([word, freq]) => {
      const fontSize = Math.max(12, Math.floor((freq / maxFreq) * 48));
      ctx.font = `${fontSize}px Arial`;
      const metrics = ctx.measureText(word);
      
      if (x + metrics.width > width - 20) {
        x = 20;
        y += fontSize + 10;
      }

      if (y < height - 20) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
        ctx.fillText(word, x, y);
        x += metrics.width + 20;
      }
    });

  }, [text, width, height]);

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Word Cloud</h3>
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full"
      />
    </Card>
  );
};
