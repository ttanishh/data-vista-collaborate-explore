
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountMinSketch } from '@/components/datastreams/CountMinSketch';
import { BloomFilter } from '@/components/datastreams/BloomFilter';
import { FrequentItems } from '@/components/datastreams/FrequentItems';
import { StockAnalyzer } from '@/components/datastreams/StockAnalyzer';
import { FileUpload } from '@/components/playground/FileUpload';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

export default function DataStreams() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadedFile(file);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (file.type === "application/json") {
          const parsedData = JSON.parse(event.target?.result as string);
          setUploadedData(Array.isArray(parsedData) ? parsedData : [parsedData]);
          toast({
            title: "File uploaded successfully",
            description: "Your data has been loaded for analysis.",
          });
        } else if (file.type === "text/csv") {
          const text = event.target?.result as string;
          const lines = text.split("\n");
          const headers = lines[0].split(",");
          
          const parsedData = lines.slice(1).map(line => {
            if (!line.trim()) return null;
            const values = line.split(",");
            const entry: Record<string, string> = {};
            headers.forEach((header, i) => {
              entry[header.trim()] = values[i]?.trim() || '';
            });
            return entry;
          }).filter(Boolean);
          
          setUploadedData(parsedData as any[]);
          toast({
            title: "File uploaded successfully",
            description: "Your CSV data has been loaded for analysis.",
          });
        }
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "Please check the file format and try again.",
          variant: "destructive"
        });
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

  const clearData = () => {
    setUploadedFile(null);
    setUploadedData(null);
    toast({
      title: "Data cleared",
      description: "Uploaded data has been cleared.",
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold">Mining Data Streams</h1>
              <p className="text-xl text-muted-foreground">
                Explore real-time data processing algorithms and visualizations
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h2 className="text-lg font-semibold mb-4">Upload Your Data</h2>
              <FileUpload 
                uploadedFile={uploadedFile}
                onFileUpload={handleFileUpload}
                onClearData={clearData}
              />
            </div>

            <Tabs defaultValue="algorithms" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="algorithms">Stream Algorithms</TabsTrigger>
                <TabsTrigger value="applications">Real-world Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="algorithms" className="space-y-6">
                <CountMinSketch userUploadedData={uploadedData} />
                <BloomFilter userUploadedData={uploadedData} />
                <FrequentItems userUploadedData={uploadedData} />
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <StockAnalyzer userUploadedData={uploadedData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
