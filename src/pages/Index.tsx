import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import OlapOperations from "@/components/visualization/OlapOperations";
import { ContributorsSection } from "@/components/contributors/ContributorsSection";

// Module data
const modules = [
  {
    id: "introduction",
    title: "Introduction to Data Science",
    description: "Explore domain-specific data science pipelines across industries",
    color: "from-data-blue to-data-purple",
    icon: "📊"
  },
  {
    id: "large-scale-data",
    title: "Managing Large Scale Data",
    description: "Smart data cleaner & profiler for handling complex datasets",
    color: "from-data-purple to-data-pink",
    icon: "🔍"
  },
  {
    id: "data-manipulation",
    title: "Paradigms for Data Manipulation",
    description: "Visual MapReduce explorer with animated data flow visualizations",
    color: "from-data-pink to-data-orange",
    icon: "⚙️"
  },
  {
    id: "text-analysis",
    title: "Text Analysis",
    description: "NLP-powered sentiment analyzer with emotion classification",
    color: "from-data-orange to-data-green",
    icon: "📝"
  },
  {
    id: "data-streams",
    title: "Mining Data Streams",
    description: "Real-time stream analytics dashboard with interactive controls",
    color: "from-data-green to-data-teal",
    icon: "📈"
  },
  {
    id: "advanced-analysis",
    title: "Advanced Data Analysis",
    description: "Network analysis & recommendation system with graph visualization",
    color: "from-data-teal to-data-blue",
    icon: "🔬"
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-display font-bold gradient-heading">
                DataMate: Interactive Data Science Portfolio
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl text-balance max-w-2xl mx-auto">
                Explore practical applications of data science through six interactive modules with cutting-edge visualizations.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/modules">
                <Button size="lg" className="text-base">
                  Explore Modules
                </Button>
              </Link>
              <Link to="/collaborate">
                <Button size="lg" variant="outline" className="text-base">
                  Collaborate in Real-time
                </Button>
              </Link>
            </div>
            
            <div className="w-full max-w-5xl rounded-xl border border-border">
              <OlapOperations />
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
          <div className="absolute top-0 right-0 bg-data-purple/10 w-96 h-96 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 bg-data-blue/10 w-96 h-96 rounded-full blur-3xl" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-display font-bold">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover powerful tools designed to enhance data exploration, visualization, and analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="data-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-data-blue to-data-purple flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">OLAP Operations</h3>
                <p className="text-muted-foreground">
                  Interactive data exploration with Roll-up, Drill-down, Slice, Dice, and Pivot operations.
                </p>
              </div>
            </Card>
            
            <Card className="data-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-data-purple to-data-pink flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-time Collaboration</h3>
                <p className="text-muted-foreground">
                  Work together with peers in shared analysis rooms with live updates.
                </p>
              </div>
            </Card>
            
            <Card className="data-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-data-pink to-data-orange flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Algorithm Playground</h3>
                <p className="text-muted-foreground">
                  Experiment with data science algorithms in an interactive sandbox environment.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-display font-bold">Explore Modules</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each module showcases different aspects of data science applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link to={`/modules/${module.id}`} key={module.id}>
                <Card className="module-card h-full">
                  <div className={`text-4xl bg-gradient-to-br ${module.color} w-14 h-14 rounded-lg flex items-center justify-center text-white`}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <p className="text-muted-foreground mt-2">{module.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contributors Section */}
      <ContributorsSection />
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-br from-data-blue/10 via-data-purple/10 to-data-pink/10 border border-border rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-heading">
                Ready to Dive Into Data Science?
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore the modules, experiment with algorithms, and visualize complex datasets in innovative ways.
              </p>
              <Link to="/modules">
                <Button size="lg" className="text-base">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
