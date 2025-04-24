
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DataSciencePlayground } from "@/components/DataSciencePlayground";

export default function DataSciencePlaygroundPage() {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Interactive Learning
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Data Science Playground
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload your data, choose operations from any module, and visualize the results interactively
              </p>
            </div>
            
            <DataSciencePlayground />
            
          </div>
        </div>
      </section>
    </Layout>
  );
}
