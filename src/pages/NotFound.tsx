
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-display font-bold gradient-heading">404</h1>
          <h2 className="text-2xl font-medium">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
          <Link to="/modules">
            <Button variant="outline">Explore Modules</Button>
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground border-t pt-4 mt-6">
          If you believe this is an error, please contact the site administrator.
        </p>
      </div>
    </div>
  );
}
