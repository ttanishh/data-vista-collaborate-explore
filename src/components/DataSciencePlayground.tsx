
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { RealWorldDemo } from './RealWorldDemo';
import { 
  Upload, 
  Database, 
  FileInput, 
  FileOutput, 
  ChartBar, 
  ChartLine, 
  ChartPie,
  Settings,
  Search,
  Filter,
  Trash,
  Download,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataSciencePlaygroundProps {
  defaultModule?: string;
}

export function DataSciencePlayground({ defaultModule = 'introduction' }: DataSciencePlaygroundProps) {
  const [selectedModule, setSelectedModule] = useState<string>(defaultModule);
  const [selectedOperation, setSelectedOperation] = useState<string>('visualization');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);
  const [selectedVisualization, setSelectedVisualization] = useState<string>('auto');
  const [preprocessData, setPreprocessData] = useState<boolean>(true);
  const { toast } = useToast();

  const modules = [
    { id: 'introduction', name: 'Introduction', icon: <Database size={16} /> },
    { id: 'largeScaleData', name: 'Large Scale Data', icon: <FileInput size={16} /> },
    { id: 'dataManipulation', name: 'Data Manipulation', icon: <FileOutput size={16} /> },
    { id: 'textAnalysis', name: 'Text Analysis', icon: <ChartBar size={16} /> },
    { id: 'dataStreams', name: 'Data Streams', icon: <ChartLine size={16} /> },
    { id: 'advancedAnalysis', name: 'Advanced Analysis', icon: <ChartPie size={16} /> }
  ];

  const operations = {
    introduction: ['visualization', 'domain comparison', 'workflow simulation'],
    largeScaleData: ['data profiling', 'cleaning', 'transformation'],
    dataManipulation: ['mapreduce', 'aggregation', 'filtering'],
    textAnalysis: ['sentiment analysis', 'topic modeling', 'entity recognition'],
    dataStreams: ['stream simulation', 'anomaly detection', 'real-time processing'],
    advancedAnalysis: ['network analysis', 'recommendation', 'community detection']
  };

  const visualizationTypes = [
    { id: 'auto', name: 'Automatic (Based on Data)' },
    { id: 'line', name: 'Line Chart' },
    { id: 'bar', name: 'Bar Chart' },
    { id: 'pie', name: 'Pie Chart' },
    { id: 'scatter', name: 'Scatter Plot' },
    { id: 'area', name: 'Area Chart' },
    { id: 'heatmap', name: 'Heat Map' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadedFile(file);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // Try to parse as JSON
        if (file.type === "application/json") {
          const parsedData = JSON.parse(event.target?.result as string);
          setUploadedData(Array.isArray(parsedData) ? parsedData : [parsedData]);
          toast({
            title: "File uploaded successfully",
            description: `JSON data with ${Array.isArray(parsedData) ? parsedData.length : 1} records loaded.`,
          });
        } else if (file.type === "text/csv") {
          // Simple CSV parsing
          const text = event.target?.result as string;
          const lines = text.split("\n");
          const headers = lines[0].split(",");
          
          const parsedData = lines.slice(1).map(line => {
            if (!line.trim()) return null; // Skip empty lines
            
            const values = line.split(",");
            const entry: Record<string, string> = {};
            headers.forEach((header, i) => {
              entry[header.trim()] = values[i]?.trim() || '';
            });
            return entry;
          }).filter(Boolean); // Remove null entries
          
          setUploadedData(parsedData as any[]);
          toast({
            title: "File uploaded successfully",
            description: `CSV data with ${parsedData.length} records loaded.`,
          });
        } else {
          toast({
            title: "Unsupported file format",
            description: "Please upload JSON or CSV files only.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "Please check the file format and try again.",
          variant: "destructive"
        });
        console.error("Error processing file:", error);
      }
    };
    
    if (file.type === "application/json" || file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      toast({
        title: "Unsupported file format",
        description: "Please upload JSON or CSV files only.",
        variant: "destructive"
      });
    }
  };

  const handleProcess = () => {
    if (!uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload a file first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress updates
    const totalSteps = preprocessData ? 10 : 5;
    let currentStep = 0;
    
    const processInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.round((currentStep / totalSteps) * 100);
      setProcessingProgress(newProgress);
      
      if (currentStep === totalSteps) {
        clearInterval(processInterval);
        setIsProcessing(false);
        toast({
          title: "Processing complete",
          description: `${selectedOperation} applied to the data successfully.`,
        });
      }
    }, preprocessData ? 200 : 300);
  };

  const clearData = () => {
    setUploadedFile(null);
    setUploadedData(null);
    toast({
      title: "Data cleared",
      description: "All uploaded data has been cleared.",
    });
  };
  
  const downloadResults = () => {
    if (!uploadedData) {
      toast({
        title: "No data to download",
        description: "Process data first to generate results.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a JSON blob and download it
    const dataStr = JSON.stringify(uploadedData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedModule}_${selectedOperation}_results.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Results have been downloaded as JSON.",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-heading">Data Science Playground</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setAdvancedSettings(!advancedSettings)}
            >
              <Settings size={16} className="mr-1" />
              {advancedSettings ? "Hide" : "Show"} Advanced Settings
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                toast({
                  title: "Help",
                  description: "Upload data files and apply operations from different data science modules.",
                });
              }}
            >
              <Info size={18} />
            </Button>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          Upload your data and apply various data science operations to visualize and analyze your data.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <h3 className="font-medium">1. Select Module</h3>
              <RadioGroup 
                value={selectedModule} 
                onValueChange={setSelectedModule}
                className="grid grid-cols-2 gap-2"
              >
                {modules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={module.id} id={`module-${module.id}`} />
                    <Label htmlFor={`module-${module.id}`} className="flex items-center gap-1.5 cursor-pointer">
                      {module.icon}
                      <span>{module.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="p-4 border rounded-lg space-y-4">
              <h3 className="font-medium">2. Select Operation</h3>
              <RadioGroup 
                value={selectedOperation} 
                onValueChange={setSelectedOperation}
              >
                {selectedModule && operations[selectedModule as keyof typeof operations]?.map((operation) => (
                  <div key={operation} className="flex items-center space-x-2">
                    <RadioGroupItem value={operation} id={`operation-${operation}`} />
                    <Label htmlFor={`operation-${operation}`}>{operation}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="p-4 border rounded-lg space-y-4">
              <h3 className="font-medium">3. Upload Your Data</h3>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="mb-2 text-sm text-muted-foreground">
                  {uploadedFile ? uploadedFile.name : "No file selected"}
                </p>
                <Input
                  type="file"
                  accept=".json,.csv"
                  className="hidden"
                  id="data-upload"
                  onChange={handleFileUpload}
                />
                <Label htmlFor="data-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </Label>
                <p className="mt-2 text-xs text-muted-foreground">
                  Supported formats: JSON, CSV
                </p>
                {uploadedFile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-destructive hover:text-destructive/80"
                    onClick={clearData}
                  >
                    <Trash size={14} className="mr-1" />
                    Clear Data
                  </Button>
                )}
              </div>
            </div>
            
            {advancedSettings && (
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-medium">Advanced Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="preprocess-data" 
                      checked={preprocessData} 
                      onCheckedChange={(checked) => setPreprocessData(checked as boolean)} 
                    />
                    <div className="grid gap-1.5">
                      <Label 
                        htmlFor="preprocess-data" 
                        className="cursor-pointer"
                      >
                        Preprocess data
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Clean and normalize data before processing
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visualization-type">Visualization Type</Label>
                  <Select
                    value={selectedVisualization}
                    onValueChange={setSelectedVisualization}
                  >
                    <SelectTrigger id="visualization-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visualizationTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                onClick={handleProcess}
                disabled={!uploadedFile || isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Data"}
              </Button>
              
              {uploadedData && (
                <Button 
                  variant="outline"
                  onClick={downloadResults}
                  className="flex-shrink-0"
                  disabled={isProcessing}
                >
                  <Download size={16} className="mr-1" />
                  Export
                </Button>
              )}
            </div>
            
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Processing...</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} />
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Results & Visualization</h3>
              {uploadedData && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Filter size={14} className="mr-1" />
                  {uploadedData.length} records
                </div>
              )}
            </div>
            
            <div className="min-h-[300px] flex items-center justify-center">
              {uploadedData ? (
                <RealWorldDemo 
                  module={selectedModule} 
                  uploadedData={uploadedData}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <FileOutput className="h-16 w-16 mx-auto mb-2 opacity-30" />
                  <p>Upload and process data to see results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
