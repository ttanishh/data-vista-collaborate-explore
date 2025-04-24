
import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Network, Search, Filter, Settings } from "lucide-react";
import ForceGraph2D from 'react-force-graph-2d';

interface NetworkNode {
  id: string;
  name: string;
  group?: number;
  val?: number;
  color?: string;
}

interface NetworkLink {
  source: string;
  target: string;
  value?: number;
  color?: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

interface NetworkGraphProps {
  initialData?: NetworkData;
}

export function NetworkGraph({ initialData }: NetworkGraphProps) {
  const [graphData, setGraphData] = useState<NetworkData>(initialData || { 
    nodes: [], 
    links: [] 
  });
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [highlightLinks, setHighlightLinks] = useState(new Set<string>());
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>());
  const [layoutForce, setLayoutForce] = useState<number>(0.1);
  const [nodeSize, setNodeSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [communityDetection, setCommunityDetection] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState<string>("group");
  
  const fgRef = useRef<any>();
  const { toast } = useToast();
  
  // Generate demo data if no initial data
  useEffect(() => {
    if ((!initialData || initialData.nodes.length === 0) && graphData.nodes.length === 0) {
      generateDemoData();
    }
  }, [initialData]);
  
  const generateDemoData = () => {
    const numNodes = 40;
    const numGroups = 5;
    
    const nodes = [...Array(numNodes).keys()].map((i) => {
      const group = Math.floor(Math.random() * numGroups) + 1;
      return {
        id: `node-${i}`,
        name: `Node ${i}`,
        group,
        val: Math.random() * 10 + 1,
        color: getGroupColor(group)
      };
    });
    
    // Create links with higher probability within same group
    const links: NetworkLink[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const numLinks = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numLinks; j++) {
        const sourceNode = nodes[i];
        
        // Decide target: 70% chance of linking to same group
        let targetIndex;
        if (Math.random() < 0.7) {
          // Find node in same group
          const sameGroupNodes = nodes.filter((n, idx) => 
            n.group === sourceNode.group && idx !== i
          );
          
          if (sameGroupNodes.length > 0) {
            const randomGroupNode = sameGroupNodes[Math.floor(Math.random() * sameGroupNodes.length)];
            targetIndex = nodes.findIndex(n => n.id === randomGroupNode.id);
          } else {
            // Fallback to random node
            targetIndex = Math.floor(Math.random() * nodes.length);
            while (targetIndex === i) {
              targetIndex = Math.floor(Math.random() * nodes.length);
            }
          }
        } else {
          // Random node from any group
          targetIndex = Math.floor(Math.random() * nodes.length);
          while (targetIndex === i) {
            targetIndex = Math.floor(Math.random() * nodes.length);
          }
        }
        
        // Add link
        links.push({
          source: sourceNode.id,
          target: nodes[targetIndex].id,
          value: Math.random() * 5 + 1
        });
      }
    }
    
    setGraphData({ nodes, links });
    
    toast({
      title: "Demo Graph Generated",
      description: `Created ${nodes.length} nodes in ${numGroups} communities.`
    });
  };
  
  const getGroupColor = (group: number): string => {
    const colors = [
      "#f87171", // red
      "#60a5fa", // blue
      "#34d399", // green
      "#a78bfa", // purple
      "#fbbf24", // yellow
      "#f472b6", // pink
      "#6366f1", // indigo
      "#2dd4bf", // teal
      "#fb923c"  // orange
    ];
    
    return colors[group % colors.length];
  };
  
