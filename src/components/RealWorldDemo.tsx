
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  format?: string;
}

const Metric: React.FC<MetricProps> = ({ label, value, change, icon, format }) => {
  return (
    <div className="p-4 bg-secondary/5 border border-primary/10 rounded-lg backdrop-blur-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <div className="text-primary/70">{icon}</div>}
      </div>
      <div className="text-2xl font-bold mb-1">
        {format === 'percentage' ? `${value}%` : value}
      </div>
      {change !== undefined && (
        <div className={`text-xs flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
          {Math.abs(change)}%
        </div>
      )}
    </div>
  );
};

interface InsightCardProps {
  title: string;
  description: string;
  type?: 'default' | 'warning' | 'success';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description, type = 'default' }) => {
  const getBgColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20';
      case 'success':
        return 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20';
      default:
        return 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20';
    }
  };
  
  return (
    <div className={`p-4 border rounded-lg backdrop-blur-sm ${getBgColor()}`}>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export type RealWorldDemoType = 
  | 'urbanMobility' 
  | 'agriculturalYield' 
  | 'medicalResearch' 
  | 'customerExperience' 
  | 'predictiveMaintenance' 
  | 'healthcareResource';

interface RealWorldDemoProps {
  type: RealWorldDemoType;
}

export const RealWorldDemo: React.FC<RealWorldDemoProps> = ({ type }) => {
  const demoConfig = {
    urbanMobility: {
      title: "Urban Mobility Analyzer",
      description: 
        "Track and analyze public transportation patterns in cities to identify inefficiencies in bus routes, predict peak congestion times, and propose optimized schedules.",
      metrics: [
        {
          label: "Route Efficiency Gain",
          value: 15.3,
          change: 8.2,
          format: "percentage",
          icon: (
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
            >
              <rect width="18" height="12" x="3" y="8" rx="2" />
              <path d="M3 8h18" />
              <path d="M9 2v6" />
              <path d="M15 2v6" />
              <circle cx="6" cy="16" r="1" />
              <circle cx="18" cy="16" r="1" />
            </svg>
          )
        },
        {
          label: "Commute Time Reduced",
          value: "12.8 min",
          change: 15.1
        },
        {
          label: "Passenger Satisfaction",
          value: 87,
          change: 9.3,
          format: "percentage"
        }
      ],
      insights: [
        {
          title: "Peak Congestion Identified",
          description: "Data analysis revealed consistent congestion patterns between 8:15-8:45 AM on route 42, suggesting schedule adjustments."
        },
        {
          title: "Route Optimization Opportunity",
          description: "Rerouting line 28 through Washington Ave reduces travel time by 8 minutes while maintaining 95% of coverage.",
          type: "success"
        }
      ],
      chart: {
        type: "line",
        data: [
          { hour: "5AM", passengers: 82, optimized: 82 },
          { hour: "6AM", passengers: 145, optimized: 145 },
          { hour: "7AM", passengers: 287, optimized: 287 },
          { hour: "8AM", passengers: 375, optimized: 375 },
          { hour: "9AM", passengers: 340, optimized: 250 },
          { hour: "10AM", passengers: 167, optimized: 190 },
          { hour: "11AM", passengers: 142, optimized: 142 },
          { hour: "12PM", passengers: 190, optimized: 190 },
          { hour: "1PM", passengers: 210, optimized: 210 },
          { hour: "2PM", passengers: 165, optimized: 165 },
          { hour: "3PM", passengers: 187, optimized: 187 },
          { hour: "4PM", passengers: 345, optimized: 280 },
          { hour: "5PM", passengers: 408, optimized: 320 },
          { hour: "6PM", passengers: 251, optimized: 251 },
          { hour: "7PM", passengers: 187, optimized: 187 },
          { hour: "8PM", passengers: 98, optimized: 98 },
        ]
      }
    },
    agriculturalYield: {
      title: "Agricultural Yield Optimizer",
      description: 
        "Help small-scale farmers maximize crop yields using environmental sensors, satellite imagery, and historical harvest data.",
      metrics: [
        {
          label: "Yield Increase",
          value: 27.8,
          change: 27.8,
          format: "percentage",
          icon: (
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
            >
              <path d="M3 22V12C3 6.5 7.5 2 13 2a10 10 0 0 1 0 20h-2" />
              <path d="M16 2c1.5 4 2 6.5 2 10a10 10 0 0 1-2 7" />
              <path d="M7 16a6.7 6.7 0 0 1 5 0 6.7 6.7 0 0 0 5 0" />
              <path d="M15 22v-5" />
              <path d="M12 22v-7" />
              <path d="M9 22v-3" />
            </svg>
          )
        },
        {
          label: "Water Usage Reduction",
          value: 31.4,
          change: 31.4,
          format: "percentage"
        },
        {
          label: "Data Quality Score",
          value: 94.2,
          change: 12.5,
          format: "percentage"
        }
      ],
      insights: [
        {
          title: "Soil Moisture Pattern Detected",
          description: "North field requires 28% less irrigation due to higher clay content and water retention properties.",
          type: "success"
        },
        {
          title: "Sensor Data Gap Identified",
          description: "Temperature sensors in southeast quadrant show gaps between 2-4AM daily, possibly due to battery issues.",
          type: "warning"
        }
      ],
      chart: {
        type: "bar",
        data: [
          { month: "Jan", rainfall: 45, soilMoisture: 72, temperature: 52 },
          { month: "Feb", rainfall: 52, soilMoisture: 80, temperature: 58 },
          { month: "Mar", rainfall: 48, soilMoisture: 75, temperature: 62 },
          { month: "Apr", rainfall: 70, soilMoisture: 85, temperature: 68 },
          { month: "May", rainfall: 35, soilMoisture: 65, temperature: 78 },
          { month: "Jun", rainfall: 25, soilMoisture: 45, temperature: 85 },
        ]
      }
    },
    medicalResearch: {
      title: "Medical Research Accelerator",
      description: 
        "Apply distributed computing techniques to analyze massive genomic datasets for medical research, identifying potential genetic markers for diseases.",
      metrics: [
        {
          label: "Processing Time Reduced",
          value: "93.4%",
          change: 93.4,
          icon: (
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
            >
              <path d="M5.5 17a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18.5 7a2.5 2.5 0 0 1 0 5H18" />
              <path d="M8 16.5a7 7 0 0 0 7-7" />
              <path d="m11 6 3.5 3.5" />
              <path d="M18 13.5A7 7 0 0 0 11 7" />
              <path d="m13 19-3.5-3.5" />
            </svg>
          )
        },
        {
          label: "Potential Markers Identified",
          value: 8,
          change: 0
        },
        {
          label: "Accuracy Rate",
          value: 99.7,
          change: 0.3,
          format: "percentage"
        }
      ],
      insights: [
        {
          title: "MapReduce Performance Breakthrough",
          description: "Computation time reduced from 72 hours to 4.5 hours using distributed processing across 16 nodes.",
          type: "success"
        },
        {
          title: "New Correlation Discovered",
          description: "Statistical analysis revealed a previously unknown correlation between gene sequence ACTG-237 and early onset markers.",
          type: "success"
        }
      ],
      chart: {
        type: "bar",
        data: [
          { name: "Traditional", time: 72 },
          { name: "2 Nodes", time: 38 },
          { name: "4 Nodes", time: 19 },
          { name: "8 Nodes", time: 9 },
          { name: "16 Nodes", time: 4.5 }
        ],
        dataKey: "name",
        valueKey: "time"
      }
    },
    customerExperience: {
      title: "Customer Experience Intelligence",
      description: 
        "Process customer reviews, support tickets, and social media mentions to categorize sentiment, identify emerging issues, and extract actionable insights.",
      metrics: [
        {
          label: "Sentiment Accuracy",
          value: 91.3,
          change: 4.8,
          format: "percentage",
          icon: (
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
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          )
        },
        {
          label: "Issues Identified",
          value: 17,
          change: 0
        },
        {
          label: "Response Rate",
          value: 89.5,
          change: 12.7,
          format: "percentage"
        }
      ],
      insights: [
        {
          title: "Emerging Customer Concern",
          description: "Text analysis identified a 217% increase in mentions of 'login difficulty' in the past week.",
          type: "warning"
        },
        {
          title: "Positive Feedback Trend",
          description: "The new mobile app design received 94% positive sentiment across 1,283 social media posts.",
          type: "success"
        }
      ],
      chart: {
        type: "pie",
        data: [
          { name: "Positive", value: 56 },
          { name: "Neutral", value: 24 },
          { name: "Negative", value: 20 }
        ],
        colors: ['#38B000', '#4361EE', '#F72585']
      }
    },
    predictiveMaintenance: {
      title: "Predictive Maintenance for Manufacturing",
      description: 
        "Monitor industrial equipment in real-time to predict mechanical failures before they occur using sensor data streams analysis.",
      metrics: [
        {
          label: "Downtime Reduction",
          value: 31.7,
          change: 31.7,
          format: "percentage",
          icon: (
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
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          label: "Equipment Lifespan",
          value: "+23.4%",
          change: 23.4
        },
        {
          label: "Fault Prediction Accuracy",
          value: 92.7,
          change: 3.1,
          format: "percentage"
        }
      ],
      insights: [
        {
          title: "Vibration Pattern Detected",
          description: "Anomaly detection identified unusual vibration patterns in pump #7, suggesting bearing wear 2 weeks before failure point.",
          type: "warning"
        },
        {
          title: "Maintenance Scheduling Optimized",
          description: "AI-driven scheduling reduced emergency maintenance events by 68% while extending average service intervals by 41%.",
          type: "success"
        }
      ],
      chart: {
        type: "line",
        data: [
          { week: "W1", normal: 78, anomaly: 80 },
          { week: "W2", normal: 81, anomaly: 82 },
          { week: "W3", normal: 80, anomaly: 85 },
          { week: "W4", normal: 79, anomaly: 89 },
          { week: "W5", normal: 82, anomaly: 95 },
          { week: "W6", normal: 80, anomaly: 120 },
          { week: "W7", normal: 81, anomaly: 0 } // Failure point
        ]
      }
    },
    healthcareResource: {
      title: "Healthcare Resource Allocator",
      description: 
        "Optimize hospital staff scheduling and resource allocation based on patient admission patterns, procedure durations, and seasonal health trends.",
      metrics: [
        {
          label: "Wait Time Reduction",
          value: 26.8,
          change: 26.8,
          format: "percentage",
          icon: (
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
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          )
        },
        {
          label: "Staff Utilization",
          value: 94.3,
          change: 8.5,
          format: "percentage"
        },
        {
          label: "Patient Clusters Identified",
          value: 5,
          change: 0
        }
      ],
      insights: [
        {
          title: "Admission Pattern Discovered",
          description: "Clustering analysis revealed a 43% surge in respiratory cases every Tuesday following local industrial plant operations.",
          type: "default"
        },
        {
          title: "Staffing Recommendation",
          description: "Simulations show that shifting 2 nurses from evening to morning shift on Mondays would reduce average wait times by 24 minutes.",
          type: "success"
        }
      ],
      chart: {
        type: "bar",
        data: [
          { day: "Mon", before: 87, after: 62 },
          { day: "Tue", before: 76, after: 58 },
          { day: "Wed", before: 43, after: 37 },
          { day: "Thu", before: 58, after: 42 },
          { day: "Fri", before: 65, after: 45 },
          { day: "Sat", before: 35, after: 28 },
          { day: "Sun", before: 30, after: 25 }
        ]
      }
    }
  };

  const config = demoConfig[type];
  if (!config) return null;
  
  return (
    <div className="relative overflow-hidden">
      {/* Futuristic decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-data-teal/10 to-data-green/10 rounded-full blur-3xl -z-10"></div>
      
      <Card className="p-6 border border-primary/10 bg-background/70 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-data-blue to-data-purple"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-data-purple to-data-pink"></div>
        
        <div className="space-y-6 relative">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-data-blue via-data-purple to-data-pink">
                {config.title}
              </h2>
              <Badge variant="outline" className="bg-secondary/30 text-xs py-1 px-2 backdrop-blur-sm">REAL-WORLD APPLICATION</Badge>
            </div>
            <p className="text-muted-foreground">
              {config.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.metrics.map((metric, index) => (
              <Metric 
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                format={metric.format}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 border rounded-lg p-4 bg-gradient-to-br from-background to-secondary/5 backdrop-blur-sm">
              <h3 className="font-medium mb-4">Performance Analytics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {config.chart.type === 'line' ? (
                    <LineChart
                      data={config.chart.data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey={config.chart.dataKey || 'hour' || 'week'} 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.2)' 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="passengers" 
                        name="Current" 
                        stroke="#4361EE" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      {config.chart.data[0].hasOwnProperty('optimized') && (
                        <Line 
                          type="monotone" 
                          dataKey="optimized" 
                          name="Optimized" 
                          stroke="#38B000" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                        />
                      )}
                      {config.chart.data[0].hasOwnProperty('anomaly') && (
                        <Line 
                          type="monotone" 
                          dataKey="anomaly" 
                          name="Anomaly" 
                          stroke="#F72585" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      )}
                      {config.chart.data[0].hasOwnProperty('normal') && (
                        <Line 
                          type="monotone" 
                          dataKey="normal" 
                          name="Normal" 
                          stroke="#4361EE" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      )}
                    </LineChart>
                  ) : config.chart.type === 'bar' ? (
                    <BarChart
                      data={config.chart.data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey={config.chart.dataKey || 'month' || 'day' || 'name'} 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.2)' 
                        }} 
                      />
                      
                      {/* Dynamic rendering of bars based on data structure */}
                      {config.chart.data[0].hasOwnProperty('rainfall') && (
                        <>
                          <Bar dataKey="rainfall" name="Rainfall" fill="#4361EE" />
                          <Bar dataKey="soilMoisture" name="Soil Moisture" fill="#38B000" />
                          <Bar dataKey="temperature" name="Temperature" fill="#FB8500" />
                        </>
                      )}
                      
                      {config.chart.data[0].hasOwnProperty('before') && (
                        <>
                          <Bar dataKey="before" name="Before Optimization" fill="#F72585" />
                          <Bar dataKey="after" name="After Optimization" fill="#38B000" />
                        </>
                      )}
                      
                      {config.chart.data[0].hasOwnProperty('time') && (
                        <Bar dataKey="time" name="Processing Time (hours)" fill="#4361EE" />
                      )}
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={config.chart.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={(entry) => entry.name}
                      >
                        {config.chart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={config.chart.colors[index % config.chart.colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(59, 130, 246, 0.2)' 
                        }} 
                      />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Key Insights</h3>
              {config.insights.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
