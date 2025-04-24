
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountMinSketch } from '@/components/datastreams/CountMinSketch';
import { BloomFilter } from '@/components/datastreams/BloomFilter';
import { FrequentItems } from '@/components/datastreams/FrequentItems';
import { StockAnalyzer } from '@/components/datastreams/StockAnalyzer';

export default function DataStreams() {
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

            <Tabs defaultValue="algorithms" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="algorithms">Stream Algorithms</TabsTrigger>
                <TabsTrigger value="applications">Real-world Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="algorithms" className="space-y-6">
                <CountMinSketch />
                <BloomFilter />
                <FrequentItems />
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <StockAnalyzer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
