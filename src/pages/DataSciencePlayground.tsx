
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DataSciencePlayground } from "@/components/DataSciencePlayground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Database, FileInput, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function DataSciencePlaygroundPage() {
  const { toast } = useToast();

  // Sample datasets for downloading
  const sampleDatasets = [
    {
      name: "Urban Mobility Data",
      description: "Hourly passenger count data for urban transportation systems",
      size: "42KB",
      format: "JSON",
      data: [
        { hour: 1, line: "blue", passengers: 120 },
        { hour: 2, line: "blue", passengers: 90 },
        { hour: 3, line: "blue", passengers: 70 },
        { hour: 4, line: "blue", passengers: 40 },
        { hour: 5, line: "blue", passengers: 150 },
        { hour: 1, line: "red", passengers: 140 },
        { hour: 2, line: "red", passengers: 110 },
        { hour: 3, line: "red", passengers: 80 },
        { hour: 4, line: "red", passengers: 60 },
        { hour: 5, line: "red", passengers: 170 }
      ]
    },
    {
      name: "Agricultural Metrics",
      description: "Monthly rainfall, soil moisture, and temperature data",
      size: "76KB",
      format: "CSV",
      data: "month,rainfall_mm,soil_moisture_pct,temperature_c\n1,120,60,15\n2,110,58,16\n3,90,55,18\n4,80,50,20\n5,60,45,24\n6,30,40,28\n7,20,35,30\n8,25,30,29\n9,40,35,26\n10,70,40,22\n11,100,50,18\n12,115,55,16"
    },
    {
      name: "Customer Reviews",
      description: "Product review text data with sentiment categories",
      size: "128KB",
      format: "JSON",
      data: [
        { id: 1, product: "Phone X", text: "Great battery life and amazing camera quality.", sentiment: "positive", rating: 5 },
        { id: 2, product: "Laptop Pro", text: "Overpriced and battery drains too quickly.", sentiment: "negative", rating: 2 },
        { id: 3, product: "Smart Watch", text: "Nice design but limited functionality.", sentiment: "neutral", rating: 3 },
        { id: 4, product: "Wireless Earbuds", text: "Sound quality is excellent but uncomfortable for long use.", sentiment: "mixed", rating: 3 }
      ]
    },
    {
      name: "Network Graph",
      description: "Node and edge data for social network analysis",
      size: "95KB",
      format: "JSON",
      data: {
        nodes: [
          { id: "1", name: "Alice", group: 1 },
          { id: "2", name: "Bob", group: 1 },
          { id: "3", name: "Charlie", group: 2 },
          { id: "4", name: "David", group: 2 },
          { id: "5", name: "Eve", group: 3 }
        ],
        links: [
          { source: "1", target: "2", value: 5 },
          { source: "1", target: "3", value: 2 },
          { source: "2", target: "3", value: 7 },
          { source: "3", target: "4", value: 8 },
          { source: "4", target: "5", value: 3 }
        ]
      }
    }
  ];

  const handleDownloadSampleDataset = (index: number) => {
    const dataset = sampleDatasets[index];
    let dataStr: string;
    let mimeType: string;
    let fileExt: string;
    
    // Prepare the data based on format
    if (dataset.format === "JSON") {
      dataStr = JSON.stringify(dataset.data, null, 2);
      mimeType = "application/json";
      fileExt = "json";
    } else if (dataset.format === "CSV") {
      dataStr = dataset.data as string; // Already in CSV format
      mimeType = "text/csv";
      fileExt = "csv";
    } else {
      toast({
        title: "Unsupported format",
        description: "This dataset format is not supported for download.",
        variant: "destructive"
      });
      return;
    }
    
    // Create and download file
    const blob = new Blob([dataStr], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.name.toLowerCase().replace(/\s+/g, '_')}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `${dataset.name} has been downloaded as ${dataset.format}.`,
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Interactive Learning
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Data Science Playground
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload your data, choose operations from any module, and visualize the results interactively
              </p>
            </div>
            
            <Tabs defaultValue="playground" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="playground" className="flex items-center gap-1.5">
                  <Database size={16} />
                  <span>Interactive Playground</span>
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="flex items-center gap-1.5">
                  <FileInput size={16} />
                  <span>Sample Datasets</span>
                </TabsTrigger>
                <TabsTrigger value="guide" className="flex items-center gap-1.5">
                  <ChartBar size={16} />
                  <span>Usage Guide</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="playground">
                <DataSciencePlayground />
              </TabsContent>
              
              <TabsContent value="tutorials" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Sample Datasets</h2>
                  <p className="text-muted-foreground mb-6">
                    Download these sample datasets to explore the capabilities of the Data Science Playground.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleDatasets.map((dataset, index) => (
                      <div key={index} className="border rounded-lg p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{dataset.name}</h3>
                          <p className="text-sm text-muted-foreground">{dataset.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-xs text-muted-foreground">
                            {dataset.size} • {dataset.format}
                          </div>
                          <Button 
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadSampleDataset(index)}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="guide" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Usage Guide</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Getting Started</h3>
                      <p className="text-muted-foreground">
                        The Data Science Playground allows you to apply various data science operations 
                        to your data and visualize the results interactively.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Step 1: Select a Module</h3>
                      <p className="text-muted-foreground">
                        Choose one of our six specialized data science modules, each offering different
                        operations and visualization techniques.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Step 2: Select an Operation</h3>
                      <p className="text-muted-foreground">
                        Each module offers several operations that can be applied to your data.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Step 3: Upload Your Data</h3>
                      <p className="text-muted-foreground">
                        Upload JSON or CSV files to analyze. The playground supports files up to 10MB.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Step 4: Process and Visualize</h3>
                      <p className="text-muted-foreground">
                        Click "Process Data" to apply the selected operation to your data. The results
                        will be displayed in the visualization panel.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Advanced Settings</h3>
                      <p className="text-muted-foreground">
                        Use the advanced settings to customize preprocessing options and visualization types.
                      </p>
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
