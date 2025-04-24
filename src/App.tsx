
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Collaborate from "./pages/Collaborate";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/introduction" element={<Introduction />} />
          <Route path="/modules/large-scale-data" element={<LargeScaleData />} />
          <Route path="/modules/data-manipulation" element={<DataManipulation />} />
          <Route path="/modules/text-analysis" element={<TextAnalysis />} />
          <Route path="/modules/data-streams" element={<DataStreams />} />
          <Route path="/modules/advanced-analysis" element={<AdvancedAnalysis />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
