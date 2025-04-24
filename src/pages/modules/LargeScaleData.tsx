
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Settings, Filter, Download, X } from "lucide-react";

export default function LargeScaleData() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileType, setFileType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dataQuality, setDataQuality] = useState({
    completeness: 0,
    accuracy: 0,
    consistency: 0,
    uniqueness: 0
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    fillMissingValues: true,
    correctTypos: true,
    removeDuplicates: true,
    standardizeFormat: true,
    removeOutliers: false,
    normalization: "none",
    imputationMethod: "mean"
  });
  
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset the progress
    setUploadProgress(0);
    setUploadedFile(file);
    setFileType(file.name.split('.').pop()?.toLowerCase() || "");
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate data quality assessment with random values
        setTimeout(() => {
          setDataQuality({
            completeness: Math.floor(Math.random() * 30) + 70,
            accuracy: Math.floor(Math.random() * 20) + 75,
            consistency: Math.floor(Math.random() * 25) + 70,
            uniqueness: Math.floor(Math.random() * 15) + 80
          });
          
          setActiveTab("profile");
          toast({
            title: "File Upload Complete",
            description: `${file.name} has been uploaded and profiled successfully.`,
          });
        }, 500);
      }
    }, 300);
  };
  
  const handleClean = () => {
    toast({
      title: "Data Cleaning Initiated",
      description: "Automated cleaning process has started. This may take a few moments.",
    });
    
    // Simulate data cleaning process
    setTimeout(() => {
      setDataQuality({
        completeness: 95,
        accuracy: 97,
        consistency: 96,
        uniqueness: 98
      });
      
      setActiveTab("clean");
      toast({
        title: "Data Cleaning Complete",
        description: "Your data has been cleaned successfully.",
      });
    }, 2000);
  };

  const handleAdvancedCleaning = () => {
    setShowAdvancedOptions(true);
  };

  const applyAdvancedSettings = () => {
    toast({
      title: "Advanced Cleaning Applied",
      description: "Your custom cleaning settings have been applied successfully.",
    });
    
    // Simulate improved data quality based on selected options
    const newDataQuality = {
      completeness: Math.min(dataQuality.completeness + (advancedSettings.fillMissingValues ? 5 : 0), 99),
      accuracy: Math.min(dataQuality.accuracy + (advancedSettings.correctTypos ? 4 : 0), 99),
      consistency: Math.min(dataQuality.consistency + (advancedSettings.standardizeFormat ? 6 : 0), 99),
      uniqueness: Math.min(dataQuality.uniqueness + (advancedSettings.removeDuplicates ? 3 : 0), 99)
    };
    
    setDataQuality(newDataQuality);
    setShowAdvancedOptions(false);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-secondary/30 px-4 py-1 rounded-full text-sm font-medium mb-2">
                Module 2
              </div>
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Managing Large Scale Data
              </h1>
              <p className="text-xl text-muted-foreground">
                Smart data cleaner & profiler for handling complex datasets with automated quality assessment
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="upload">Upload Data</TabsTrigger>
                <TabsTrigger value="profile">Profile Data</TabsTrigger>
                <TabsTrigger value="clean">Clean Data</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Upload Your Dataset</h2>
                      <p className="text-muted-foreground">
                        Upload CSV, Excel, or JSON files to begin analysis and cleaning process
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 border-dashed cursor-pointer hover:bg-secondary/20 transition-colors">
                        <div className="flex flex-col items-center justify-center space-y-2 h-full">
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
                            className="text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M8 13h2"></path>
                            <path d="M8 17h2"></path>
                            <path d="M14 13h2"></path>
                            <path d="M14 17h2"></path>
                          </svg>
                          <span className="text-sm font-medium">CSV File</span>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border-dashed cursor-pointer hover:bg-secondary/20 transition-colors">
                        <div className="flex flex-col items-center justify-center space-y-2 h-full">
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
                            className="text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M8 13h8"></path>
                            <path d="M8 17h8"></path>
                          </svg>
                          <span className="text-sm font-medium">Excel File</span>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border-dashed cursor-pointer hover:bg-secondary/20 transition-colors">
                        <div className="flex flex-col items-center justify-center space-y-2 h-full">
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
                            className="text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
                            <path d="M16 12a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1 1 1 0 0 0-1 1v1a1 1 0 0 1-1 1"></path>
                          </svg>
                          <span className="text-sm font-medium">JSON File</span>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-lg p-10 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <div className="space-y-1">
                          <p className="text-lg font-medium">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports CSV, Excel, and JSON files up to 100MB
                          </p>
                        </div>
                        <Button variant="outline">
                          Select File
                          <input 
                            type="file" 
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".csv,.xlsx,.xls,.json"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </div>
                    </div>
                    
                    {uploadProgress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Uploading file...</span>
                          <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Data Profile</h2>
                      <p className="text-muted-foreground">
                        Automated assessment of your data quality and structure
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">File Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Filename:</span>
                            <span className="font-medium">{uploadedFile?.name || "No file uploaded"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">File type:</span>
                            <span className="font-medium uppercase">{fileType || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">File size:</span>
                            <span className="font-medium">
                              {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Data Quality Metrics</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Completeness</span>
                              <span className="font-medium">{dataQuality.completeness}%</span>
                            </div>
                            <Progress value={dataQuality.completeness} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Accuracy</span>
                              <span className="font-medium">{dataQuality.accuracy}%</span>
                            </div>
                            <Progress value={dataQuality.accuracy} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Consistency</span>
                              <span className="font-medium">{dataQuality.consistency}%</span>
                            </div>
                            <Progress value={dataQuality.consistency} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Uniqueness</span>
                              <span className="font-medium">{dataQuality.uniqueness}%</span>
                            </div>
                            <Progress value={dataQuality.uniqueness} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <div className="flex justify-center">
                        <Button onClick={handleClean}>
                          Clean Data
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
                            className="ml-2"
                          >
                            <path d="m8 6 4-4 4 4"></path>
                            <path d="M12 2v10.3"></path>
                            <path d="M4 13a8 8 0 0 0 16 0"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="clean" className="space-y-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Data Cleaning Results</h2>
                      <p className="text-muted-foreground">
                        Compare before and after metrics from the cleaning process
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Before Cleaning</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Completeness</span>
                              <span className="font-medium">{Math.max(dataQuality.completeness - 20, 50)}%</span>
                            </div>
                            <Progress value={Math.max(dataQuality.completeness - 20, 50)} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Accuracy</span>
                              <span className="font-medium">{Math.max(dataQuality.accuracy - 22, 50)}%</span>
                            </div>
                            <Progress value={Math.max(dataQuality.accuracy - 22, 50)} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Consistency</span>
                              <span className="font-medium">{Math.max(dataQuality.consistency - 26, 50)}%</span>
                            </div>
                            <Progress value={Math.max(dataQuality.consistency - 26, 50)} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Uniqueness</span>
                              <span className="font-medium">{Math.max(dataQuality.uniqueness - 18, 50)}%</span>
                            </div>
                            <Progress value={Math.max(dataQuality.uniqueness - 18, 50)} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">After Cleaning</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Completeness</span>
                              <span className="font-medium">{dataQuality.completeness}%</span>
                            </div>
                            <Progress value={dataQuality.completeness} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Accuracy</span>
                              <span className="font-medium">{dataQuality.accuracy}%</span>
                            </div>
                            <Progress value={dataQuality.accuracy} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Consistency</span>
                              <span className="font-medium">{dataQuality.consistency}%</span>
                            </div>
                            <Progress value={dataQuality.consistency} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Uniqueness</span>
                              <span className="font-medium">{dataQuality.uniqueness}%</span>
                            </div>
                            <Progress value={dataQuality.uniqueness} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-secondary/10">
                      <h3 className="font-medium mb-3">Cleaning Actions Performed</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Filled missing values using predictive imputation</span>
                        </li>
                        <li className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Corrected typos in categorical columns</span>
                        </li>
                        <li className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Removed duplicate entries</span>
                        </li>
                        <li className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Standardized formatting in date and numerical fields</span>
                        </li>
                        <li className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Detected and removed statistical outliers</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <Button>
                        Download Cleaned Data
                        <Download size={16} className="ml-2" />
                      </Button>
                      
                      <Button variant="outline" onClick={handleAdvancedCleaning}>
                        Advanced Cleaning Options
                      </Button>
                    </div>
                  </div>
                </Card>
                
                {showAdvancedOptions && (
                  <Card className="p-6 border-2 border-primary/20">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Advanced Cleaning Options</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowAdvancedOptions(false)}>
                        <X size={18} />
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Data Cleaning Methods</h4>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="fillMissingValues" 
                              checked={advancedSettings.fillMissingValues}
                              onCheckedChange={(checked) => 
                                setAdvancedSettings({...advancedSettings, fillMissingValues: !!checked})
                              } 
                            />
                            <div className="grid gap-1">
                              <Label htmlFor="fillMissingValues">Fill missing values</Label>
                              <p className="text-xs text-muted-foreground">Use predictive imputation to fill gaps in data</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="correctTypos" 
                              checked={advancedSettings.correctTypos}
                              onCheckedChange={(checked) => 
                                setAdvancedSettings({...advancedSettings, correctTypos: !!checked})
                              } 
                            />
                            <div className="grid gap-1">
                              <Label htmlFor="correctTypos">Correct typos</Label>
                              <p className="text-xs text-muted-foreground">Fix spelling errors in text fields</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="removeDuplicates" 
                              checked={advancedSettings.removeDuplicates}
                              onCheckedChange={(checked) => 
                                setAdvancedSettings({...advancedSettings, removeDuplicates: !!checked})
                              } 
                            />
                            <div className="grid gap-1">
                              <Label htmlFor="removeDuplicates">Remove duplicates</Label>
                              <p className="text-xs text-muted-foreground">Identify and remove identical records</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="standardizeFormat" 
                              checked={advancedSettings.standardizeFormat}
                              onCheckedChange={(checked) => 
                                setAdvancedSettings({...advancedSettings, standardizeFormat: !!checked})
                              } 
                            />
                            <div className="grid gap-1">
                              <Label htmlFor="standardizeFormat">Standardize formats</Label>
                              <p className="text-xs text-muted-foreground">Normalize date and number formats</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="removeOutliers" 
                              checked={advancedSettings.removeOutliers}
                              onCheckedChange={(checked) => 
                                setAdvancedSettings({...advancedSettings, removeOutliers: !!checked})
                              } 
                            />
                            <div className="grid gap-1">
                              <Label htmlFor="removeOutliers">Remove outliers</Label>
                              <p className="text-xs text-muted-foreground">Detect and remove statistical anomalies</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-5">
                          <h4 className="font-medium">Advanced Settings</h4>
                          
                          <div className="space-y-2">
                            <Label htmlFor="normalization">Normalization Method</Label>
                            <Select 
                              value={advancedSettings.normalization} 
                              onValueChange={(value) => setAdvancedSettings({...advancedSettings, normalization: value})}
                            >
                              <SelectTrigger id="normalization">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="minmax">Min-Max Scaling</SelectItem>
                                <SelectItem value="zscore">Z-Score Standardization</SelectItem>
                                <SelectItem value="robust">Robust Scaling</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">Normalize numerical data for better analysis</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="imputation">Imputation Method</Label>
                            <Select 
                              value={advancedSettings.imputationMethod} 
                              onValueChange={(value) => setAdvancedSettings({...advancedSettings, imputationMethod: value})}
                            >
                              <SelectTrigger id="imputation">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mean">Mean</SelectItem>
                                <SelectItem value="median">Median</SelectItem>
                                <SelectItem value="mode">Mode</SelectItem>
                                <SelectItem value="knn">K-Nearest Neighbors</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">Method for filling missing values</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Outlier Detection Sensitivity</Label>
                            <div className="pt-2">
                              <Slider
                                defaultValue={[2]}
                                min={1}
                                max={5}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Conservative</span>
                              <span>Aggressive</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button onClick={applyAdvancedSettings}>
                          Apply Advanced Cleaning
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
