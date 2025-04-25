
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModuleExplanationProps {
  title: string;
  description: string;
  topics: {
    name: string;
    description: string;
    example: string;
  }[];
}

export function ModuleExplanation({ title, description, topics }: ModuleExplanationProps) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {topics.map((topic, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{topic.name}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedTopic(expandedTopic === index ? null : index)}
                className="ml-2"
              >
                {expandedTopic === index ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div
              className={cn(
                "mt-4 overflow-hidden transition-all duration-300",
                expandedTopic === index ? "block" : "hidden"
              )}
            >
              <div className="rounded-lg bg-muted p-4">
                <code className="text-sm whitespace-pre-wrap">{topic.example}</code>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
