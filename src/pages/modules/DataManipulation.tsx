
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export default function DataManipulation() {
  const [nodeCount, setNodeCount] = useState(4);
  const [step, setStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mapProgress, setMapProgress] = useState(0);
  const [shuffleProgress, setShuffleProgress] = useState(0);
  const [reduceProgress, setReduceProgress] = useState(0);
  
  const { toast } = useToast();
  
  const handleStartSimulation = () => {
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

  const resetSimulation = () => {
    setMapProgress(0);
    setShuffleProgress(0);
    setReduceProgress(0);
    setStep(1);
    setIsSimulating(false);
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
                  
                  <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
                    <div className="mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6" y2="6"></line>
                        <line x1="6" y1="18" x2="6" y2="18"></line>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-medium mb-2">MapReduce Simulation Visualization</p>
                      <p className="text-sm text-muted-foreground mb-6">
                        The visualization will display the flow of data through the MapReduce process
                      </p>
                      <div className="flex gap-4 justify-center">
                        {!isSimulating ? (
                          <Button onClick={handleStartSimulation}>
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
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Tabs defaultValue="concepts" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
                <TabsTrigger value="code">Pseudocode</TabsTrigger>
                <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="concepts" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">MapReduce Core Concepts</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-medium">Map Function</h3>
                        <p className="text-sm text-muted-foreground">
                          The map function processes input records and generates intermediate key-value pairs. It runs in parallel across multiple nodes, allowing large datasets to be processed efficiently.
                        </p>
                        <div className="p-3 bg-secondary/20 rounded-lg">
                          <code className="text-xs">
                            map(key, value) → list(intermediate_key, intermediate_value)
                          </code>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Shuffle and Sort</h3>
                        <p className="text-sm text-muted-foreground">
                          After the map phase, the MapReduce framework groups all intermediate values associated with the same intermediate key and passes them to the reduce function.
                        </p>
                        <div className="p-3 bg-secondary/20 rounded-lg">
                          <code className="text-xs">
                            shuffle(key, list(values)) → (key, values)
                          </code>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Reduce Function</h3>
                        <p className="text-sm text-muted-foreground">
                          The reduce function combines all intermediate values associated with the same intermediate key and produces zero or more output values.
                        </p>
                        <div className="p-3 bg-secondary/20 rounded-lg">
                          <code className="text-xs">
                            reduce(intermediate_key, list(intermediate_value)) → list(output_value)
                          </code>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Distributed Processing</h3>
                        <p className="text-sm text-muted-foreground">
                          MapReduce distributes processing across multiple machines in a cluster, handling parallelization, fault tolerance, data distribution, and load balancing.
                        </p>
                        <div className="p-3 bg-secondary/20 rounded-lg">
                          <code className="text-xs">
                            distribute(data, nodes) → list(data_chunk)
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="code" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">MapReduce Pseudocode</h2>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg overflow-auto">
                      <pre className="text-xs">
{`# Word Count Example in MapReduce

# Map function - processes input key/value pairs
function map(document_id, document_text):
    # For each word in the document
    for each word in tokenize(document_text):
        # Emit a key-value pair with the word as key and count as value
        emit(word, 1)
    
# Reduce function - combines all intermediate values for a key
function reduce(word, counts[]):
    # Sum all counts for this word
    sum = 0
    for each count in counts:
        sum += count
    
    # Emit the word with its total count
    emit(word, sum)

# Driver program
function main():
    # Input data: document IDs and contents
    input_data = {
        "doc1": "Hello world hello",
        "doc2": "World data science",
        "doc3": "Data processing world"
    }
    
    # Map phase
    mapped_data = {}
    for doc_id, text in input_data:
        map_results = map(doc_id, text)
        for (word, count) in map_results:
            if word not in mapped_data:
                mapped_data[word] = []
            mapped_data[word].append(count)
    
    # Shuffle and sort phase (handled by framework)
    # Data is now grouped by key
    
    # Reduce phase
    output_data = {}
    for word, counts in mapped_data:
        output_data[word] = reduce(word, counts)
    
    return output_data

# Result will be: 
# {
#   "hello": 2,
#   "world": 3,
#   "data": 2,
#   "science": 1,
#   "processing": 1
# }
`}
                      </pre>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Common Use Cases</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Word count in large text corpora</li>
                          <li>Inverted index creation for search engines</li>
                          <li>Distributed sorting of large datasets</li>
                          <li>Web access log analysis</li>
                          <li>Machine learning data preparation</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Framework Implementations</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Apache Hadoop (Java)</li>
                          <li>Apache Spark (Scala, Java, Python)</li>
                          <li>Google Cloud Dataflow</li>
                          <li>Amazon EMR (Elastic MapReduce)</li>
                          <li>MongoDB's Aggregation Framework</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Performance Analysis</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3">Sequential vs. Parallel Processing</h3>
                        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Performance comparison chart will be displayed here</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg space-y-3">
                          <h3 className="font-medium">Scaling Characteristics</h3>
                          <p className="text-sm text-muted-foreground">
                            MapReduce demonstrates near-linear scaling for embarrassingly parallel problems, where processing can be divided into independent tasks. As more nodes are added, processing time decreases proportionally, with some overhead for coordination.
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Processing Time</span>
                              <span>100%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
                            </div>
                            <div className="text-xs text-right">2 Nodes</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Processing Time</span>
                              <span>60%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
                            </div>
                            <div className="text-xs text-right">4 Nodes</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Processing Time</span>
                              <span>35%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "35%" }}></div>
                            </div>
                            <div className="text-xs text-right">8 Nodes</div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg space-y-3">
                          <h3 className="font-medium">Bottlenecks and Optimizations</h3>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                            <li>
                              <span className="font-medium">Data Skew:</span> When certain keys have significantly more values, causing uneven load distribution
                            </li>
                            <li>
                              <span className="font-medium">Network Bandwidth:</span> Shuffle phase can create significant network traffic when moving data between nodes
                            </li>
                            <li>
                              <span className="font-medium">Disk I/O:</span> Reading from and writing to disk can become a bottleneck for data-intensive operations
                            </li>
                            <li>
                              <span className="font-medium">Combiners:</span> Performing local aggregation before the shuffle phase to reduce data transfer
                            </li>
                            <li>
                              <span className="font-medium">Partitioning Strategies:</span> Custom partitioners can ensure better data distribution
                            </li>
                          </ul>
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
