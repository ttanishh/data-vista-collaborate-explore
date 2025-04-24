import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Modules from "./pages/Modules";
import Introduction from "./pages/modules/Introduction";
import LargeScaleData from "./pages/modules/LargeScaleData";
import DataManipulation from "./pages/modules/DataManipulation";
import TextAnalysis from "./pages/modules/TextAnalysis";
import DataStreams from "./pages/modules/DataStreams";
import AdvancedAnalysis from "./pages/modules/AdvancedAnalysis";
import DataSciencePlayground from "./pages/DataSciencePlayground";
import Collaborate from "./pages/Collaborate";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { PlaygroundTechnicalPanel } from "@/components/PlaygroundTechnicalPanel";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => {
  const [showTechnicalPanel, setShowTechnicalPanel] = useState(false);
  const [currentModule, setCurrentModule] = useState<'introduction' | 'largeScaleData' | 'dataManipulation' | 'textAnalysis' | 'dataStreams' | 'advancedAnalysis'>('introduction');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('introduction')) setCurrentModule('introduction');
    else if (path.includes('large-scale-data')) setCurrentModule('largeScaleData');
    else if (path.includes('data-manipulation')) setCurrentModule('dataManipulation');
    else if (path.includes('text-analysis')) setCurrentModule('textAnalysis');
    else if (path.includes('data-streams')) setCurrentModule('dataStreams');
    else if (path.includes('advanced-analysis')) setCurrentModule('advancedAnalysis');
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  const dashboardMetrics = {
    datasets: 6,
    algorithms: 12,
    visualizations: 24,
    users: 156,
    accuracy: 94.2,
    insightsGenerated: 427
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence>
            {showSplash && (
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -inset-20 bg-gradient-to-r from-data-blue to-data-purple opacity-30 blur-3xl rounded-full -z-10"></div>
                  <motion.div 
                    className="text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    DataVista
                  </motion.div>
                  <motion.div 
                    className="mt-4 text-xl text-muted-foreground text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Interactive Data Science Explorer
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="fixed right-4 bottom-4 flex flex-col items-end space-y-2 z-40">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-10 w-10 p-0 bg-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg"
              onClick={() => setShowTechnicalPanel(!showTechnicalPanel)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-10 w-10 p-0 bg-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg"
              onClick={() => setShowDashboard(!showDashboard)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
          </div>
          
          <AnimatePresence>
            {showTechnicalPanel && (
              <motion.div 
                className="fixed bottom-16 right-4 w-full max-w-lg z-40"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PlaygroundTechnicalPanel module={currentModule} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {showDashboard && (
              <motion.div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDashboard(false)}
              >
                <motion.div 
                  className="bg-background/95 border border-primary/10 rounded-xl max-w-3xl w-full p-6 shadow-xl backdrop-blur"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink">
                      Project Dashboard
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full h-8 w-8 p-0"
                      onClick={() => setShowDashboard(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Datasets Processed</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.datasets}</div>
                      <div className="text-xs text-green-500 mt-1">+2 this week</div>
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Algorithms Applied</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.algorithms}</div>
                      <div className="text-xs text-green-500 mt-1">+3 this week</div>
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Visualizations</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.visualizations}</div>
                      <div className="text-xs text-green-500 mt-1">+8 this week</div>
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Active Users</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.users}</div>
                      <div className="text-xs text-green-500 mt-1">+12 this week</div>
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Avg. Accuracy</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.accuracy}%</div>
                      <div className="text-xs text-green-500 mt-1">+2.1% improvement</div>
                    </div>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-primary/5">
                      <div className="text-sm text-muted-foreground mb-1">Insights Generated</div>
                      <div className="text-3xl font-bold">{dashboardMetrics.insightsGenerated}</div>
                      <div className="text-xs text-green-500 mt-1">+45 this week</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                    <h3 className="font-medium mb-2 text-sm">Project Health Status</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-3 flex-1 bg-secondary/50 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-data-blue to-data-teal"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      All modules functioning correctly with good performance metrics. 
                      Consider enhancing the Text Analysis module with additional visualization options.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/introduction" element={<Introduction />} />
            <Route path="/modules/large-scale-data" element={<LargeScaleData />} />
            <Route path="/modules/data-manipulation" element={<DataManipulation />} />
            <Route path="/modules/text-analysis" element={<TextAnalysis />} />
            <Route path="/modules/data-streams" element={<DataStreams />} />
            <Route path="/modules/advanced-analysis" element={<AdvancedAnalysis />} />
            <Route path="/data-science-playground" element={<DataSciencePlayground />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
