
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Domain-specific data
const domains = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Patient data analysis, disease prediction, and treatment optimization",
    stages: [
      {
        name: "Data Collection",
        description: "Gathering electronic health records (EHR), wearable device data, and clinical trial results",
        icon: "🏥"
      },
      {
        name: "Data Cleaning",
        description: "Standardizing medical codes, handling missing values, and anonymizing patient data",
        icon: "🧹"
      },
      {
        name: "Feature Engineering",
        description: "Extracting biomarkers, temporal patterns, and patient risk factors",
        icon: "⚙️"
      },
      {
        name: "Model Development",
        description: "Building predictive models for diagnosis, readmission risk, and treatment response",
        icon: "🧠"
      },
      {
        name: "Deployment",
        description: "Integrating models into clinical decision support systems and patient monitoring tools",
        icon: "🚀"
      }
    ],
    caseStudy: {
      title: "Predicting Hospital Readmissions",
      outcome: "Reduced 30-day readmission rates by 18% through early intervention",
      metrics: ["93% prediction accuracy", "$2.3M annual savings", "Improved patient satisfaction scores"]
    },
    color: "from-data-blue to-data-purple"
  },
  {
    id: "finance",
    name: "Finance",
    description: "Risk assessment, fraud detection, and algorithmic trading strategies",
    stages: [
      {
        name: "Data Acquisition",
        description: "Collecting market data, transaction history, and economic indicators",
        icon: "💹"
      },
      {
        name: "Data Preprocessing",
        description: "Handling time series data, normalizing financial metrics, and detecting anomalies",
        icon: "📊"
      },
      {
        name: "Model Selection",
        description: "Developing time series models, risk assessment algorithms, and market prediction systems",
        icon: "📈"
      },
      {
        name: "Backtesting",
        description: "Validating models against historical data and stress testing scenarios",
        icon: "🧪"
      },
      {
        name: "Production",
        description: "Implementing real-time trading systems and continuous model retraining pipelines",
        icon: "🏦"
      }
    ],
    caseStudy: {
      title: "Credit Card Fraud Detection",
      outcome: "Identified 97% of fraudulent transactions with minimal false positives",
      metrics: ["$4.2M fraud prevented annually", "Real-time detection <0.3 seconds", "99.7% legitimate transaction approval"]
    },
    color: "from-data-purple to-data-pink"
  },
  {
    id: "retail",
    name: "Retail",
    description: "Inventory optimization, customer segmentation, and personalized recommendations",
    stages: [
      {
        name: "Data Collection",
        description: "Gathering sales data, customer behavior, inventory levels, and market trends",
        icon: "🛒"
      },
      {
        name: "Data Integration",
        description: "Combining online and offline customer touchpoints and transaction records",
        icon: "🔄"
      },
      {
        name: "Customer Analytics",
        description: "Segmenting customers, analyzing purchasing patterns, and predicting churn",
        icon: "👥"
      },
      {
        name: "Inventory Modeling",
        description: "Optimizing stock levels, predicting demand, and planning seasonal adjustments",
        icon: "📦"
      },
      {
        name: "Channel Optimization",
        description: "Allocating marketing resources and personalizing customer experiences",
        icon: "📱"
      }
    ],
    caseStudy: {
      title: "Personalized Product Recommendations",
      outcome: "Increased average order value by 24% through targeted suggestions",
      metrics: ["32% higher engagement", "18% reduction in cart abandonment", "3.5x ROI on recommendation system"]
    },
    color: "from-data-pink to-data-orange"
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Route optimization, predictive maintenance, and demand forecasting",
    stages: [
      {
        name: "Data Collection",
        description: "Gathering GPS tracking, sensor readings, traffic patterns, and weather conditions",
        icon: "🚗"
      },
      {
        name: "Data Processing",
        description: "Cleaning geospatial data, correcting sensor errors, and handling streaming inputs",
        icon: "🗺️"
      },
      {
        name: "Pattern Recognition",
        description: "Identifying traffic patterns, maintenance needs, and utilization trends",
        icon: "🔍"
      },
      {
        name: "Route Optimization",
        description: "Developing algorithms for efficient routing, scheduling, and resource allocation",
        icon: "🛣️"
      },
      {
        name: "Predictive Systems",
        description: "Implementing predictive maintenance, demand forecasting, and real-time adjustment systems",
        icon: "⏱️"
      }
    ],
    caseStudy: {
      title: "Fleet Maintenance Optimization",
      outcome: "Reduced vehicle downtime by 37% through predictive maintenance",
      metrics: ["42% reduction in major repairs", "$1.8M maintenance cost savings", "98.2% service reliability"]
    },
    color: "from-data-green to-data-teal"
  }
];

