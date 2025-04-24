import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Settings, ArrowRight, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StreamingDataProps {
  initialData?: any[];
}

export function StreamingData({ initialData }: StreamingDataProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamData, setStreamData] = useState<any[]>(initialData || []);
  const [streamInterval, setStreamInterval] = useState<number>(1000); // ms
  const [noiseLevel, setNoiseLevel] = useState<number>(5);
  const [dataType, setDataType] = useState<string>("sine");
  const [anomalyRate, setAnomalyRate] = useState<number>(10); // percentage
  const [windowSize, setWindowSize] = useState<number>(20);
  const [userValue, setUserValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showFiltered, setShowFiltered] = useState<boolean>(false);
  
  const intervalRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Update filtered data when streamData changes
  useEffect(() => {
    if (streamData.length > 0) {
      // Apply simple moving average filter
      const filtered = applyFilter(streamData);
      setFilteredData(filtered);
    }
  }, [streamData]);
  
  const applyFilter = (data: any[]) => {
    const windowSizeInt = Math.floor(windowSize);
    
    // Not enough data for filtering
    if (data.length <= windowSizeInt) {
      return data;
    }
    
    // Apply simple moving average
    return data.map((item, index) => {
      if (index < windowSizeInt) {
        return { ...item };
      }
      
      // Calculate moving average
      let sum = 0;
      for (let i = 0; i < windowSizeInt; i++) {
        sum += data[index - i].value;
      }
      
      return {
        ...item,
        value: item.value,
        filteredValue: sum / windowSizeInt
      };
    });
  };
  
  const toggleStreaming = () => {
    if (isStreaming) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      toast({
        title: "Stream Paused",
        description: `Data streaming has been paused. ${streamData.length} data points collected.`
      });
    } else {
      generateStreamData();
      
      intervalRef.current = window.setInterval(() => {
        generateStreamData();
      }, streamInterval);
      
      toast({
        title: "Stream Started",
        description: `Data streaming at ${streamInterval}ms intervals.`
      });
    }
    
    setIsStreaming(!isStreaming);
  };
  
  const generateStreamData = () => {
    const timestamp = new Date().toISOString();
    const time = new Date().getTime();
    
    // Generate new data point based on selected pattern
    let newValue = 0;
    
    switch (dataType) {
      case 'sine':
        newValue = 50 + 40 * Math.sin(time / 5000); // Sine wave with period of ~30 seconds
        break;
      case 'linear':
        newValue = (streamData.length > 0 ? streamData[streamData.length - 1].value : 50) + (Math.random() - 0.5) * 5;
        // Keep in reasonable bounds
        newValue = Math.max(0, Math.min(100, newValue));
        break;
      case 'random':
        newValue = Math.random() * 100;
        break;
      case 'user':
        // Use user input value as base, with slight random variation
        const baseValue = parseFloat(userValue) || 50;
        newValue = baseValue + (Math.random() - 0.5) * 5;
        break;
      default:
        newValue = 50;
    }
    
    // Add noise
    newValue += (Math.random() - 0.5) * noiseLevel;
    
    // Randomly add anomalies
    if (Math.random() * 100 < anomalyRate) {
      // Add spike or drop
      newValue += (Math.random() > 0.5 ? 1 : -1) * Math.random() * 30;
    }
    
    // Add point and limit history length
    const newPoint = { time, timestamp, value: newValue };
    
    setStreamData(prevData => {
      const newData = [...prevData, newPoint];
      // Keep only last 100 points to avoid memory issues
      return newData.slice(-100);
    });
  };
  
  const resetStream = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsStreaming(false);
    setStreamData([]);
    setFilteredData([]);
    
    toast({
      title: "Stream Reset",
      description: "All data has been cleared."
    });
  };
  
  const addUserDataPoint = () => {
    const value = parseFloat(userValue);
    
    if (isNaN(value)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number.",
        variant: "destructive"
      });
      return;
    }
    
    const timestamp = new Date().toISOString();
    const time = new Date().getTime();
    
    setStreamData(prevData => [...prevData, { time, timestamp, value }]);
    
    toast({
      title: "Data Point Added",
      description: `Added value: ${value}`
    });
  };
  
  const displayData = showFiltered && filteredData.length > 0 ? filteredData : streamData;
  
  return (
    <Card className="p-4 bg-white dark:bg-gray-950 shadow-md overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              Data Streaming Simulation
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time data streams with configurable patterns and noise
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isStreaming ? "destructive" : "default"}
              size="sm"
              onClick={toggleStreaming}
            >
              {isStreaming ? (
                <>
                  <Pause size={16} className="mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} className="mr-1" />
                  Start Stream
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetStream}
              disabled={isStreaming}
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/20">
          <h4 className="font-medium mb-4">Stream Visualization</h4>
          <div className="h-64">
            {displayData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={displayData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    dot={false}
                    isAnimationActive={false}
                  />
                  {showFiltered && (
                    <Line 
                      type="monotone" 
                      dataKey="filteredValue" 
                      stroke="#82ca9d" 
                      dot={false}
                      isAnimationActive={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data points yet. Start the stream to see data.
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-1">
              <Settings size={16} />
              Stream Settings
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataType">Pattern Type</Label>
                <Select 
                  value={dataType}
                  onValueChange={setDataType}
                >
                  <SelectTrigger id="dataType">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sine">Sine Wave</SelectItem>
                    <SelectItem value="linear">Linear (Random Walk)</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="user">User Input Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="streamInterval">Interval (ms)</Label>
                <Select 
                  value={streamInterval.toString()}
                  onValueChange={(value) => setStreamInterval(parseInt(value))}
                >
                  <SelectTrigger id="streamInterval">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="250">250ms (Fast)</SelectItem>
                    <SelectItem value="500">500ms</SelectItem>
                    <SelectItem value="1000">1000ms (1 second)</SelectItem>
                    <SelectItem value="2000">2000ms (2 seconds)</SelectItem>
                    <SelectItem value="5000">5000ms (5 seconds)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="noiseLevel">Noise Level</Label>
                <span className="text-xs text-muted-foreground">{noiseLevel}</span>
              </div>
              <Slider
                id="noiseLevel"
                min={0}
                max={20}
                step={1}
                value={[noiseLevel]}
                onValueChange={(value) => setNoiseLevel(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="anomalyRate">Anomaly Rate (%)</Label>
                <span className="text-xs text-muted-foreground">{anomalyRate}%</span>
              </div>
              <Slider
                id="anomalyRate"
                min={0}
                max={30}
                step={1}
                value={[anomalyRate]}
                onValueChange={(value) => setAnomalyRate(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-1">
              <Filter size={16} />
              Data Processing
            </h4>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="windowSize">Filter Window Size</Label>
                <span className="text-xs text-muted-foreground">{windowSize} points</span>
              </div>
              <Slider
                id="windowSize"
                min={2}
                max={50}
                step={1}
                value={[windowSize]}
                onValueChange={(value) => setWindowSize(value[0])}
              />
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="showFiltered"
                  checked={showFiltered}
                  onCheckedChange={(checked) => setShowFiltered(!!checked)}
                />
                <Label htmlFor="showFiltered">Show filtered data (Moving Average)</Label>
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <h4 className="font-medium">Manual Input</h4>
              
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Enter value (0-100)"
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                  />
                </div>
                <Button onClick={addUserDataPoint}>
                  Add Data Point
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Add custom data points or set a base value for the "User Input" pattern
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 text-muted-foreground p-4 rounded-md border border-blue-100 dark:border-blue-900/30">
          <h4 className="font-medium mb-2 text-foreground">Stream Data Concepts</h4>
          <p className="mb-2">Data streams represent continuous flows of data that arrive in real-time and often require immediate processing:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Windowing</span>: Processing data in discrete time windows rather than all at once
            </li>
            <li>
              <span className="font-medium">Filtering</span>: Removing noise and detecting anomalies in the stream
            </li>
            <li>
              <span className="font-medium">Summarization</span>: Generating statistics over sliding windows of data
            </li>
            <li>
              <span className="font-medium">Event Processing</span>: Identifying patterns that signal important events
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

// Missing import
import { Checkbox } from "@/components/ui/checkbox";
