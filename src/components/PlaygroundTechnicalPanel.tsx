
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface TechnicalPanelProps {
  module: 'introduction' | 'largeScaleData' | 'dataManipulation' | 'textAnalysis' | 'dataStreams' | 'advancedAnalysis';
}

export const PlaygroundTechnicalPanel: React.FC<TechnicalPanelProps> = ({ module }) => {
  const [activeTab, setActiveTab] = useState<string>("pseudocode");

  // Define technical content based on module type
  const technicalContent = {
    introduction: {
      pseudocode: `function exploreDomain(domain):
  data = collectData(domain)
  cleanedData = preprocess(data)
  patterns = performEDA(cleanedData)
  
  if domain == "healthcare":
    return analyzePatientOutcomes(patterns)
  else if domain == "finance":
    return analyzeRiskPatterns(patterns)
  else if domain == "retail":
    return analyzeCustomerBehavior(patterns)
  else if domain == "transportation":
    return analyzeRouteEfficiency(patterns)
  
  return visualizeInsights(patterns)`,
      mathematics: `
Domain-specific analysis can be formalized as:

$$f_{domain}(D) = \\sum_{i=1}^{n} w_i \\times feature_i(D)$$

Where:
- $D$ represents the dataset
- $feature_i$ are domain-specific extracted features
- $w_i$ are importance weights for each feature
- $n$ is the number of relevant features for the domain

For clustering of domain entities:
$$J = \\sum_{j=1}^{k} \\sum_{i \\in C_j} ||x_i - \\mu_j||^2$$`,
      references: [
        {
          title: "The Data Science Handbook",
          authors: "Field Cady",
          year: 2023,
          link: "https://www.oreilly.com/library/view/the-data-science/9781119092940/"
        },
        {
          title: "Industry-specific Applications of Data Science",
          authors: "Journal of Data Science",
          year: 2022,
          link: "https://jds.org/industry-applications"
        },
        {
          title: "Domain Knowledge in Data Science",
          authors: "Smith et al.",
          year: 2021,
          link: "https://arxiv.org/abs/2103.12345"
        }
      ]
    },
    dataManipulation: {
      pseudocode: `function mapReduce(data, mapFn, reduceFn):
  // Map phase - apply function to each data element
  mappedValues = []
  for item in data:
    mappedValues.extend(mapFn(item))
  
  // Shuffle phase - group by key
  shuffled = {}
  for key, value in mappedValues:
    if key not in shuffled:
      shuffled[key] = []
    shuffled[key].append(value)
  
  // Reduce phase - aggregate values for each key
  results = {}
  for key, values in shuffled.items():
    results[key] = reduceFn(key, values)
    
  return results
  
// Example usage for word count
function map(document):
  results = []
  for word in document.split():
    results.append((word, 1))
  return results

function reduce(key, values):
  return sum(values)`,
      mathematics: `
For MapReduce with $N$ nodes processing data $D$:

1. **Map Function:**
   $$map: (k_1, v_1) \\rightarrow list(k_2, v_2)$$

2. **Shuffle:**
   Group values by keys $k_2$

3. **Reduce Function:**
   $$reduce: (k_2, list(v_2)) \\rightarrow list(v_3)$$

4. **Speedup (ideal):**
   $$S(N) = \\frac{T_1}{T_N} \\approx N$$
   
   Where $T_1$ is single-node time, $T_N$ is $N$-node time

5. **Amdahl's Law (practical speedup):**
   $$S(N) = \\frac{1}{(1-p) + \\frac{p}{N}}$$
   
   Where $p$ is the proportion of parallelizable code`,
      references: [
        {
          title: "MapReduce: Simplified Data Processing on Large Clusters",
          authors: "Dean & Ghemawat (Google)",
          year: 2004,
          link: "https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/"
        },
        {
          title: "Hadoop: The Definitive Guide",
          authors: "Tom White",
          year: 2021,
          link: "https://www.oreilly.com/library/view/hadoop-the-definitive/9781491901687/"
        },
        {
          title: "Distributed Algorithms for MapReduce",
          authors: "Chen et al.",
          year: 2019,
          link: "https://dl.acm.org/doi/10.1145/3341161"
        }
      ]
    },
    textAnalysis: {
      pseudocode: `function analyzeSentiment(text):
  tokens = tokenize(text)
  tokens = removeStopwords(tokens)
  
  // Calculate sentiment score
  score = 0
  for token in tokens:
    if token in positiveWords:
      score += 1
    if token in negativeWords:
      score -= 1
  
  // Normalize score
  score = score / len(tokens)
  
  // Determine sentiment category
  if score > 0.2:
    return "Positive"
  elif score < -0.2:
    return "Negative"
  else:
    return "Neutral"
    
function extractEntities(text):
  entities = []
  for span in tokenize(text):
    if isCapitalized(span):
      if isInGazetteer(span, "PERSON"):
        entities.append((span, "PERSON"))
      elif isInGazetteer(span, "LOCATION"):
        entities.append((span, "LOCATION"))
      elif isInGazetteer(span, "ORGANIZATION"):
        entities.append((span, "ORGANIZATION"))
  return entities`,
      mathematics: `
For sentiment analysis using a lexicon-based approach:

$$Sentiment(d) = \\frac{\\sum_{t \\in d} s(t) \\times w_t}{\\sum_{t \\in d} w_t}$$

Where:
- $d$ is the document
- $t$ are terms in the document
- $s(t)$ is the sentiment score of term $t$
- $w_t$ is the weight of term $t$ (often 1)

For TF-IDF based importance:

$$tfidf(t, d, D) = tf(t, d) \\times idf(t, D)$$

$$tf(t, d) = \\frac{\\text{count of term $t$ in doc $d$}}{\\text{total terms in $d$}}$$

$$idf(t, D) = \\log\\frac{\\text{total docs in corpus $D$}}{\\text{docs containing term $t$}}$$`,
      references: [
        {
          title: "Natural Language Processing with Python",
          authors: "Bird, Klein & Loper",
          year: 2019,
          link: "https://www.nltk.org/book/"
        },
        {
          title: "Foundations of Statistical Natural Language Processing",
          authors: "Manning & Schütze",
          year: 1999,
          link: "https://nlp.stanford.edu/fsnlp/"
        },
        {
          title: "Sentiment Analysis: Mining Opinions, Sentiments, and Emotions",
          authors: "Bing Liu",
          year: 2020,
          link: "https://www.cambridge.org/core/books/sentiment-analysis/4BA9EDE4A039A86BF7F41FEDDA19877C"
        }
      ]
    },
    dataStreams: {
      pseudocode: `function reservoirSampling(stream, k):
  // Initialize the reservoir with the first k items
  reservoir = stream.read(k)
  
  // Process the remaining items
  n = k
  for item in stream:
    n += 1
    // Randomly decide whether to include this item in the reservoir
    j = random(0, n)
    if j < k:
      reservoir[j] = item
  
  return reservoir

function flajoletMartinDistinctCount(stream):
  max_trailing_zeros = 0
  
  for item in stream:
    hash_value = hash(item)
    binary_hash = toBinary(hash_value)
    trailing_zeros = countTrailingZeros(binary_hash)
    max_trailing_zeros = max(max_trailing_zeros, trailing_zeros)
  
  // Estimate distinct count
  return 2 ** max_trailing_zeros`,
      mathematics: `
For Reservoir Sampling with reservoir size $k$ and stream length $n$:

Probability of any item being in the final sample:
$$P(\\text{item $i$ is selected}) = \\frac{k}{n}$$

For Flajolet-Martin Algorithm:

Given $R_{max}$ (maximum number of trailing zeros):
$$Estimated\\:Count = 2^{R_{max}} \\times \\phi$$

Where $\\phi \\approx 0.77351$ is a correction factor.

For Sliding Window analysis:
$$MA_t = \\frac{1}{w}\\sum_{i=0}^{w-1} x_{t-i}$$

Where:
- $MA_t$ is the moving average at time $t$
- $w$ is the window size
- $x_{t-i}$ is the value at time $t-i$`,
      references: [
        {
          title: "Mining of Massive Datasets",
          authors: "Leskovec, Rajaraman & Ullman",
          year: 2020,
          link: "http://www.mmds.org/"
        },
        {
          title: "Data Streams: Algorithms and Applications",
          authors: "Muthukrishnan",
          year: 2005,
          link: "https://dl.acm.org/doi/book/10.5555/1166409"
        },
        {
          title: "Stream Processing with Apache Flink",
          authors: "Hueske & Kalavri",
          year: 2019,
          link: "https://www.oreilly.com/library/view/stream-processing-with/9781491974285/"
        }
      ]
    },
    largeScaleData: {
      pseudocode: `function cleanDataset(dataset):
  // Handle missing values
  for column in dataset.columns:
    if column.type is numerical:
      fillMissingWith(column, mean(column))
    else:
      fillMissingWith(column, mode(column))
  
  // Remove outliers
  for column in dataset.numericColumns:
    q1 = percentile(column, 25)
    q3 = percentile(column, 75)
    iqr = q3 - q1
    lowerBound = q1 - 1.5 * iqr
    upperBound = q3 + 1.5 * iqr
    removeOutliers(column, lowerBound, upperBound)
  
  // Standardize formats
  for column in dataset.dateColumns:
    standardizeDateFormat(column, "YYYY-MM-DD")
  
  // Normalize numerical features
  for column in dataset.numericColumns:
    normalize(column)
  
  return dataset`,
      mathematics: `
For data quality metrics:

1. **Completeness:**
   $$Completeness = \\frac{\\text{non-null values}}{\\text{total values}} \\times 100\\%$$

2. **Accuracy (using reference data):**
   $$Accuracy = \\frac{\\text{correct values}}{\\text{total values}} \\times 100\\%$$

3. **Z-score for outlier detection:**
   $$z_i = \\frac{x_i - \\mu}{\\sigma}$$

4. **Standardization:**
   $$x_{standardized} = \\frac{x - \\mu}{\\sigma}$$

5. **Min-Max normalization:**
   $$x_{normalized} = \\frac{x - min(x)}{max(x) - min(x)}$$`,
      references: [
        {
          title: "Data Cleaning: Problems and Current Approaches",
          authors: "Rahm & Do",
          year: 2000,
          link: "https://dbs.uni-leipzig.de/file/Data_Cleaning_Problems_and_Current_Approaches.pdf"
        },
        {
          title: "Principles of Data Wrangling",
          authors: "Tye et al.",
          year: 2017,
          link: "https://www.oreilly.com/library/view/principles-of-data/9781491938911/"
        },
        {
          title: "Fundamentals of Data Engineering",
          authors: "Reis & Housley",
          year: 2022,
          link: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/"
        }
      ]
    },
    advancedAnalysis: {
      pseudocode: `function communityDetection(graph):
  communities = []
  unvisited = set(graph.nodes)
  
  while unvisited:
    node = pickRandomNode(unvisited)
    community = [node]
    neighbors = graph.neighbors(node)
    queue = deque(neighbors)
    
    while queue:
      current = queue.popleft()
      if modularity(community + [current]) > modularity(community):
        community.append(current)
        unvisited.remove(current)
        for neighbor in graph.neighbors(current):
          if neighbor in unvisited and neighbor not in queue:
            queue.append(neighbor)
    
    communities.append(community)
  
  return communities

function recommendItems(user, graph, similarityMetric):
  recommendations = []
  userItems = getUserItems(user, graph)
  
  for item in graph.items:
    if item not in userItems:
      score = 0
      for userItem in userItems:
        score += similarityMetric(item, userItem)
      recommendations.append((item, score / len(userItems)))
  
  return sortByScore(recommendations)`,
      mathematics: `
For graph metrics:

1. **Modularity:**
   $$Q = \\frac{1}{2m}\\sum_{ij}\\left[A_{ij} - \\frac{k_i k_j}{2m}\\right]\\delta(c_i, c_j)$$
   
   Where:
   - $A_{ij}$ is the adjacency matrix
   - $k_i$, $k_j$ are degrees of nodes $i$ and $j$
   - $m$ is the number of edges
   - $c_i$, $c_j$ are communities of nodes $i$ and $j$
   - $\\delta$ is the Kronecker delta function

2. **PageRank:**
   $$PR(u) = (1-d) + d \\sum_{v \\in B_u} \\frac{PR(v)}{L(v)}$$
   
   Where:
   - $B_u$ is the set of nodes pointing to $u$
   - $L(v)$ is the number of outlinks from node $v$
   - $d$ is the damping factor (typically 0.85)

3. **Item-Item Similarity (Cosine):**
   $$similarity(i,j) = \\frac{\\vec{i} \\cdot \\vec{j}}{||\\vec{i}|| \\times ||\\vec{j}||}$$`,
      references: [
        {
          title: "Mining of Massive Datasets - Chapter 10: Analysis of Social Networks",
          authors: "Leskovec, Rajaraman & Ullman",
          year: 2020,
          link: "http://www.mmds.org/"
        },
        {
          title: "Networks, Crowds, and Markets",
          authors: "Easley & Kleinberg",
          year: 2010,
          link: "https://www.cs.cornell.edu/home/kleinber/networks-book/"
        },
        {
          title: "Recommender Systems Handbook",
          authors: "Ricci et al.",
          year: 2022,
          link: "https://link.springer.com/book/10.1007/978-1-0716-2197-4"
        }
      ]
    }
  };

  const content = technicalContent[module] || technicalContent.introduction;

  return (
    <Card className="p-6 border-primary/10 bg-gradient-to-br from-background to-secondary/5 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M14.5 9.5 16 8" />
                <path d="m9.5 14.5-1.5 1.5" />
                <path d="M9.5 9.5 8 8" />
                <path d="m14.5 14.5 1.5 1.5" />
                <path d="M7 12h2" />
                <path d="M15 12h2" />
                <path d="M12 7v2" />
                <path d="M12 15v2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Technical Details</h3>
          </div>
          <Badge variant="outline" className="bg-primary/5 px-2 py-1 text-xs">For Advanced Users</Badge>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pseudocode" className="mt-4">
            <div className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{content.pseudocode}</pre>
            </div>
          </TabsContent>
          
          <TabsContent value="mathematics" className="mt-4">
            <div className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{content.mathematics}</pre>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Note: LaTeX equations should be rendered in a math typesetting environment. This is simplified ASCII representation.
            </p>
          </TabsContent>
          
          <TabsContent value="references" className="mt-4">
            <div className="space-y-4">
              <ul className="space-y-3">
                {content.references.map((ref, index) => (
                  <li key={index} className="text-sm">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <div>
                        <div className="font-medium">{ref.title}</div>
                        <div className="text-muted-foreground flex flex-col sm:flex-row sm:justify-between">
                          <span>{ref.authors}</span>
                          <span className="text-xs">({ref.year})</span>
                        </div>
                        <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                          View Resource
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              navigator.clipboard.writeText(content.pseudocode);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </Card>
  );
};