export default function Introduction() {
  const [selectedDomain, setSelectedDomain] = useState("healthcare");
  const activeDomain = domains.find(domain => domain.id === selectedDomain);

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 1
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Introduction to Data Science
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore how data science workflows vary across different industries, from healthcare to finance to retail.
              </p>
            </div>
            
            {/* Domain selector */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Domain-Specific Data Science Pipeline Explorer</h2>
              <p className="text-muted-foreground">
                Select an industry to visualize its unique data science workflow and explore real-world applications.
              </p>
              
              <div className="w-full max-w-xs">
                <Select 
                  value={selectedDomain} 
                  onValueChange={setSelectedDomain}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
            
            {activeDomain && (
              <div className="space-y-8">
                {/* Domain overview */}
                <Card className={`p-6 bg-gradient-to-br ${activeDomain.color}/10`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${activeDomain.color} flex items-center justify-center text-white text-xl`}>
                        {activeDomain.id === "healthcare" && "🏥"}
                        {activeDomain.id === "finance" && "💹"}
                        {activeDomain.id === "retail" && "🛒"}
                        {activeDomain.id === "transportation" && "🚗"}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{activeDomain.name}</h3>
                        <p className="text-muted-foreground">{activeDomain.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Pipeline visualization */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Data Science Pipeline</h3>
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2" />
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                      {activeDomain.stages.map((stage, index) => (
                        <Card 
                          key={index}
                          className="p-4 z-10 bg-background flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1"
                        >
                          <div className="text-2xl mb-2">{stage.icon}</div>
                          <h4 className="font-medium">{stage.name}</h4>
                          <p className="text-xs text-muted-foreground mt-2">{stage.description}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Case study */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Case Study</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold">{activeDomain.caseStudy.title}</h4>
                      <p className="italic">{activeDomain.caseStudy.outcome}</p>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">Key Metrics</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {activeDomain.caseStudy.metrics.map((metric, index) => (
                            <div 
                              key={index}
                              className={`rounded-lg p-3 bg-gradient-to-br ${activeDomain.color}/10 text-center`}
                            >
                              <span className="text-sm font-medium">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Tabs for different content */}
                <Tabs defaultValue="visualization">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
                    <TabsTrigger value="tools">Industry Tools</TabsTrigger>
                    <TabsTrigger value="challenges">Common Challenges</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visualization" className="pt-4">
                    <Card className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold">Common Visualizations in {activeDomain.name}</h3>
                        <p className="text-muted-foreground">
                          Visualization placeholder for {activeDomain.name} domain - this will be replaced with actual charts and graphs specific to the domain.
                        </p>
                        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">3D Visualization Preview</p>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="tools" className="pt-4">
                    <Card className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold">Specialized Tools for {activeDomain.name}</h3>
                        <p className="text-muted-foreground">
                          Tools and technologies commonly used in the {activeDomain.name.toLowerCase()} industry for data science applications.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map((item) => (
                            <div 
                              key={item}
                              className="border rounded-lg p-4 text-center"
                            >
                              <div className="text-2xl mb-2">🔧</div>
                              <h4 className="text-sm font-medium">Tool {item}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="challenges" className="pt-4">
                    <Card className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold">Challenges in {activeDomain.name} Data Science</h3>
                        <p className="text-muted-foreground">
                          Common obstacles and considerations when implementing data science solutions in the {activeDomain.name.toLowerCase()} sector.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary mt-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>Challenge 1 specific to {activeDomain.name.toLowerCase()} industry</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary mt-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>Challenge 2 specific to {activeDomain.name.toLowerCase()} industry</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary mt-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>Challenge 3 specific to {activeDomain.name.toLowerCase()} industry</span>
                          </li>
                        </ul>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
