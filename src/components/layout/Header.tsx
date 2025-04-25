
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-display font-bold">DataMate</span>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
              CS322
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/modules" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Modules
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/collaborate">
            <Button variant="outline" size="sm">
              Collaborate
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
