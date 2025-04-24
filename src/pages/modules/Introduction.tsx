import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealWorldDemo } from "@/components/RealWorldDemo";

interface Domain {
  name: string;
  icon: string;
  color: string;
  description: string;
  steps: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export default function Introduction() {
  const [selectedDomain, setSelectedDomain] = useState<string>("healthcare");
  const [showRealWorld, setShowRealWorld] = useState<boolean>(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const domains: Record<string, Domain> = {
    healthcare: {
      name: "Healthcare",
      icon: "🏥",
      color: "from-blue-500/20 to-cyan-400/20 border-blue-500/30",
      description: "Healthcare data science focuses on patient outcomes, treatment optimization, and operational efficiency in medical facilities.",
      steps: [
        {
          title: "Data Collection",
          description: "Gather patient records, treatment outcomes, medical images, and sensor data from medical devices.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          )
        },
        {
          title: "Data Cleaning",
          description: "Handle missing values in patient records, remove duplicates, and standardize medical terminology.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          )
        },
        {
          title: "Exploratory Analysis",
          description: "Identify patterns in disease progression, correlate patient demographics with outcomes, and visualize treatment efficacy.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          )
        },
        {
          title: "Modeling",
          description: "Build predictive models for disease diagnosis, treatment response prediction, and patient readmission risk assessment.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          title: "Evaluation",
          description: "Assess model performance on patient outcomes, treatment success rates, and operational efficiency metrics.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )
        },
        {
          title: "Deployment",
          description: "Implement decision support systems for clinicians, automated diagnostic tools, and patient monitoring systems.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    },
    finance: {
      name: "Finance",
      icon: "💰",
      color: "from-green-500/20 to-emerald-400/20 border-green-500/30",
      description: "Financial data science involves risk assessment, fraud detection, algorithmic trading, and customer segmentation for targeted services.",
      steps: [
        {
          title: "Data Collection",
          description: "Gather market data, transaction records, customer profiles, and economic indicators from various financial systems.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          )
        },
        {
          title: "Data Cleaning",
          description: "Handle outliers in financial time series, normalize currency values, and address data gaps during market closures.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          )
        },
        {
          title: "Exploratory Analysis",
          description: "Identify patterns in market movements, correlate economic indicators with asset performance, and visualize customer spending behavior.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          )
        },
        {
          title: "Modeling",
          description: "Build predictive models for credit risk assessment, fraud detection, stock price prediction, and customer churn analysis.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          title: "Evaluation",
          description: "Assess model performance on risk reduction, fraud detection accuracy, trading returns, and customer retention metrics.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )
        },
        {
          title: "Deployment",
          description: "Implement fraud detection systems, automated trading algorithms, credit scoring engines, and personalized financial recommendation tools.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    },
    retail: {
      name: "Retail",
      icon: "🛒",
      color: "from-purple-500/20 to-indigo-400/20 border-purple-500/30",
      description: "Retail data science enhances customer experiences, optimizes inventory, personalizes marketing, and streamlines supply chains.",
      steps: [
        {
          title: "Data Collection",
          description: "Gather customer purchase history, inventory levels, store traffic patterns, and marketing campaign data.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          )
        },
        {
          title: "Data Cleaning",
          description: "Handle seasonal sales variations, normalize across store locations, and address missing inventory data.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          )
        },
        {
          title: "Exploratory Analysis",
          description: "Identify product affinity patterns, correlate store layouts with sales, and visualize customer purchasing journeys.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          )
        },
        {
          title: "Modeling",
          description: "Build predictive models for demand forecasting, customer segmentation, churn prediction, and personalized recommendations.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          title: "Evaluation",
          description: "Assess model performance on inventory turnover, marketing campaign ROI, customer lifetime value, and sales prediction accuracy.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )
        },
        {
          title: "Deployment",
          description: "Implement recommendation engines, dynamic pricing systems, inventory management tools, and personalized marketing automation.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    },
    transportation: {
      name: "Transportation",
      icon: "🚗",
      color: "from-amber-500/20 to-orange-400/20 border-amber-500/30",
      description: "Transportation data science optimizes routes, predicts maintenance needs, improves safety, and enhances passenger experiences.",
      steps: [
        {
          title: "Data Collection",
          description: "Gather GPS tracking data, vehicle sensor telemetry, traffic patterns, maintenance records, and passenger feedback.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          )
        },
        {
          title: "Data Cleaning",
          description: "Handle GPS signal drops, normalize across vehicle types, and address seasonal traffic variations.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          )
        },
        {
          title: "Exploratory Analysis",
          description: "Identify congestion patterns, correlate maintenance schedules with failures, and visualize passenger journey bottlenecks.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          )
        },
        {
          title: "Modeling",
          description: "Build predictive models for route optimization, predictive maintenance, demand forecasting, and accident risk assessment.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          title: "Evaluation",
          description: "Assess model performance on fuel efficiency, maintenance cost reduction, route optimization, and passenger satisfaction.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )
        },
        {
          title: "Deployment",
          description: "Implement real-time routing systems, predictive maintenance alerts, dynamic scheduling tools, and safety monitoring platforms.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    }
  };
  
  const quizQuestions = [
    {
      id: "q1",
      question: "Which of the following is NOT typically part of the data science pipeline?",
      options: [
        "Data collection and integration",
        "Exploratory data analysis",
        "Database server maintenance",
        "Model evaluation and deployment"
      ],
      correctAnswer: "Database server maintenance"
    },
    {
      id: "q2",
      question: "In healthcare data science, what is a common application?",
      options: [
        "Real-time traffic optimization",
        "Predictive maintenance for equipment",
        "Disease diagnosis and prediction",
        "Inventory management"
      ],
      correctAnswer: "Disease diagnosis and prediction"
    },
    {
      id: "q3",
      question: "Which domain would most likely use data science for 'market basket analysis'?",
      options: [
        "Healthcare",
        "Transportation",
        "Retail",
        "Finance"
      ],
      correctAnswer: "Retail"
    }
  ];
  
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };
  
  const getQuizScore = () => {
    if (!quizSubmitted) return null;
    
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    
    return {
      score,
      total: quizQuestions.length,
      percentage: Math.round((score / quizQuestions.length) * 100)
    };
  };
  
  const score = getQuizScore();

  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-data-blue/10 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gradient-to-tr from-data-purple/5 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 border border-data-teal/10 rounded-full -z-10 animate-pulse-gentle"></div>
        
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 1
              </div>
              <h1 className="text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink">
                Introduction to Data Science
              </h1>
              <p className="text-xl text-muted-foreground">
                Domain-specific data science pipeline explorer with interactive visualizations
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button 
                  variant={showRealWorld ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setShowRealWorld(!showRealWorld)}
                >
                  {showRealWorld ? "Hide Real-world Demo" : "Show Real-world Demo"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </Button>
                <Button 
                  variant={isQuizActive ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setIsQuizActive(!isQuizActive)}
                >
                  {isQuizActive ? "Hide Quiz" : "Test Your Knowledge"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </Button>
              </div>
            </div>
            
            {showRealWorld && (
              <div className="my-8 animate-fade-in">
                <RealWorldDemo module="Urban Mobility" />
              </div>
            )}
            
            {isQuizActive && (
              <Card className="p-6 border-primary/10 backdrop-blur-sm animate-scale-in">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Module 1 Quiz</h3>
                    {score && (
                      <Badge variant={score.percentage >= 70 ? "default" : "destructive"} className="text-sm py-1 px-3">
                        Score: {score.score}/{score.total} ({score.percentage}%)
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {quizQuestions.map((q, index) => (
                      <div key={q.id} className="space-y-3">
                        <h4 className="font-medium">
                          {index + 1}. {q.question}
                        </h4>
                        <div className="space-y-2">
                          {q.options.map((option) => (
                            <div 
                              key={option} 
                              className={`p-3 border rounded-lg cursor-pointer ${
                                quizSubmitted 
                                  ? quizAnswers[q.id] === option 
                                    ? option === q.correctAnswer 
                                      ? "bg-green-500/20 border-green-500/30" 
                                      : "bg-red-500/20 border-red-500/30"
                                    : option === q.correctAnswer 
                                      ? "bg-green-500/20 border-green-500/30" 
                                      : "bg-background border-muted"
                                  : quizAnswers[q.id] === option 
                                    ? "bg-primary/20 border-primary/30" 
                                    : "bg-background hover:bg-primary/5 border-muted"
                              }`}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setQuizAnswers({...quizAnswers, [q.id]: option});
                                }
                              }}
                            >
                              {option}
                              
                              {quizSubmitted && option === q.correctAnswer && (
                                <span className="inline-block ml-2 text-green-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {!quizSubmitted ? (
                    <Button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < quizQuestions.length}>
                      Submit Answers
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}>
                      Retry Quiz
                    </Button>
                  )}
                </div>
              </Card>
            )}
            
            <Card className="p-6 border-primary/10 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Domain-Specific Data Science Pipeline</h2>
                  <p className="text-muted-foreground">
                    Select a domain to explore how the data science workflow is tailored to specific industry requirements
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(domains).map(([id, domain]) => (
                    <div
                      key={id}
                      onClick={() => setSelectedDomain(id)}
                      className={`border p-4 rounded-lg cursor-pointer transition-all bg-gradient-to-br ${
                        selectedDomain === id 
                          ? domain.color + " shadow-md" 
                          : "border-muted bg-secondary/5 hover:bg-secondary/10"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{domain.icon}</div>
                        <h3 className="font-medium">{domain.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <div className="p-4 border rounded-lg mb-6 bg-secondary/5">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{domains[selectedDomain].icon}</div>
                      <div>
                        <h3 className="font-bold">{domains[selectedDomain].name} Data Science</h3>
                        <p className="text-sm text-muted-foreground">
                          {domains[selectedDomain].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute top-12 left-6 w-[calc(100%-48px)] h-0.5 bg-gradient-to-r from-data-blue via-data-purple to-data-pink rounded-full"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
                      {domains[selectedDomain].steps.map((step, index) => (
                        <div key={index} className="relative">
                          <div className="h-6 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-primary z-10"></div>
                          </div>
                          <Card className="p-4 mt-4 h-full bg-gradient-to-b from-background to-secondary/5 border-primary/10">
                            <div className="space-y-3">
                              <div className="text-primary">
                                {step.icon}
                              </div>
                              <h4 className="font-medium">{step.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-secondary/10 mt-8">
                  <h3 className="font-medium mb-3">Domain-Specific Insights</h3>
                  
                  <div className="space-y-4">
                    <Tabs defaultValue="challenges" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="challenges">Unique Challenges</TabsTrigger>
                        <TabsTrigger value="techniques">Key Techniques</TabsTrigger>
                        <TabsTrigger value="outcomes">Expected Outcomes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="challenges" className="space-y-4">
                        {selectedDomain === "healthcare" && (
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Patient data privacy and HIPAA compliance requirements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Highly heterogeneous data (images, text, numerical readings)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Critical decision-making with direct impact on patient outcomes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Complex, multi-system integration across different medical systems</span>
                            </li>
                          </ul>
                        )}
                        
                        {selectedDomain === "finance" && (
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Extremely high data volume with real-time processing requirements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Strict regulatory compliance (KYC, AML, financial reporting)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Adversarial environments (fraud detection, algorithmic trading)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Highly sensitive to external factors (market news, economic indicators)</span>
                            </li>
                          </ul>
                        )}
                        
                        {selectedDomain === "retail" && (
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                                <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.81l-3.5-1.6"/>
                              </svg>
                              <span>Strong seasonal variability requiring adjusted modeling</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 