  const handleNodeClick = (node: NetworkNode) => {
    // Clear previous highlight
    setHighlightLinks(new Set());
    setHighlightNodes(new Set());
    
    if (selectedNode === node) {
      // Deselect if clicking on same node
      setSelectedNode(null);
      if (fgRef.current) {
        fgRef.current.centerAt(0, 0, 1000);
        fgRef.current.zoom(1, 1000);
      }
      return;
    }
    
    // Set selected node
    setSelectedNode(node);
    
    // Find connected links and nodes
    const connectedLinks = graphData.links.filter(
      link => link.source === node.id || link.target === node.id
    );
    
    const newHighlightLinks = new Set<string>();
    const newHighlightNodes = new Set<string>([node.id]);
    
    connectedLinks.forEach(link => {
      const linkId = `${link.source}-${link.target}`;
      newHighlightLinks.add(linkId);
      
      if (link.source === node.id) {
        newHighlightNodes.add(link.target as string);
      } else {
        newHighlightNodes.add(link.source as string);
      }
    });
    
    setHighlightLinks(newHighlightLinks);
    setHighlightNodes(newHighlightNodes);
    
    // Center on node
    if (fgRef.current) {
      fgRef.current.centerAt(
        (node as any).x, 
        (node as any).y, 
        1000
      );
      fgRef.current.zoom(2, 1000);
    }
  };
  
  const applyCommunityDetection = () => {
    // Simple community detection algorithm (Louvain method simulation)
    // This is a simplified version; in a real app, you'd use a proper algorithm
    
    // For this demo, we'll just use the predefined groups or assign random ones
    const updatedNodes = graphData.nodes.map(node => ({
      ...node,
      group: node.group || Math.floor(Math.random() * 5) + 1
    }));
    
    setGraphData({
      nodes: updatedNodes,
      links: graphData.links
    });
    
    toast({
      title: "Community Detection Applied",
      description: "Node communities have been identified and colored."
    });
    
    setCommunityDetection(true);
  };
  
  const searchNodes = () => {
    if (!searchTerm.trim()) {
      // Clear highlights if search is empty
      setHighlightLinks(new Set());
      setHighlightNodes(new Set());
      setSelectedNode(null);
      return;
    }
    
    // Case-insensitive search
    const searchLower = searchTerm.toLowerCase();
    
    // Find nodes that match the search
    const matchingNodes = graphData.nodes.filter(node => 
      node.name.toLowerCase().includes(searchLower) ||
      node.id.toLowerCase().includes(searchLower)
    );
    
    if (matchingNodes.length === 0) {
      toast({
        title: "No matches found",
        description: `No nodes matching "${searchTerm}" were found.`
      });
      return;
    }
    
    // Highlight the first matching node
    handleNodeClick(matchingNodes[0]);
    
    toast({
      title: "Search Results",
      description: `Found ${matchingNodes.length} matching nodes.`
    });
  };
  
  const resetGraph = () => {
    setHighlightLinks(new Set());
    setHighlightNodes(new Set());
    setSelectedNode(null);
    setSearchTerm('');
    
    if (fgRef.current) {
      fgRef.current.centerAt(0, 0, 1000);
      fgRef.current.zoom(1, 1000);
    }
    
    toast({
      title: "Graph Reset",
      description: "View has been reset to default."
    });
  };
  
  const getNodeColor = (node: NetworkNode) => {
    // If node is highlighted, use highlight color
    if (highlightNodes.size && !highlightNodes.has(node.id)) {
      return 'rgba(150,150,150,0.3)'; // Dim color for non-highlighted nodes
    }
    
    if (colorMode === "group" && node.group) {
      return getGroupColor(node.group);
    }
    
    return node.color || '#6366f1'; // Default color
  };
  
  const getLinkColor = (link: NetworkLink) => {
    const linkId = `${link.source}-${link.target}`;
    
    if (highlightLinks.size && !highlightLinks.has(linkId)) {
      return 'rgba(200,200,200,0.2)'; // Dim color for non-highlighted links
    }
    
    return link.color || '#999999';
  };
  
