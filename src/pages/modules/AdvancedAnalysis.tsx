
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function AdvancedAnalysis() {
  const [networkType, setNetworkType] = useState("social");
  const [algorithmType, setAlgorithmType] = useState("community");
  const [nodeCount, setNodeCount] = useState(25);
  const [edgeDensity, setEdgeDensity] = useState(0.2);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  
  const { toast } = useToast();
  
  const handleGenerateNetwork = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    
    toast({
      title: "Generating Network",
      description: "Creating network with specified parameters...",
    });
    
    // Simulate network generation
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      
      toast({
        title: "Network Generated",
        description: `Network with ${nodeCount} nodes and ${Math.floor(nodeCount * nodeCount * edgeDensity)} edges created.`,
      });
    }, 1500);
  };
  
  const handleRunAlgorithm = () => {
    if (!analyzed) {
      toast({
        title: "No Network Available",
        description: "Please generate a network first.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalyzing(true);
    
    toast({
      title: `Running ${getAlgorithmName()}`,
      description: "Analyzing network structure...",
    });
    
    // Simulate algorithm execution
    setTimeout(() => {
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `${getAlgorithmName()} completed successfully.`,
      });
    }, 2000);
  };
  
  const getAlgorithmName = () => {
    switch (algorithmType) {
      case "community":
        return "Community Detection";
      case "centrality":
        return "Centrality Analysis";
      case "pathfinding":
        return "Path Finding";
      case "recommendation":
        return "Recommendation Engine";
      default:
        return "Algorithm";
    }
  };
  
  const getNetworkDescription = () => {
    switch (networkType) {
      case "social":
        return "Social network with users as nodes and connections as edges";
      case "citation":
        return "Citation network with papers as nodes and citations as edges";
      case "web":
        return "Web graph with pages as nodes and links as edges";
      case "biological":
        return "Biological network with proteins as nodes and interactions as edges";
      default:
        return "";
    }
  };
  
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 6
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Advanced Data Analysis
              </h1>
              <p className="text-xl text-muted-foreground">
                Network analysis & recommendation system with interactive graph visualization
              </p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Network Configuration</h2>
                  <p className="text-muted-foreground">
                    Configure network parameters and analysis algorithms
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Network Type</Label>
                      <Select value={networkType} onValueChange={setNetworkType} disabled={analyzing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select network type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Network</SelectItem>
                          <SelectItem value="citation">Citation Network</SelectItem>
                          <SelectItem value="web">Web Graph</SelectItem>
                          <SelectItem value="biological">Biological Network</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {getNetworkDescription()}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Node Count</Label>
                        <span className="text-sm text-muted-foreground">{nodeCount} nodes</span>
                      </div>
                      <Slider 
                        min={10} 
                        max={100} 
                        step={5} 
                        value={[nodeCount]} 
                        onValueChange={(value) => setNodeCount(value[0])}
                        disabled={analyzing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Edge Density</Label>
                        <span className="text-sm text-muted-foreground">{edgeDensity.toFixed(2)}</span>
                      </div>
                      <Slider 
                        min={0.05} 
                        max={0.5} 
                        step={0.05} 
                        value={[edgeDensity]} 
                        onValueChange={(value) => setEdgeDensity(value[0])}
                        disabled={analyzing}
                      />
                      <p className="text-xs text-muted-foreground">
                        Approximately {Math.floor(nodeCount * nodeCount * edgeDensity)} edges
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Algorithm Type</Label>
                      <Select value={algorithmType} onValueChange={setAlgorithmType} disabled={analyzing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select algorithm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="community">Community Detection</SelectItem>
                          <SelectItem value="centrality">Centrality Analysis</SelectItem>
                          <SelectItem value="pathfinding">Path Finding</SelectItem>
                          <SelectItem value="recommendation">Recommendation Engine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Algorithm Parameters</Label>
                      
                      {algorithmType === "community" && (
                        <Select defaultValue="louvain" disabled={analyzing}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select community algorithm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="louvain">Louvain Method</SelectItem>
                            <SelectItem value="girvan-newman">Girvan-Newman</SelectItem>
                            <SelectItem value="label-propagation">Label Propagation</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      
                      {algorithmType === "centrality" && (
                        <Select defaultValue="degree" disabled={analyzing}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select centrality metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="degree">Degree Centrality</SelectItem>
                            <SelectItem value="betweenness">Betweenness Centrality</SelectItem>
                            <SelectItem value="closeness">Closeness Centrality</SelectItem>
                            <SelectItem value="eigenvector">Eigenvector Centrality</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      
                      {algorithmType === "pathfinding" && (
                        <div className="space-y-4">
                          <Select defaultValue="dijkstra" disabled={analyzing}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pathfinding algorithm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                              <SelectItem value="a-star">A* Search</SelectItem>
                              <SelectItem value="bellman-ford">Bellman-Ford</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Source Node</Label>
                              <Select defaultValue="auto" disabled={analyzing}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="auto">Auto-select</SelectItem>
                                  <SelectItem value="1">Node 1</SelectItem>
                                  <SelectItem value="2">Node 2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Target Node</Label>
                              <Select defaultValue="auto" disabled={analyzing}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select target" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="auto">Auto-select</SelectItem>
                                  <SelectItem value="1">Node 1</SelectItem>
                                  <SelectItem value="2">Node 2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "recommendation" && (
                        <div className="space-y-4">
                          <Select defaultValue="collaborative" disabled={analyzing}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select recommendation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="collaborative">Collaborative Filtering</SelectItem>
                              <SelectItem value="content">Content-Based</SelectItem>
                              <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="space-y-2">
                            <Label>Target Node</Label>
                            <Select defaultValue="auto" disabled={analyzing}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select node for recommendations" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto-select</SelectItem>
                                <SelectItem value="1">Node 1</SelectItem>
                                <SelectItem value="2">Node 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button onClick={handleGenerateNetwork} disabled={analyzing}>
                        Generate Network
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleRunAlgorithm} 
                        disabled={analyzing || !analyzed}
                      >
                        Run {getAlgorithmName()}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Network Visualization</h2>
                  <p className="text-muted-foreground">
                    Interactive graph visualization with analysis results
                  </p>
                </div>
                
                <div className="border rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                  {analyzing ? (
                    <div className="text-center">
                      <svg
                        className="animate-spin h-8 w-8 text-primary mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-lg font-medium">{
                        analyzed ? 
                          `Running ${getAlgorithmName()}...` : 
                          "Generating Network..."
                      }</p>
                    </div>
                  ) : analyzed ? (
                    <div className="text-center w-full">
                      <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
                        <p className="text-muted-foreground">Network visualization will appear here</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground mx-auto mb-4"
                      >
                        <path d="M17 6H7c-4 0-4 3-4 3v10c0 .6.4 1 1 1h2V10h14v10h2c.6 0 1-.4 1-1V9c0-3-3-3-6-3Z"></path>
                        <path d="M10 10v10"></path>
                        <path d="M14 10v10"></path>
                      </svg>
                      <p className="text-lg font-medium">No Network Generated</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Configure network parameters and click "Generate Network" to start
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            {analyzed && (
              <Tabs defaultValue="results" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="results">Analysis Results</TabsTrigger>
                  <TabsTrigger value="metrics">Network Metrics</TabsTrigger>
                  <TabsTrigger value="details">Algorithm Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">{getAlgorithmName()} Results</h3>
                      
                      {algorithmType === "community" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Detected Communities</h4>
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">5</div>
                                  <div className="text-sm text-muted-foreground">Communities</div>
                                </div>
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">0.68</div>
                                  <div className="text-sm text-muted-foreground">Modularity Score</div>
                                </div>
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">5.2</div>
                                  <div className="text-sm text-muted-foreground">Avg. Size</div>
                                </div>
                              </div>
                              
                              <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="py-2 px-4 text-left font-medium">Community</th>
                                      <th className="py-2 px-4 text-left font-medium">Size</th>
                                      <th className="py-2 px-4 text-left font-medium">Density</th>
                                      <th className="py-2 px-4 text-left font-medium">Central Node</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <tr key={i} className="border-b">
                                        <td className="py-2 px-4">Community {i}</td>
                                        <td className="py-2 px-4">{Math.floor(Math.random() * 10) + 3}</td>
                                        <td className="py-2 px-4">{(Math.random() * 0.5 + 0.3).toFixed(2)}</td>
                                        <td className="py-2 px-4">Node {Math.floor(Math.random() * nodeCount) + 1}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "centrality" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Centrality Metrics</h4>
                            <div className="space-y-3">
                              <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="py-2 px-4 text-left font-medium">Rank</th>
                                      <th className="py-2 px-4 text-left font-medium">Node</th>
                                      <th className="py-2 px-4 text-left font-medium">Centrality Score</th>
                                      <th className="py-2 px-4 text-left font-medium">Normalized Score</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <tr key={i} className="border-b">
                                        <td className="py-2 px-4">{i}</td>
                                        <td className="py-2 px-4">Node {Math.floor(Math.random() * nodeCount) + 1}</td>
                                        <td className="py-2 px-4">{(Math.random() * 100).toFixed(2)}</td>
                                        <td className="py-2 px-4">{(Math.random()).toFixed(3)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              
                              <div className="p-3 bg-secondary/10 rounded-lg">
                                <h5 className="font-medium mb-2">Distribution Analysis</h5>
                                <p className="text-sm text-muted-foreground">
                                  The centrality distribution follows a power-law distribution, which is typical for scale-free networks. 
                                  The top 20% of nodes account for 80% of the network's centrality, indicating a hub-and-spoke structure.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "pathfinding" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Path Finding Results</h4>
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">Node 3</div>
                                  <div className="text-sm text-muted-foreground">Source</div>
                                </div>
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">Node 18</div>
                                  <div className="text-sm text-muted-foreground">Target</div>
                                </div>
                                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                                  <div className="font-medium text-2xl">4</div>
                                  <div className="text-sm text-muted-foreground">Path Length</div>
                                </div>
                              </div>
                              
                              <div className="p-3 border rounded-lg">
                                <h5 className="font-medium mb-2">Shortest Path</h5>
                                <div className="flex items-center justify-center flex-wrap gap-2">
                                  <div className="px-3 py-1 bg-primary/20 rounded-full">Node 3</div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                  </svg>
                                  <div className="px-3 py-1 bg-secondary/20 rounded-full">Node 7</div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                  </svg>
                                  <div className="px-3 py-1 bg-secondary/20 rounded-full">Node 12</div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                  </svg>
                                  <div className="px-3 py-1 bg-secondary/20 rounded-full">Node 15</div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                  </svg>
                                  <div className="px-3 py-1 bg-primary/20 rounded-full">Node 18</div>
                                </div>
                              </div>
                              
                              <div className="p-3 bg-secondary/10 rounded-lg">
                                <h5 className="font-medium mb-2">Path Analysis</h5>
                                <p className="text-sm text-muted-foreground">
                                  The shortest path has a total weight of 3.72 and passes through 3 intermediate nodes. 
                                  This path is 18% shorter than the average path length in the network.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "recommendation" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Recommendations for Node 5</h4>
                            <div className="space-y-3">
                              <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="py-2 px-4 text-left font-medium">Rank</th>
                                      <th className="py-2 px-4 text-left font-medium">Recommended Node</th>
                                      <th className="py-2 px-4 text-left font-medium">Score</th>
                                      <th className="py-2 px-4 text-left font-medium">Reason</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => {
                                      const node = Math.floor(Math.random() * nodeCount) + 1;
                                      const reasons = [
                                        "Common neighbors (4)",
                                        "Similar attributes (0.87)",
                                        "Same community",
                                        "Similar connection pattern",
                                        "2nd degree connection"
                                      ];
                                      return (
                                        <tr key={i} className="border-b">
                                          <td className="py-2 px-4">{i}</td>
                                          <td className="py-2 px-4">Node {node}</td>
                                          <td className="py-2 px-4">{(Math.random() * 0.5 + 0.5).toFixed(3)}</td>
                                          <td className="py-2 px-4">{reasons[Math.floor(Math.random() * reasons.length)]}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                              
                              <div className="p-3 bg-secondary/10 rounded-lg">
                                <h5 className="font-medium mb-2">Recommendation Analysis</h5>
                                <p className="text-sm text-muted-foreground">
                                  Recommendations are based on a combination of structural similarity, shared attributes, and connection patterns. 
                                  The top recommendations have an average similarity score of 0.73 with the target node.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Network Metrics</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 border rounde-lg">
                            <h4 className="font-medium mb-3">Global Metrics</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Average Degree</span>
                                <span className="text-sm font-medium">{(nodeCount * edgeDensity).toFixed(1)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Average Path Length</span>
                                <span className="text-sm font-medium">{(Math.log(nodeCount) / Math.log(nodeCount * edgeDensity)).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Diameter</span>
                                <span className="text-sm font-medium">{Math.ceil(Math.log(nodeCount) / Math.log(nodeCount * edgeDensity) * 2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Density</span>
                                <span className="text-sm font-medium">{edgeDensity.toFixed(3)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Clustering Coefficient</span>
                                <span className="text-sm font-medium">{(edgeDensity * 1.5).toFixed(3)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Network Type Analysis</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm">Scale-Free Properties: <span className="font-medium">High</span></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">Small-World Properties: <span className="font-medium">Medium</span></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-sm">Random Graph Properties: <span className="font-medium">Low</span></span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                This network exhibits characteristics typical of a scale-free network, with a few highly connected hubs and many nodes with few connections.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Node Distribution</h4>
                            <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                              <p className="text-muted-foreground">Degree distribution chart</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              The degree distribution follows a power law, with most nodes having few connections and a small number of nodes having many connections.
                            </p>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Top Nodes by Degree</h4>
                            <div className="space-y-3">
                              {[1, 2, 3, 4, 5].map((i) => {
                                const node = Math.floor(Math.random() * nodeCount) + 1;
                                const degree = Math.floor(Math.random() * 15) + 5;
                                return (
                                  <div key={i} className="flex justify-between items-center">
                                    <span className="text-sm">Node {node}</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-24 bg-secondary h-2 rounded-full overflow-hidden">
                                        <div 
                                          className="bg-primary h-full rounded-full"
                                          style={{ width: `${Math.min(100, degree * 5)}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs">{degree}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Algorithm Details</h3>
                      
                      {algorithmType === "community" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Louvain Method</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              The Louvain method is a hierarchical clustering algorithm that optimizes modularity in networks. It works in two phases:
                            </p>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                              <li>Local optimization: Assign each node to the community that maximizes modularity gain.</li>
                              <li>Network aggregation: Create a new network where nodes are the communities found in step 1.</li>
                              <li>Repeat steps 1-2 until no further improvement in modularity is possible.</li>
                            </ol>
                            <div className="mt-4">
                              <h5 className="text-sm font-medium mb-2">Time Complexity</h5>
                              <div className="p-2 bg-secondary/10 rounded-lg">
                                <code className="text-xs">O(n log n)</code> where n is the number of nodes in the network
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "centrality" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Betweenness Centrality</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Betweenness centrality quantifies the number of times a node acts as a bridge along the shortest path between two other nodes. Nodes with high betweenness have more control over information flow in the network.
                            </p>
                            <div className="p-3 bg-secondary/10 rounded-lg">
                              <h5 className="text-sm font-medium mb-2">Formula</h5>
                              <div className="text-center mb-2">
                                <code className="text-xs">
                                  C<sub>B</sub>(v) = ∑<sub>s≠v≠t</sub> σ<sub>st</sub>(v) / σ<sub>st</sub>
                                </code>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Where σ<sub>st</sub> is the number of shortest paths from node s to node t, and σ<sub>st</sub>(v) is the number of those paths that pass through v.
                              </p>
                            </div>
                            <div className="mt-4">
                              <h5 className="text-sm font-medium mb-2">Time Complexity</h5>
                              <div className="p-2 bg-secondary/10 rounded-lg">
                                <code className="text-xs">O(n*e)</code> where n is the number of nodes and e is the number of edges
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "pathfinding" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Dijkstra's Algorithm</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Dijkstra's algorithm finds the shortest paths between nodes in a graph. It works by iteratively selecting the unvisited node with the smallest tentative distance, calculating the distance through it to each unvisited neighbor, and updating the neighbor's distance if smaller.
                            </p>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                              <li>Mark all nodes unvisited and set initial distance to infinity (except source).</li>
                              <li>Set the source node as current, mark it as visited.</li>
                              <li>For current node, consider all unvisited neighbors and calculate tentative distances.</li>
                              <li>When all neighbors are considered, mark current node as visited.</li>
                              <li>Select the unvisited node with smallest tentative distance as new current node.</li>
                              <li>Repeat from step 3 until the destination is marked visited.</li>
                            </ol>
                            <div className="mt-4">
                              <h5 className="text-sm font-medium mb-2">Time Complexity</h5>
                              <div className="p-2 bg-secondary/10 rounded-lg">
                                <code className="text-xs">O((n + e) log n)</code> with a priority queue implementation, where n is the number of nodes and e is the number of edges
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {algorithmType === "recommendation" && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-3">Collaborative Filtering</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Collaborative filtering generates recommendations based on the similarity between users or items. In network terms, it recommends nodes that are connected to similar nodes as the target.
                            </p>
                            <div className="space-y-3">
                              <div className="p-3 bg-secondary/10 rounded-lg">
                                <h5 className="text-sm font-medium mb-2">User-Based Approach</h5>
                                <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
                                  <li>Find nodes similar to the target node based on connection patterns.</li>
                                  <li>Identify connections these similar nodes have that the target doesn't.</li>
                                  <li>Recommend these connections to the target node.</li>
                                </ol>
                              </div>
                              <div className="p-3 bg-secondary/10 rounded-lg">
                                <h5 className="text-sm font-medium mb-2">Item-Based Approach</h5>
                                <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
                                  <li>Calculate similarity between all node pairs based on their connections.</li>
                                  <li>For each node connected to the target, find similar nodes.</li>
                                  <li>Aggregate these similar nodes to create recommendations.</li>
                                </ol>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h5 className="text-sm font-medium mb-2">Similarity Measures</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="p-2 bg-secondary/10 rounded-lg text-xs">
                                  <span className="font-medium">Jaccard:</span> J(A,B) = |A∩B| / |A∪B|
                                </div>
                                <div className="p-2 bg-secondary/10 rounded-lg text-xs">
                                  <span className="font-medium">Cosine:</span> cos(θ) = A·B / (||A||·||B||)
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
