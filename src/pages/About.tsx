
import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-display font-bold gradient-heading">
                About DataVista
              </h1>
              <p className="text-xl text-muted-foreground">
                A comprehensive data science portfolio showcasing advanced analytics and visualization
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Project Overview</h2>
                <p className="text-muted-foreground">
                  DataVista is the final project for CS322 - Data Science course, demonstrating practical applications of data science through six interactive modules. Each module showcases different aspects of data science, from basic concepts to advanced analytics.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Technical Implementation</h2>
                <p className="text-muted-foreground">
                  Built with modern web technologies, DataVista combines the power of React for the user interface, Three.js for 3D visualizations, and various data visualization libraries to create an interactive learning experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Frontend Technologies</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>React with TypeScript</li>
                      <li>Tailwind CSS for styling</li>
                      <li>shadcn/ui component library</li>
                      <li>Three.js for 3D visualizations</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Data Processing</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Recharts for data visualization</li>
                      <li>Custom data processing algorithms</li>
                      <li>Client-side data persistence</li>
                      <li>Real-time collaborative features</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Course Context</h2>
                <p className="text-muted-foreground">
                  CS322 - Data Science is an advanced course covering the theoretical foundations and practical applications of data science. Topics include data cleaning, exploratory analysis, statistical modeling, machine learning, and data visualization.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contributors</h2>
                <p className="text-muted-foreground">
                  This project was developed by students of CS322 as part of their final project showcase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