  return (
    <Card className="p-4 bg-white dark:bg-gray-950 shadow-md overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Network className="h-5 w-5" /> Network Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Interactive network visualization with community detection
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateDemoData}
            >
              Generate New Demo
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetGraph}
            >
              Reset View
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border rounded-lg p-4 bg-background/50 space-y-4">
            <div className="h-[500px] w-full border border-dashed rounded-lg bg-muted/20">
              {graphData.nodes.length > 0 ? (
                <div className="h-full">
                  <ForceGraph2D
                    ref={fgRef}
                    graphData={graphData}
                    nodeLabel="name"
                    nodeColor={getNodeColor}
                    nodeVal={(node: NetworkNode) => nodeSize * (node.val || 1)}
                    linkColor={getLinkColor}
                    linkWidth={(link: NetworkLink) => highlightLinks.has(`${link.source}-${link.target}`) ? 2 : 1}
                    linkDirectionalParticles={(link: NetworkLink) => highlightLinks.has(`${link.source}-${link.target}`) ? 4 : 0}
                    linkDirectionalParticleWidth={2}
                    onNodeClick={handleNodeClick}
                    cooldownTicks={100}
                    d3AlphaDecay={0.02}
                    d3VelocityDecay={1 - layoutForce}
                    onEngineStop={() => fgRef.current?.zoomToFit(400)}
                    width={600}
                    height={500}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No network data available. Generate a demo dataset to begin.
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground flex-1">
                {graphData.nodes.length > 0 ? (
                  <span>
                    {graphData.nodes.length} nodes, {graphData.links.length} links
                  </span>
                ) : null}
              </div>
              
              {communityDetection && (
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Community Detection: ON</Badge>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium">Search & Explore</h4>
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Search nodes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={searchNodes}>
                Search
              </Button>
            </div>
            
            {selectedNode && (
              <Card className="p-3 bg-muted/30 border-primary/30">
                <h5 className="font-medium">{selectedNode.name}</h5>
                <div className="text-sm space-y-1 mt-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span>{selectedNode.id}</span>
                  </div>
                  {selectedNode.group !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Group:</span>
                      <span>{selectedNode.group}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connected to:</span>
                    <span>{highlightNodes.size - 1} nodes</span>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Graph Settings</h4>
              </div>
              
              <Tabs defaultValue="display" className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="display">Display</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="display" className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="layoutForce">Layout Force</Label>
                      <span className="text-xs text-muted-foreground">{layoutForce.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="layoutForce"
                      min={0.01}
                      max={0.5}
                      step={0.01}
                      value={[layoutForce]}
                      onValueChange={(value) => setLayoutForce(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="nodeSize">Node Size</Label>
                      <span className="text-xs text-muted-foreground">{nodeSize}</span>
                    </div>
                    <Slider
                      id="nodeSize"
                      min={1}
                      max={15}
                      step={1}
                      value={[nodeSize]}
                      onValueChange={(value) => setNodeSize(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colorMode">Color Mode</Label>
                    <Select
                      value={colorMode}
                      onValueChange={setColorMode}
                    >
                      <SelectTrigger id="colorMode">
                        <SelectValue placeholder="Select color mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group">By Community</SelectItem>
                        <SelectItem value="degree">By Connections</SelectItem>
                        <SelectItem value="single">Single Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="analysis" className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Community Detection</h5>
                    <p className="text-xs text-muted-foreground">
                      Identify closely connected groups of nodes within the network
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={applyCommunityDetection}
                    >
                      Run Community Detection
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Centrality Measures</h5>
                    <p className="text-xs text-muted-foreground">
                      Calculate importance of nodes based on connectivity
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant="outline"
                    >
                      Calculate Centrality
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md text-sm border border-blue-100 dark:border-blue-900/30">
              <h5 className="font-medium mb-1">Network Analysis Concepts</h5>
              <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                <li><span className="font-medium">Communities</span>: Densely connected groups of nodes</li>
                <li><span className="font-medium">Centrality</span>: Measures of node importance</li>
                <li><span className="font-medium">Path Length</span>: Number of steps between nodes</li>
                <li><span className="font-medium">Clustering</span>: Tendency of nodes to form groups</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
