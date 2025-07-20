"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isUploading: boolean;
  uploadedImageUrl?: string | null;
}

export function ImageUpload({
  onImageUpload,
  isUploading,
  uploadedImageUrl,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          onImageUpload(file);
        }
      }
    },
    [onImageUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (validateFile(file)) {
          onImageUpload(file);
        }
      }
    },
    [onImageUpload]
  );

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }
    
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return false;
    }
    
    return true;
  };

  if (uploadedImageUrl) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <div className="w-full max-w-lg mx-auto">
              <img
                src={uploadedImageUrl}
                alt="Uploaded image"
                className="w-full max-h-80 sm:max-h-96 object-contain rounded-lg bg-muted/20 shadow-sm"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error("Image failed to load:", uploadedImageUrl);
                  // Try to reload the image or show placeholder
                  const img = e.target as HTMLImageElement;
                  img.src = "/api/placeholder/400/300"; // Fallback
                }}
                onLoad={() => {
                  console.log("Image loaded successfully");
                }}
              />
              <button
                onClick={() => {
                  // Clear uploaded image - force component reset
                  window.location.reload();
                }}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Image uploaded successfully and ready for processing
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-colors ${dragActive ? "border-primary" : ""}`}>
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={isUploading}
          />
          
          <div className="flex flex-col items-center space-y-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            ) : (
              <div className="p-3 bg-muted rounded-full">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isUploading ? "Uploading..." : "Upload your photo"}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP (max 5MB)
              </p>
            </div>
            
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 disabled:opacity-50"
            >
              Select Image
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}