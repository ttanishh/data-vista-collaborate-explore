
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DataStreams() {
  const [streamActive, setStreamActive] = useState(false);
  const [streamSpeed, setStreamSpeed] = useState(1);
  const [streamType, setStreamType] = useState("social");
  const [algorithmType, setAlgorithmType] = useState("distinct-counting");
  const [windowSize, setWindowSize] = useState(20);
  const [dataPoints, setDataPoints] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<number[]>([]);

  // Generate random data for the stream
  useEffect(() => {
    if (!streamActive) return;
    
    const interval = setInterval(() => {
      // Generate a new data point based on the stream type
      let newValue = 0;
      
      switch (streamType) {
        case "social":
          // Simulate social media engagement (likes, shares, etc.)
          newValue = Math.floor(Math.random() * 100) + 10;
          break;
        case "iot":
          // Simulate IoT sensor data with some periodicity
          newValue = 50 + 30 * Math.sin(Date.now() / 10000) + Math.random() * 15;
          break;
        case "transactions":
          // Simulate transaction volumes with occasional spikes
          newValue = Math.floor(Math.random() * 30) + 5;
          if (Math.random() > 0.95) {
            // Occasional spike
            newValue += Math.floor(Math.random() * 100);
          }
          break;
      }
      
      // Add some randomness based on stream speed
      const timestamp = new Date().toLocaleTimeString();
      
      // Add the new data point
      setDataPoints(prev => {
        const newPoint = { timestamp, value: newValue };
        const newPoints = [...prev, newPoint].slice(-100); // Keep the last 100 points
        
        // Check for anomalies
        if (newPoints.length > windowSize) {
          const recentPoints = newPoints.slice(-windowSize-1, -1);
          const avg = recentPoints.reduce((sum, p) => sum + p.value, 0) / recentPoints.length;
          const stdDev = Math.sqrt(
            recentPoints.reduce((sum, p) => sum + Math.pow(p.value - avg, 2), 0) / recentPoints.length
          );
          
          // Mark as anomaly if it's more than 2 standard deviations from the mean
          if (Math.abs(newValue - avg) > stdDev * 2) {
            setAnomalies(prev => [...prev, newPoints.length - 1]);
          }
        }
        
        return newPoints;
      });
    }, 1000 / streamSpeed);
    
    return () => clearInterval(interval);
  }, [streamActive, streamSpeed, streamType, windowSize]);

  const handleStartStream = () => {
    setStreamActive(true);
  };

  const handleStopStream = () => {
    setStreamActive(false);
  };

  const handleClearData = () => {
    setDataPoints([]);
    setAnomalies([]);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 5
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Mining Data Streams
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time stream analytics dashboard with configurable data stream simulators
              </p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Stream Configuration</h2>
                  <p className="text-muted-foreground">
                    Configure your data stream source and parameters
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Stream Type</Label>
                      <Select value={streamType} onValueChange={setStreamType} disabled={streamActive}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media Activity</SelectItem>
                          <SelectItem value="iot">IoT Sensor Data</SelectItem>
                          <SelectItem value="transactions">Financial Transactions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Stream Velocity</Label>
                        <span className="text-sm text-muted-foreground">{streamSpeed}x</span>
                      </div>
                      <Slider 
                        min={0.5} 
                        max={5} 
                        step={0.5} 
                        value={[streamSpeed]} 
                        onValueChange={(value) => setStreamSpeed(value[0])}
                        disabled={streamActive}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Algorithm Type</Label>
                      <Select value={algorithmType} onValueChange={setAlgorithmType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select algorithm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="distinct-counting">Distinct Element Counting</SelectItem>
                          <SelectItem value="reservoir-sampling">Reservoir Sampling</SelectItem>
                          <SelectItem value="sliding-window">Sliding Window Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Window Size</Label>
                        <span className="text-sm text-muted-foreground">{windowSize} elements</span>
                      </div>
                      <Slider 
                        min={5} 
                        max={50} 
                        step={5} 
                        value={[windowSize]} 
                        onValueChange={(value) => setWindowSize(value[0])}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Switch id="anomaly-detection" checked={true} />
                      <Label htmlFor="anomaly-detection">Enable Anomaly Detection</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  {!streamActive ? (
                    <Button onClick={handleStartStream}>
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
                        className="mr-2"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Start Stream
                    </Button>
                  ) : (
                    <Button onClick={handleStopStream} variant="secondary">
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
                        className="mr-2"
                      >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                      Stop Stream
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleClearData}>
                    Clear Data
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Stream Visualization</h2>
                  <p className="text-muted-foreground">
                    Real-time data stream with automated analytics
                  </p>
                </div>
                
                <div className="h-80 border rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dataPoints}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 12 }} 
                        tickFormatter={(value) => {
                          // Only show some timestamps to avoid crowding
                          return value.split(':').slice(0, 2).join(':');
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                        dot={(props: any) => {
                          // Highlight anomalies with a different dot
                          const isAnomaly = anomalies.includes(props.index);
                          if (isAnomaly) {
                            return (
                              <svg x={props.cx - 6} y={props.cy - 6} width="12" height="12" fill="red">
                                <circle r={6} cx={6} cy={6} />
                              </svg>
                            );
                          }
                          return null; // default dot
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
            
            <Tabs defaultValue="algorithm" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="algorithm">Algorithm Details</TabsTrigger>
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                <TabsTrigger value="analytics">Stream Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="algorithm" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">
                      {algorithmType === "distinct-counting" ? "Distinct Element Counting" : 
                       algorithmType === "reservoir-sampling" ? "Reservoir Sampling" : 
                       "Sliding Window Analysis"}
                    </h3>
                    
                    {algorithmType === "distinct-counting" && (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Distinct element counting algorithms estimate the number of unique elements in a data stream without storing all elements. The Flajolet-Martin algorithm uses a probabilistic approach with hash functions to estimate cardinality.
                        </p>
                        
                        <div className="bg-secondary/10 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Flajolet-Martin Algorithm</h4>
                          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                            <li>Hash each element of the stream to a uniformly distributed value.</li>
                            <li>Count the maximum number of trailing zeros in the binary representation of any hash value.</li>
                            <li>The estimate of distinct elements is approximately 2^r where r is the maximum number of trailing zeros.</li>
                            <li>For better accuracy, multiple hash functions can be used and their results averaged.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                    
                    {algorithmType === "reservoir-sampling" && (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Reservoir sampling maintains a representative sample of k elements from a stream of unknown size. It ensures that each element in the stream has an equal probability of being included in the final sample.
                        </p>
                        
                        <div className="bg-secondary/10 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Algorithm Steps</h4>
                          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                            <li>Store the first k elements of the stream in the reservoir.</li>
                            <li>For each subsequent element at position i (where i > k):
                              <ol className="list-disc list-inside ml-6 mt-2 space-y-1">
                                <li>Generate a random number j between 1 and i.</li>
                                <li>If j ≤ k, replace the j-th element in the reservoir with the new element.</li>
                              </ol>
                            </li>
                            <li>After processing the entire stream, the reservoir contains a random sample of k elements.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                    
                    {algorithmType === "sliding-window" && (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Sliding window analysis focuses on the most recent n elements of the stream. This approach is particularly useful for detecting trends, patterns, or anomalies in time-sensitive data.
                        </p>
                        
                        <div className="bg-secondary/10 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Implementation Approaches</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                            <li><span className="font-medium">Fixed-Size Window:</span> Maintains exactly n elements at all times, removing the oldest element when a new one arrives.</li>
                            <li><span className="font-medium">Time-Based Window:</span> Keeps elements that arrived within the last t time units.</li>
                            <li><span className="font-medium">Landmark Window:</span> Considers all elements from a specific time point to the present.</li>
                            <li><span className="font-medium">Exponential Histogram:</span> Maintains buckets of exponentially increasing sizes to approximate sliding window statistics with reduced memory.</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">Applications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Use Cases</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Real-time fraud detection</li>
                            <li>Network traffic monitoring</li>
                            <li>Social media trend analysis</li>
                            <li>IoT sensor data processing</li>
                            <li>Financial market analysis</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Advantages</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Constant memory usage</li>
                            <li>Single-pass processing</li>
                            <li>Real-time results</li>
                            <li>Handles infinite streams</li>
                            <li>Adaptable to concept drift</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Performance Metrics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Time Complexity</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Processing Speed</span>
                              <span className="text-sm font-medium">{streamActive ? (streamSpeed * 10).toFixed(1) : 0} elements/sec</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Processing Latency</span>
                              <span className="text-sm font-medium">{streamActive ? (100 / streamSpeed).toFixed(1) : 0} ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Algorithm Complexity</span>
                              <span className="text-sm font-medium">
                                {algorithmType === "distinct-counting" ? "O(1) per element" : 
                                 algorithmType === "reservoir-sampling" ? "O(1) per element" : 
                                 "O(window size)"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Space Complexity</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Memory Usage</span>
                              <span className="text-sm font-medium">
                                {algorithmType === "distinct-counting" ? "O(log n)" : 
                                 algorithmType === "reservoir-sampling" ? `O(${windowSize})` : 
                                 `O(${windowSize})`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">State Size</span>
                              <span className="text-sm font-medium">{dataPoints.length} elements</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Accuracy Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Error Bound</span>
                              <span className="text-sm font-medium">
                                {algorithmType === "distinct-counting" ? "±5%" : 
                                 algorithmType === "reservoir-sampling" ? "Exact sample" : 
                                 "Exact within window"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Anomalies Detected</span>
                              <span className="text-sm font-medium">{anomalies.length}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Scaling Characteristics</h4>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              How the algorithm's performance scales with increased data volume and velocity:
                            </p>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-xs">Processing Time</span>
                                  <span className="text-xs">Linear</span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-xs">Memory Usage</span>
                                  <span className="text-xs">
                                    {algorithmType === "distinct-counting" ? "Logarithmic" : 
                                     algorithmType === "reservoir-sampling" ? "Constant" : 
                                     "Constant"}
                                  </span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-primary h-full rounded-full" style={{ width: algorithmType === "distinct-counting" ? "30%" : "20%" }}></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-xs">Accuracy</span>
                                  <span className="text-xs">
                                    {algorithmType === "distinct-counting" ? "Diminishes" : 
                                     algorithmType === "reservoir-sampling" ? "Constant" : 
                                     "Constant"}
                                  </span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-primary h-full rounded-full" style={{ width: algorithmType === "distinct-counting" ? "70%" : "90%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Stream Analytics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Current Statistics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Total Elements</span>
                              <span className="text-sm font-medium">{dataPoints.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Recent Average</span>
                              <span className="text-sm font-medium">
                                {dataPoints.length > 0 ? 
                                  (dataPoints.slice(-Math.min(windowSize, dataPoints.length)).reduce((sum, p) => sum + p.value, 0) / 
                                   Math.min(windowSize, dataPoints.length)).toFixed(2) : 
                                  "0.00"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Min Value</span>
                              <span className="text-sm font-medium">
                                {dataPoints.length > 0 ? 
                                  Math.min(...dataPoints.map(p => p.value)) : 
                                  "0"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Max Value</span>
                              <span className="text-sm font-medium">
                                {dataPoints.length > 0 ? 
                                  Math.max(...dataPoints.map(p => p.value)) : 
                                  "0"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Anomaly Detection</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Detected Anomalies</span>
                              <span className="text-sm font-medium">{anomalies.length}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Anomalies are detected using a statistical approach, identifying data points that deviate
                              more than 2 standard deviations from the moving average within the current window size.
                            </p>
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Recent Anomalies</h5>
                              {anomalies.length > 0 ? (
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {anomalies.slice(-3).map((index, i) => (
                                    <li key={i} className="flex justify-between">
                                      <span>Point #{index}</span>
                                      <span>Value: {dataPoints[index]?.value.toFixed(2) || "N/A"}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-xs text-muted-foreground">No anomalies detected yet.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Stream Characteristics</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Data Type</span>
                              <span className="text-sm font-medium capitalize">{streamType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Pattern</span>
                              <span className="text-sm font-medium">
                                {streamType === "social" ? "Bursty" : 
                                 streamType === "iot" ? "Periodic" : 
                                 "Variable"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Window Type</span>
                              <span className="text-sm font-medium">
                                {algorithmType === "distinct-counting" ? "Full Stream" : 
                                 algorithmType === "reservoir-sampling" ? "Reservoir" : 
                                 "Sliding"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Window Size</span>
                              <span className="text-sm font-medium">{windowSize} elements</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Trend Analysis</h4>
                          <div className="space-y-3">
                            {dataPoints.length > windowSize ? (
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Current Trend</span>
                                  <span className="text-sm font-medium">
                                    {(() => {
                                      const recentPoints = dataPoints.slice(-windowSize);
                                      const firstHalf = recentPoints.slice(0, windowSize / 2);
                                      const secondHalf = recentPoints.slice(windowSize / 2);
                                      
                                      const firstAvg = firstHalf.reduce((sum, p) => sum + p.value, 0) / firstHalf.length;
                                      const secondAvg = secondHalf.reduce((sum, p) => sum + p.value, 0) / secondHalf.length;
                                      
                                      const diff = secondAvg - firstAvg;
                                      
                                      if (diff > 5) return "Strong Upward";
                                      if (diff > 2) return "Upward";
                                      if (diff < -5) return "Strong Downward";
                                      if (diff < -2) return "Downward";
                                      return "Stable";
                                    })()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Volatility</span>
                                  <span className="text-sm font-medium">
                                    {(() => {
                                      const recentPoints = dataPoints.slice(-windowSize);
                                      const values = recentPoints.map(p => p.value);
                                      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
                                      const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
                                      const stdDev = Math.sqrt(variance);
                                      
                                      if (stdDev > avg * 0.5) return "High";
                                      if (stdDev > avg * 0.2) return "Medium";
                                      return "Low";
                                    })()}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Not enough data points for trend analysis. Need at least {windowSize} points.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
