
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sampleDataFormats } from '@/utils/streamData';

interface FileUploadProps {
  uploadedFile: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearData: () => void;
  acceptedFileTypes?: string;
  className?: string;
}

export const FileUpload = ({ 
  uploadedFile, 
  onFileUpload, 
  onClearData,
  acceptedFileTypes = ".json,.csv", 
  className = "" 
}: FileUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDownloadSample = () => {
    const sampleData = JSON.stringify(sampleDataFormats, null, 2);
    const blob = new Blob([sampleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-data-formats.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center ${className}`}>
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="mb-2 text-sm text-muted-foreground">
        {uploadedFile ? uploadedFile.name : "No file selected"}
      </p>
      <div className="flex flex-col gap-2">
        <Input
          type="file"
          accept={acceptedFileTypes}
          className="hidden"
          id="data-upload"
          ref={fileInputRef}
          onChange={onFileUpload}
        />
        <Button 
          variant="outline" 
          size="sm"
          onClick={triggerFileInput}
        >
          Choose File
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadSample}
          className="flex items-center gap-2"
        >
          <Download size={14} />
          Download Sample Format
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Supported formats: JSON, CSV
      </p>
      <div className="mt-4 text-xs text-muted-foreground">
        <p>For live data simulation, we generate:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Stock prices with ±2.5 random fluctuations</li>
          <li>Frequency counts between 0-100</li>
          <li>Bloom filter entries with realistic false positives</li>
        </ul>
      </div>
      {uploadedFile && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-destructive hover:text-destructive/80"
          onClick={onClearData}
        >
          <Trash size={14} className="mr-1" />
          Clear Data
        </Button>
      )}
    </div>
  );
};
