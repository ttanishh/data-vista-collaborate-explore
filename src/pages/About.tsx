
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Futuristic background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-data-blue/10 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gradient-to-tr from-data-purple/5 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border border-data-teal/10 rounded-full -z-10"></div>
        
        <div className="container px-4 md:px-6">
          <div className="space-y-12 max-w-3xl mx-auto">
            <div className="space-y-4 text-center">
              <Badge variant="outline" className="bg-secondary/20 text-xs py-1 px-2 backdrop-blur-sm mb-2">
                ABOUT THE PROJECT
              </Badge>
              <h1 className="text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink">
                About DataVista
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive data science portfolio showcasing advanced analytics and visualization
              </p>
            </div>

            <div className="space-y-8">
              <Card className="p-8 border border-primary/10 bg-card/60 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-data-blue to-data-purple flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Project Overview</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    DataVista is the final project for CS322 - Data Science course, demonstrating practical applications of data science through six interactive modules. Each module showcases different aspects of data science, from basic concepts to advanced analytics, providing a comprehensive learning experience.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through these modules, users can explore real-world applications of data science techniques, experiment with various algorithms, and visualize complex datasets in intuitive ways. The project aims to bridge theoretical knowledge with practical implementation.
                  </p>
                </div>
              </Card>

              <Card className="p-8 border border-primary/10 bg-card/60 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-data-purple to-data-pink flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 14 4-4" />
                        <path d="M3.51 9.05a9 9 0 0 1 2.82-3.8 9 9 0 0 1 12.7 12.7 9 9 0 0 1-12.7 0 9 9 0 0 1-2.82-8.9" />
                        <path d="M18 22c-.29-.09-.57-.18-.86-.24-1.11-.27-2.25-.27-3.38-.07-1.13.2-2.19.59-3.28.99-1.27.47-2.57.95-3.95 1.06-1.38.11-2.79-.04-4.18-.64" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Technical Implementation</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Built with modern web technologies, DataVista combines the power of React for the user interface, Three.js for 3D visualizations, and various data visualization libraries to create an interactive learning experience.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="border rounded-lg p-6 bg-gradient-to-br from-background to-secondary/5">
                      <h3 className="font-medium mb-3">Frontend Technologies</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        <li>React with TypeScript</li>
                        <li>Tailwind CSS for styling</li>
                        <li>shadcn/ui component library</li>
                        <li>Three.js for 3D visualizations</li>
                        <li>Recharts for data visualization</li>
                        <li>React Router for navigation</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-6 bg-gradient-to-br from-background to-secondary/5">
                      <h3 className="font-medium mb-3">Data Processing</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        <li>Custom data processing algorithms</li>
                        <li>Client-side data persistence</li>
                        <li>Real-time data simulation</li>
                        <li>Statistical analysis libraries</li>
                        <li>Advanced visualization techniques</li>
                        <li>Interactive data exploration tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border border-primary/10 bg-card/60 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-data-pink to-data-orange flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Course Context</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    CS322 - Data Science is an advanced course covering the theoretical foundations and practical applications of data science. Topics include data cleaning, exploratory analysis, statistical modeling, machine learning, and data visualization.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The course emphasizes the importance of understanding the entire data science pipeline, from data collection and preprocessing to advanced analysis and interpretation. DataVista serves as a culmination of the skills and knowledge gained throughout the semester.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="border-primary/20 bg-primary/5 hover:bg-primary/10 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Course Syllabus
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border border-primary/10 bg-card/60 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-data-orange to-data-green flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Contributors</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    This project was developed by students of CS322 as part of their final project showcase. The collaborative effort brought together diverse skills in data science, software development, and design to create an interactive learning platform.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-br from-background to-secondary/5">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Student {index}</div>
                          <div className="text-sm text-muted-foreground">Data Science Team</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
