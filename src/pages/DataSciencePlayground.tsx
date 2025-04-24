
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DataSciencePlayground } from "@/components/DataSciencePlayground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Database, FileInput, ChartBar } from "lucide-react";

export default function DataSciencePlaygroundPage() {
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
                    {[
                      {
                        name: "Urban Mobility Data",
                        description: "Hourly passenger count data for urban transportation systems",
                        size: "42KB",
                        format: "JSON"
                      },
                      {
                        name: "Agricultural Metrics",
                        description: "Monthly rainfall, soil moisture, and temperature data",
                        size: "76KB",
                        format: "CSV"
                      },
                      {
                        name: "Customer Reviews",
                        description: "Product review text data with sentiment categories",
                        size: "128KB",
                        format: "JSON"
                      },
                      {
                        name: "Network Graph",
                        description: "Node and edge data for social network analysis",
                        size: "95KB",
                        format: "JSON"
                      }
                    ].map((dataset, index) => (
                      <div key={index} className="border rounded-lg p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{dataset.name}</h3>
                          <p className="text-sm text-muted-foreground">{dataset.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-xs text-muted-foreground">
                            {dataset.size} • {dataset.format}
                          </div>
                          <button className="text-primary hover:text-primary/80 text-sm font-medium">
                            Download
                          </button>
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
