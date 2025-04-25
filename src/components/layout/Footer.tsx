import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-12 mt-auto">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold">DataMate</span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
                CS322
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A comprehensive data science portfolio showcasing practical applications of advanced analytics and visualization techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Modules
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/collaborate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Collaborate
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Modules</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/modules/introduction" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link to="/modules/large-scale-data" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Large Scale Data
                  </Link>
                </li>
                <li>
                  <Link to="/modules/data-manipulation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Data Manipulation
                  </Link>
                </li>
                <li>
                  <Link to="/modules/text-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Text Analysis
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Contributors</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">MISBAH</li>
              <li className="text-sm text-muted-foreground">AAYUDH</li>
              <li className="text-sm text-muted-foreground">NEEM</li>
              <li className="text-sm text-muted-foreground">TANISH</li>
              <li className="text-sm text-muted-foreground">RAJ</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Final project for CS322 - Data Science course.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
