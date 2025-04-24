
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
  ChartPie
} from "lucide-react";

interface DataSciencePlaygroundProps {
  defaultModule?: string;
}

export function DataSciencePlayground({ defaultModule = 'introduction' }: DataSciencePlaygroundProps) {
  const [selectedModule, setSelectedModule] = useState<string>(defaultModule);
  const [selectedOperation, setSelectedOperation] = useState<string>('visualization');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
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
            const values = line.split(",");
            const entry: Record<string, string> = {};
            headers.forEach((header, i) => {
              entry[header.trim()] = values[i]?.trim() || '';
            });
            return entry;
          });
          
          setUploadedData(parsedData);
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
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Processing complete",
        description: `${selectedOperation} applied to the data.`,
      });
    }, 1500);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold gradient-heading">Data Science Playground</h2>
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
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleProcess}
              disabled={!uploadedFile || isProcessing}
            >
              {isProcessing ? "Processing..." : "Process Data"}
            </Button>
          </div>
          
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Results & Visualization</h3>
            <div className="min-h-[300px] flex items-center justify-center">
              {uploadedData ? (
                <RealWorldDemo module={selectedModule} />
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
