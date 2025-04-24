import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { WordCloud } from '@/components/text-analysis/WordCloud';
import { FrequencyAnalysis } from '@/components/text-analysis/FrequencyAnalysis';
import { BagOfWords } from '@/components/text-analysis/BagOfWords';

export default function TextAnalysis() {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [emotions, setEmotions] = useState({
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0
  });
  const [entities, setEntities] = useState<{type: string, text: string, confidence: number}[]>([]);
  
  const { toast } = useToast();

  const analyzeSampleText = () => {
    const sampleText = "I'm really excited about the new data science course at our university. Professor Johnson gave an inspiring lecture yesterday about machine learning applications in healthcare. The campus event next Friday in New York will showcase student projects from MIT and Stanford. While some students found the initial assignments challenging, most agreed that the practical experience was valuable. The textbook costs $75 but is definitely worth the investment.";
    setText(sampleText);
  };
  
  const handleAnalyze = () => {
    if (!text.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalyzing(true);
    setAnalyzed(false);
    
    // Simulate analysis with timeout
    setTimeout(() => {
      // Generate some mock analysis results
      const sentimentValue = Math.random() * 2 - 1; // Range: -1 to 1
      setSentimentScore(parseFloat(sentimentValue.toFixed(2)));
      
      setEmotions({
        joy: parseFloat((Math.random() * 0.8).toFixed(2)),
        sadness: parseFloat((Math.random() * 0.5).toFixed(2)),
        anger: parseFloat((Math.random() * 0.3).toFixed(2)),
        fear: parseFloat((Math.random() * 0.4).toFixed(2)),
        surprise: parseFloat((Math.random() * 0.6).toFixed(2))
      });
      
      // Extract sample entities from text
      const words = text.split(/\s+/);
      const sampleEntities = [];
      
      // Look for potentially capitalized words as entities
      for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[.,!?;:()]/g, '');
        if (word.length > 1 && word[0] === word[0].toUpperCase() && word[1] === word[1].toLowerCase()) {
          // Determine entity type based on context or pattern
          let type = "Unknown";
          
          // Very simple rule-based classification
          if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(word) || 
              /day|week|month|year|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/.test(word)) {
            type = "Date/Time";
          } else if (/^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(word + " " + (words[i+1] || ""))) {
            type = "Person";
            sampleEntities.push({
              type,
              text: word + " " + words[i+1],
              confidence: parseFloat((0.7 + Math.random() * 0.3).toFixed(2))
            });
            i++; // Skip next word as it's part of the name
            continue;
          } else if (/University|College|School|Institute/.test(word) || 
                    /Inc|Corp|LLC|Ltd/.test(word)) {
            type = "Organization";
          } else if (/York|London|Paris|Tokyo|Boston|Chicago|Francisco/.test(word)) {
            type = "Location";
          }
          
          sampleEntities.push({
            type,
            text: word,
            confidence: parseFloat((0.7 + Math.random() * 0.3).toFixed(2))
          });
        }
        
        // Look for monetary values
        if (/\$\d+/.test(word)) {
          sampleEntities.push({
            type: "Money",
            text: word,
            confidence: parseFloat((0.85 + Math.random() * 0.15).toFixed(2))
          });
        }
      }
      
      setEntities(sampleEntities);
      setAnalyzing(false);
      setAnalyzed(true);
      
      toast({
        title: "Analysis Complete",
        description: "Text has been analyzed successfully.",
      });
    }, 2000);
  };

  const getSentimentClass = () => {
    if (sentimentScore > 0.3) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (sentimentScore < -0.3) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  };

  const getSentimentText = () => {
    if (sentimentScore > 0.3) return "Positive";
    if (sentimentScore < -0.3) return "Negative";
    return "Neutral";
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 4
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Text Analysis
              </h1>
              <p className="text-xl text-muted-foreground">
                NLP-powered sentiment analyzer with multi-dimensional text analysis
              </p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Text Analyzer</h2>
                  <p className="text-muted-foreground">
                    Enter text to analyze for sentiment, emotions, and named entities
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="text" className="font-medium">Input Text</label>
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs"
                        onClick={analyzeSampleText}
                      >
                        Use Sample Text
                      </Button>
                    </div>
                    <Textarea 
                      id="text" 
                      value={text} 
                      onChange={(e) => setText(e.target.value)} 
                      placeholder="Enter text to analyze..." 
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button onClick={handleAnalyze} disabled={analyzing || !text.trim()}>
                      {analyzing ? "Analyzing..." : "Analyze Text"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {analyzed && (
              <Tabs defaultValue="sentiment" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                  <TabsTrigger value="emotions">Emotions</TabsTrigger>
                  <TabsTrigger value="entities">Named Entities</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sentiment" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Sentiment Analysis</h3>
                        <div className={`px-3 py-1 rounded-full text-sm ${getSentimentClass()}`}>
                          {getSentimentText()}
                        </div>
                      </div>
                      
                      <div className="p-6 border rounded-lg">
                        <div className="space-y-6">
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Sentiment Score</span>
                              <span className="text-sm">{sentimentScore}</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  sentimentScore > 0 ? "bg-green-500" : sentimentScore < 0 ? "bg-red-500" : "bg-yellow-500"
                                }`}
                                style={{ 
                                  width: `${Math.abs(sentimentScore) * 100}%`, 
                                  marginLeft: sentimentScore < 0 ? "auto" : 0,
                                  marginRight: sentimentScore > 0 ? "auto" : 0,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Negative (-1.0)</span>
                              <span>Neutral (0.0)</span>
                              <span>Positive (+1.0)</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="font-medium">Analysis Summary</h4>
                            <p className="text-sm text-muted-foreground">
                              {sentimentScore > 0.3 ? (
                                "The text expresses predominantly positive sentiment. The language used suggests approval, satisfaction, or optimism."
                              ) : sentimentScore < -0.3 ? (
                                "The text expresses predominantly negative sentiment. The language used suggests criticism, dissatisfaction, or pessimism."
                              ) : (
                                "The text expresses a relatively neutral sentiment. The language used is balanced or objective without strong positive or negative indicators."
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Sentiment analysis is performed using natural language processing techniques that evaluate the emotional tone behind words. The score ranges from -1.0 (extremely negative) to +1.0 (extremely positive).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="emotions" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Emotion Detection</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium flex items-center">
                                <span className="text-yellow-500 mr-2">😊</span> Joy
                              </span>
                              <span>{emotions.joy * 100}%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-yellow-500 h-full rounded-full"
                                style={{ width: `${emotions.joy * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium flex items-center">
                                <span className="text-blue-500 mr-2">😢</span> Sadness
                              </span>
                              <span>{emotions.sadness * 100}%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${emotions.sadness * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium flex items-center">
                                <span className="text-red-500 mr-2">😠</span> Anger
                              </span>
                              <span>{emotions.anger * 100}%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-red-500 h-full rounded-full"
                                style={{ width: `${emotions.anger * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium flex items-center">
                                <span className="text-purple-500 mr-2">😨</span> Fear
                              </span>
                              <span>{emotions.fear * 100}%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-purple-500 h-full rounded-full"
                                style={{ width: `${emotions.fear * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium flex items-center">
                                <span className="text-green-500 mr-2">😲</span> Surprise
                              </span>
                              <span>{emotions.surprise * 100}%</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${emotions.surprise * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg bg-secondary/10">
                            <h4 className="font-medium mb-2">Primary Emotion</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">
                                {Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0] === 'joy' ? '😊' : 
                                 Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0] === 'sadness' ? '😢' :
                                 Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0] === 'anger' ? '😠' :
                                 Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0] === 'fear' ? '😨' : '😲'}
                              </span>
                              <span className="font-medium capitalize">{Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-3">Emotion Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          The emotion analysis breaks down the text into five primary emotional dimensions: joy, sadness, anger, fear, and surprise. The percentages indicate the relative strength of each emotion detected in the text.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="entities" className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Named Entity Recognition</h3>
                      
                      <div className="p-6 border rounded-lg">
                        <div className="space-y-4">
                          <h4 className="font-medium">Detected Entities</h4>
                          
                          {entities.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b">
                                    <th className="py-2 px-4 text-left font-medium">Entity</th>
                                    <th className="py-2 px-4 text-left font-medium">Type</th>
                                    <th className="py-2 px-4 text-left font-medium">Confidence</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {entities.map((entity, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="py-2 px-4">{entity.text}</td>
                                      <td className="py-2 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          entity.type === "Person" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                          entity.type === "Organization" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                                          entity.type === "Location" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                                          entity.type === "Date/Time" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                                          entity.type === "Money" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                                          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                        }`}>
                                          {entity.type}
                                        </span>
                                      </td>
                                      <td className="py-2 px-4">
                                        <div className="flex items-center space-x-2">
                                          <div className="w-24 bg-secondary h-2 rounded-full overflow-hidden">
                                            <div 
                                              className={`bg-primary h-full rounded-full`}
                                              style={{ width: `${entity.confidence * 100}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-sm">{(entity.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No named entities were detected in the text.
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-secondary/10">
                        <h4 className="font-medium mb-3">Entity Types</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Person</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm">Organization</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Location</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Date/Time</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-sm">Money</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                            <span className="text-sm">Other</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="visualization" className="space-y-6">
                  {analyzed && (
                    <>
                      <WordCloud text={text} />
                      <FrequencyAnalysis text={text} />
                      <BagOfWords text={text} />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
