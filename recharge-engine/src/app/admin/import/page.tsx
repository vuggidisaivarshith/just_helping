"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

export default function ImportPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      } else {
        alert("Please upload a valid CSV file.");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", file.name);
      // Mock upload process
      alert(`Successfully processed ${file.name}`);
      setFile(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Import</h1>
        <p className="text-gray-500 dark:text-gray-400">Import plans data from a CSV file.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV</CardTitle>
              <CardDescription>Drag and drop your CSV file here, or click to browse.</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-300 dark:border-zinc-700'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex flex-col items-center">
                    <File className="h-12 w-12 text-blue-500 mb-4" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                    <Button variant="ghost" size="sm" className="mt-4 text-red-500" onClick={() => setFile(null)}>Remove</Button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm font-medium mb-1">Drag & drop your CSV file here</p>
                    <p className="text-xs text-muted-foreground mb-4">Supports .csv files up to 10MB</p>
                    <Button variant="outline" onClick={() => document.getElementById('csv-upload')?.click()}>
                      Browse Files
                    </Button>
                    <input 
                      id="csv-upload" 
                      type="file" 
                      accept=".csv" 
                      className="hidden" 
                      onChange={handleFileInput} 
                    />
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button disabled={!file} onClick={handleUpload}>Upload and Process</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 p-4 rounded-md flex gap-3 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Required Headers</h4>
                  <p className="text-blue-700/80 dark:text-blue-300/80 text-xs">
                    Your CSV must include the following column headers exactly as shown.
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-2 mt-4">
                <div className="flex justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <span className="font-mono text-gray-900 dark:text-gray-100">operatorId</span>
                  <span className="text-muted-foreground">jio, airtel, vi, bsnl</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <span className="font-mono text-gray-900 dark:text-gray-100">name</span>
                  <span className="text-muted-foreground">Text</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <span className="font-mono text-gray-900 dark:text-gray-100">price</span>
                  <span className="text-muted-foreground">Number</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <span className="font-mono text-gray-900 dark:text-gray-100">validityDays</span>
                  <span className="text-muted-foreground">Number</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="font-mono text-gray-900 dark:text-gray-100">category</span>
                  <span className="text-muted-foreground">unlimited, data...</span>
                </div>
              </div>
              
              <Button variant="link" className="px-0 w-full justify-start text-blue-600 mt-2">Download Template</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
