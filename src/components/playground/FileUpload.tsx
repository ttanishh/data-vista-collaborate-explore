
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  uploadedFile: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearData: () => void;
}

export const FileUpload = ({ uploadedFile, onFileUpload, onClearData }: FileUploadProps) => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="mb-2 text-sm text-muted-foreground">
        {uploadedFile ? uploadedFile.name : "No file selected"}
      </p>
      <Input
        type="file"
        accept=".json,.csv"
        className="hidden"
        id="data-upload"
        onChange={onFileUpload}
      />
      <Label htmlFor="data-upload" className="cursor-pointer">
        <Button variant="outline" size="sm">
          Choose File
        </Button>
      </Label>
      <p className="mt-2 text-xs text-muted-foreground">
        Supported formats: JSON, CSV
      </p>
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
