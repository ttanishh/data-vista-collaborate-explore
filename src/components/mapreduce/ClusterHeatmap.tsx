
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface Node {
  id: string;
  status: 'active' | 'idle' | 'slow' | 'failed';
  load: number;
  tasks: number;
}

interface ClusterHeatmapProps {
  nodeCount: number;
  phase: 'map' | 'shuffle' | 'reduce' | 'complete';
}

export const ClusterHeatmap = ({ nodeCount, phase }: ClusterHeatmapProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    // Simulate node status updates
    const updateNodes = () => {
      const newNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => {
        const statuses: ('active' | 'idle' | 'slow' | 'failed')[] = ['active', 'idle', 'slow', 'failed'];
        const randomStatus = phase === 'complete' ? 'idle' : 
          phase === 'map' ? (Math.random() > 0.7 ? 'active' : statuses[Math.floor(Math.random() * 4)]) :
          statuses[Math.floor(Math.random() * 4)];
        
        return {
          id: `node-${i + 1}`,
          status: randomStatus,
          load: Math.random() * 100,
          tasks: Math.floor(Math.random() * 10)
        };
      });
      setNodes(newNodes);
    };

    updateNodes();
    const interval = setInterval(updateNodes, 2000);
    return () => clearInterval(interval);
  }, [nodeCount, phase]);

  const getStatusColor = (status: string, load: number) => {
    switch (status) {
      case 'active':
        return `bg-green-${Math.min(Math.floor(load / 10) + 3, 9)}00`;
      case 'idle':
        return 'bg-gray-200';
      case 'slow':
        return 'bg-yellow-400';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Cluster Node Status</h3>
      <div className="grid grid-cols-5 gap-2">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 rounded-lg ${getStatusColor(node.status, node.load)} transition-colors duration-500`}
          >
            <div className="text-xs font-medium text-white">
              {node.id}
            </div>
            <div className="text-xs text-white/90">
              {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
            </div>
            <div className="text-xs text-white/80">
              Load: {Math.round(node.load)}%
            </div>
            <div className="text-xs text-white/80">
              Tasks: {node.tasks}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span>Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-200"></div>
          <span>Idle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-400"></div>
          <span>Slow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span>Failed</span>
        </div>
      </div>
    </Card>
  );
};
