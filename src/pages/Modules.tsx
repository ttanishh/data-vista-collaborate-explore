
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
          </div>
          
          <div className="space-y-12">
            {modules.map((module, index) => (
              <div 
                key={module.id}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <Card className={`bg-gradient-to-br ${module.color} h-72 rounded-xl flex items-center justify-center text-white overflow-hidden relative`}>
                    <div className="text-8xl absolute opacity-20 blur-sm animate-pulse-gentle">
                      {module.icon}
                    </div>
                    <div className="text-6xl z-10">
                      {module.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-black/30 backdrop-blur-sm">
                      <h3 className="text-lg font-bold">{module.title}</h3>
                    </div>
                  </Card>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-3xl font-display font-bold">{module.title}</h2>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Features</h4>
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
                  <div>
                    <Link to={`/modules/${module.id}`}>
                      <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                        Explore Module
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
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
