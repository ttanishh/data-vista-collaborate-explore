
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileInput, Database, ChartBar, ChartLine, ChartPie, File, ArrowRight } from "lucide-react";

// Module data
const modules = [
  {
    id: "introduction",
    title: "Introduction to Data Science",
    description: "Explore domain-specific data science pipelines across industries with interactive visualizations showing how workflows vary across healthcare, finance, retail, and transportation.",
    color: "from-data-blue to-data-purple",
    icon: "📊",
    features: [
      "Domain-specific pipeline visualization",
      "Industry case studies",
      "Animated data flow visualization",
      "Comparative analysis tools"
    ]
  },
  {
    id: "large-scale-data",
    title: "Managing Large Scale Data",
    description: "Smart data cleaner & profiler for handling complex datasets, with automated quality assessment and intelligent suggestion systems.",
    color: "from-data-purple to-data-pink",
    icon: "🔍",
    features: [
      "File upload system",
      "Automated data quality assessment",
      "Interactive cleaning interface",
      "Missing value handling"
    ]
  },
  {
    id: "data-manipulation",
    title: "Paradigms for Data Manipulation",
    description: "Visual MapReduce explorer with step-by-step visualization of distributed computing concepts and animated data flow.",
    color: "from-data-pink to-data-orange",
    icon: "⚙️",
    features: [
      "Mapping visualization",
      "Shuffling demonstration",
      "Reducing phase exploration",
      "Performance comparison tools"
    ]
  },
  {
    id: "text-analysis",
    title: "Text Analysis",
    description: "NLP-powered sentiment analyzer with multi-dimensional text analysis, emotion classification, and interactive visualizations.",
    color: "from-data-orange to-data-green",
    icon: "📝",
    features: [
      "Sentiment analysis engine",
      "Topic modeling visualization",
      "Named entity recognition",
      "Interactive word clouds"
    ]
  },
  {
    id: "data-streams",
    title: "Mining Data Streams",
    description: "Real-time stream analytics dashboard with configurable data stream simulators and interactive controls for analyzing streaming data.",
    color: "from-data-green to-data-teal",
    icon: "📈",
    features: [
      "Stream simulator configurations",
      "Distinct counting algorithms",
      "Reservoir sampling demonstration",
      "Anomaly detection in streams"
    ]
  },
  {
    id: "advanced-analysis",
    title: "Advanced Data Analysis",
    description: "Network analysis & recommendation system with interactive graph visualization, community detection, and path finding algorithms.",
    color: "from-data-teal to-data-blue",
    icon: "🔬",
    features: [
      "Interactive graph visualization",
      "Community detection algorithms",
      "Centrality metrics analysis",
      "Recommendation engine"
    ]
  }
];

export default function Modules() {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold gradient-heading">
              Data Science Modules
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our six interactive modules demonstrating practical applications of advanced data science concepts.
            </p>
            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <Link to="/data-science-playground">
                <Button className="bg-gradient-to-r from-data-blue to-data-purple text-white">
                  <FileInput className="mr-2 h-4 w-4" />
                  Interactive Data Science Playground
                </Button>
              </Link>
              <Link to="/modules/introduction">
                <Button variant="outline">
                  <File className="mr-2 h-4 w-4" />
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {modules.map((module) => (
              <Card 
                key={module.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${module.color} h-40 relative flex items-center justify-center text-white overflow-hidden`}>
                  <div className="text-8xl absolute opacity-20 blur-sm animate-pulse-gentle">
                    {module.icon}
                  </div>
                  <div className="text-6xl z-10">
                    {module.icon}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-display font-bold">{module.title}</h2>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link to={`/modules/${module.id}`}>
                      <Button>
                        Explore Module
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/data-science-playground?module=${module.id}`}>
                      <Button variant="outline">
                        Try in Playground
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 bg-gradient-to-r from-data-blue/10 to-data-purple/10 rounded-lg p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to apply what you've learned?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              The Data Science Playground allows you to upload your own datasets and apply techniques from any module.
            </p>
            <Link to="/data-science-playground">
              <Button size="lg" className="bg-gradient-to-r from-data-blue to-data-purple text-white">
                <Database className="mr-2 h-5 w-5" />
                Launch Data Science Playground
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
