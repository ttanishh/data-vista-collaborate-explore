import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Play, ArrowRight, X } from "lucide-react";

export default function DataManipulation() {
  const [nodeCount, setNodeCount] = useState(4);
  const [step, setStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mapProgress, setMapProgress] = useState(0);
  const [shuffleProgress, setShuffleProgress] = useState(0);
  const [reduceProgress, setReduceProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<any[] | null>(null);
  const [resultsData, setResultsData] = useState<any[] | null>(null);
  const [operation, setOperation] = useState<string>("wordcount");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  
  const handleStartSimulation = () => {
    if (!fileData && !uploadedFile) {
      toast({
        title: "No Data Available",
        description: "Please upload a file first to run the MapReduce simulation.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSimulating(true);
    setMapProgress(0);
    setShuffleProgress(0);
    setReduceProgress(0);
    setStep(1);
    
    toast({
      title: "MapReduce Simulation Started",
      description: "The map phase will begin now.",
    });
    
    // Simulate the three phases of MapReduce
    let progress = 0;
    const mapInterval = setInterval(() => {
      progress += 10;
      setMapProgress(progress);
      
      if (progress >= 100) {
        clearInterval(mapInterval);
        setStep(2);
        toast({
          title: "Map Phase Complete",
          description: "Moving to shuffle phase.",
        });
        
        // Start shuffle phase
        progress = 0;
        const shuffleInterval = setInterval(() => {
          progress += 8;
          setShuffleProgress(progress);
          
          if (progress >= 100) {
            clearInterval(shuffleInterval);
            setStep(3);
            toast({
              title: "Shuffle Phase Complete", 
              description: "Moving to reduce phase.",
            });
            
            // Start reduce phase
            progress = 0;
            const reduceInterval = setInterval(() => {
              progress += 12;
              setReduceProgress(progress);
              
              if (progress >= 100) {
                clearInterval(reduceInterval);
                setIsSimulating(false);
                
                // Generate results based on the operation
                generateResults();
                
                toast({
                  title: "Reduce Phase Complete",
                  description: "MapReduce simulation has finished.",
                });
              }
            }, 200);
          }
        }, 180);
      }
    }, 150);
  };

  const generateResults = () => {
    if (!fileData) return;
    
    // Perform simple operations based on the selected operation
    switch (operation) {
      case "wordcount": {
        // Count word occurrences
        const wordCounts: Record<string, number> = {};
        
        fileData.forEach(item => {
          if (item.text) {
            const words = item.text.toLowerCase().split(/\s+/).filter(Boolean);
            words.forEach(word => {
              wordCounts[word] = (wordCounts[word] || 0) + 1;
            });
          }
        });
        
        const results = Object.entries(wordCounts).map(([word, count]) => ({ word, count }));
        setResultsData(results.sort((a, b) => b.count - a.count).slice(0, 20));
        break;
      }
      
      case "filter": {
        // Filter data based on a simple condition (keep items with value > 50)
        const filtered = fileData.filter(item => {
          if (item.value !== undefined) {
            return Number(item.value) > 50;
          }
          return false;
        });
        setResultsData(filtered);
        break;
      }
      
      case "aggregate": {
        // Aggregate data by category
        const aggregates: Record<string, number> = {};
        
        fileData.forEach(item => {
          if (item.category && item.value) {
            if (!aggregates[item.category]) {
              aggregates[item.category] = 0;
            }
            aggregates[item.category] += Number(item.value);
          }
        });
        
        const results = Object.entries(aggregates).map(([category, total]) => ({ category, total }));
        setResultsData(results);
        break;
      }
      
      default:
        // Default to original data
        setResultsData([...fileData]);
    }
  };

  const resetSimulation = () => {
    setMapProgress(0);
    setShuffleProgress(0);
    setReduceProgress(0);
    setStep(1);
    setIsSimulating(false);
    setResultsData(null);
  };

  const getStepDescription = () => {
    switch(step) {
      case 1:
        return "Map: Each node processes a portion of the data and outputs key-value pairs.";
      case 2:
        return "Shuffle: Key-value pairs are sorted and grouped by key across all nodes.";
      case 3:
        return "Reduce: Each reducer processes data for one or more keys and produces the final output.";
      default:
        return "";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (file.type === "application/json") {
          const parsedData = JSON.parse(event.target?.result as string);
          setFileData(Array.isArray(parsedData) ? parsedData : [parsedData]);
          toast({
            title: "File Loaded Successfully",
            description: `JSON data with ${Array.isArray(parsedData) ? parsedData.length : 1} records.`,
          });
        } else if (file.type === "text/csv" || file.type === "text/plain") {
          // Simple parsing for CSV/text files
          const text = event.target?.result as string;
          const lines = text.split("\n");
          
          if (lines.length > 0) {
            // For plain text, create synthetic data for word count
            if (file.type === "text/plain") {
              setFileData(lines.filter(Boolean).map(line => ({ text: line })));
              setOperation("wordcount"); // Set operation to wordcount for text files
            } else {
              // For CSV, parse with headers
              const headers = lines[0].split(",").map(h => h.trim());
              const parsedData = lines.slice(1).filter(Boolean).map(line => {
                const values = line.split(",");
                const record: Record<string, string> = {};
                headers.forEach((header, i) => {
                  record[header] = values[i]?.trim() || '';
                });
                return record;
              });
              setFileData(parsedData);
            }
            
            toast({
              title: "File Loaded Successfully",
              description: `Data with ${lines.length - 1} records.`,
            });
          }
        } else {
          toast({
            title: "Unsupported File Format",
            description: "Please upload JSON, CSV, or text files.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Error Parsing File",
          description: "The file could not be processed. Please check the format.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };

  const handleGenerateDemo = () => {
    // Generate sample data if no file is uploaded
    const sampleData = [];
    
    const categories = ["Electronics", "Clothing", "Food", "Books", "Home"];
    
    for (let i = 0; i < 50; i++) {
      sampleData.push({
        id: i,
        category: categories[Math.floor(Math.random() * categories.length)],
        value: Math.floor(Math.random() * 100),
        text: `Sample item ${i} description with some random words for testing purposes`
      });
    }
    
    setFileData(sampleData);
    setUploadedFile(null);
    toast({
      title: "Demo Data Generated",
      description: `${sampleData.length} sample records created.`,
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 3
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Paradigms for Data Manipulation
              </h1>
              <p className="text-xl text-muted-foreground">
                Visual MapReduce explorer with step-by-step visualization of distributed computing concepts
              </p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">MapReduce Visualization</h2>
                  <p className="text-muted-foreground">
                    See how MapReduce distributes data processing tasks across multiple nodes
                  </p>
                </div>
                
                <div className="border rounded-lg p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upload Your Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload data to process with MapReduce or generate sample data
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1">
                        <Input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept=".json,.csv,.txt"
                          onChange={handleFileUpload}
                        />
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={16} className="mr-2" />
                          Upload File
                        </Button>
                      </div>
                      <Button 
                        variant="secondary" 
                        onClick={handleGenerateDemo}
                      >
                        Generate Demo Data
                      </Button>
                    </div>
                    
                    {uploadedFile && (
                      <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-md">
                        <div className="flex items-center">
                          <span className="font-medium">{uploadedFile.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({(uploadedFile.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setUploadedFile(null);
                            setFileData(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    )}
                    
                    {fileData && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Data Preview</h4>
                          <span className="text-xs text-muted-foreground">{fileData.length} records</span>
                        </div>
                        
                        <div className="overflow-auto max-h-40 border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {fileData[0] && Object.keys(fileData[0]).slice(0, 4).map((key) => (
                                  <TableHead key={key}>{key}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {fileData.slice(0, 5).map((row, index) => (
                                <TableRow key={index}>
                                  {Object.values(row).slice(0, 4).map((value: any, i) => (
                                    <TableCell key={i} className="truncate max-w-[150px]">
                                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-lg font-medium mb-1">Select Operation</h3>
                        <p className="text-sm text-muted-foreground">Choose the MapReduce operation to apply</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={operation === "wordcount" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOperation("wordcount")}
                        >
                          Word Count
                        </Button>
                        <Button
                          variant={operation === "filter" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOperation("filter")}
                        >
                          Filter
                        </Button>
                        <Button
                          variant={operation === "aggregate" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOperation("aggregate")}
                        >
                          Aggregate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">Node Allocation</h3>
                      <span className="text-sm text-muted-foreground">{nodeCount} Nodes</span>
                    </div>
                    
                    <Slider 
                      defaultValue={[4]} 
                      min={2} 
                      max={10} 
                      step={1} 
                      value={[nodeCount]} 
                      onValueChange={(value) => setNodeCount(value[0])}
                      disabled={isSimulating}
                    />
                    
                    <div className="grid grid-cols-5 gap-2">
                      {[2, 4, 6, 8, 10].map((num) => (
                        <Button
                          key={num}
                          variant={nodeCount === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNodeCount(num)}
                          disabled={isSimulating}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-secondary/10">
                    <h3 className="font-medium mb-3">Current Phase: {step === 1 ? "Map" : step === 2 ? "Shuffle" : "Reduce"}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {getStepDescription()}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className={`p-4 ${step === 1 ? "ring-2 ring-primary" : ""}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Map</h4>
                            <span className="text-sm">{mapProgress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-300"
                              style={{ width: `${mapProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className={`p-4 ${step === 2 ? "ring-2 ring-primary" : ""}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Shuffle</h4>
                            <span className="text-sm">{shuffleProgress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-300"
                              style={{ width: `${shuffleProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className={`p-4 ${step === 3 ? "ring-2 ring-primary" : ""}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Reduce</h4>
                            <span className="text-sm">{reduceProgress}%</span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-300"
                              style={{ width: `${reduceProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    {!isSimulating ? (
                      <Button onClick={handleStartSimulation}>
                        <Play size={16} className="mr-2" />
                        Start Simulation
                      </Button>
                    ) : (
                      <Button variant="outline" disabled>
                        Simulation Running...
                      </Button>
                    )}
                    <Button variant="outline" onClick={resetSimulation} disabled={isSimulating}>
                      Reset
                    </Button>
                  </div>
                  
                  {resultsData && resultsData.length > 0 && (
                    <div className="space-y-4 border-t pt-6 mt-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Results</h3>
                        <span className="text-sm text-muted-foreground">{resultsData.length} records</span>
                      </div>
                      
                      <div className="overflow-auto max-h-80 border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(resultsData[0]).map((key) => (
                                <TableHead key={key}>{key}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {resultsData.map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value: any, i) => (
                                  <TableCell key={i}>
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            <Tabs defaultValue="concepts" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
                <TabsTrigger value="code">Pseudocode</TabsTrigger>
                <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
              </TabsList>
              
              {/* ... keep existing code (tabs content) */}
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
