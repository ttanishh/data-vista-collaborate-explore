import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountMinSketch } from '@/components/datastreams/CountMinSketch';
import { BloomFilter } from '@/components/datastreams/BloomFilter';
import { FrequentItems } from '@/components/datastreams/FrequentItems';
import { StockAnalyzer } from '@/components/datastreams/StockAnalyzer';
import { FileUpload } from '@/components/playground/FileUpload';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ModuleExplanation } from "@/components/modules/ModuleExplanation";

const moduleTopics = [
  {
    name: "Count-Min Sketch",
    description: "An efficient probabilistic data structure for frequency estimation in data streams",
    example: `// Count-Min Sketch Example
const width = 4;  // Number of hash functions
const depth = 1000;  // Size of each hash table
const cms = new CountMinSketch(width, depth);

// Adding items to the stream
cms.add("item1");
cms.add("item2");
cms.add("item1");

// Query frequency
const freq = cms.estimate("item1"); // Returns approximate frequency`
  },
  {
    name: "Bloom Filters",
    description: "Space-efficient probabilistic data structure for set membership testing",
    example: `// Bloom Filter Example
const size = 1000;  // Filter size
const hashFunctions = 3;  // Number of hash functions
const bloom = new BloomFilter(size, hashFunctions);

// Adding elements
bloom.add("element1");
bloom.add("element2");

// Testing membership
const isMember = bloom.test("element1"); // Returns true
const notMember = bloom.test("element3"); // Likely returns false`
  },
  {
    name: "Real-time Stock Analysis",
    description: "Analyzing streaming stock data for pattern detection and anomaly identification",
    example: `// Stock Stream Analysis
const stockStream = new StockAnalyzer({
  windowSize: 60,  // 60-second window
  threshold: 0.02  // 2% change threshold
});

// Processing incoming data
stockStream.onData((price) => {
  const analysis = stockStream.analyze(price);
  if (analysis.isAnomaly) {
    console.log("Anomaly detected!");
  }
});`
  }
];

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
            <ModuleExplanation
              title="Mining Data Streams"
              description="Explore real-time data processing algorithms and learn how to handle continuous data streams efficiently."
              topics={moduleTopics}
            />

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
