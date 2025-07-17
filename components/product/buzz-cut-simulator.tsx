"use client";

import { useState } from "react";
import { ImageUpload } from "./image-upload";
import { ColorSelector } from "./color-selector";
import { ResultDisplay } from "./result-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type GenerationStatus = "idle" | "uploading" | "generating" | "success" | "error";

export interface GenerationResult {
  id: string;
  originalImageUrl: string;
  resultImageUrl: string;
  color: string;
  faceSimilarity: number;
  createdAt: Date;
}

export function BuzzCutSimulator() {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setStatus("uploading");
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("/api/upload-temp-image", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      
      const data = await response.json();
      console.log("📤 Upload response:", {
        imageUrlLength: data.imageUrl?.length || 0,
        imageBase64Length: data.imageBase64?.length || 0,
        imageUrlPreview: data.imageUrl?.substring(0, 50) + "...",
        imageBase64Preview: data.imageBase64?.substring(0, 50) + "..."
      });
      setUploadedImageUrl(data.imageUrl);
      setImageBase64(data.imageBase64);
      setStatus("idle");
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setStatus("error");
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImageUrl || !imageBase64) {
      setError("Please upload an image first");
      return;
    }
    
    setStatus("generating");
    setError(null);
    
    console.log("🚀 Starting generation with:", {
      imageBase64Length: imageBase64?.length || 0,
      imageBase64Preview: imageBase64?.substring(0, 50) + "...",
      selectedColor: selectedColor,
      uploadedImageUrl: uploadedImageUrl?.substring(0, 50) + "..."
    });
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64: imageBase64,
          color: selectedColor,
          tier: "free",
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate buzz cut");
      }
      
      const data = await response.json();
      
      // Poll for result using kie.ai API with timeout
      const pollResult = async (taskId: string, attempts: number = 0) => {
        const maxAttempts = 60; // 60 attempts * 3 seconds = 3 minutes max
        
        console.log(`🔍 Polling attempt ${attempts + 1}/${maxAttempts} for task:`, taskId);
        
        if (attempts >= maxAttempts) {
          throw new Error("Generation timeout - please try again with a different image");
        }
        
        try {
          const pollUrl = `/api/generate/${taskId}`;
          const pollResponse = await fetch(pollUrl);
          
          if (!pollResponse.ok) {
            throw new Error(`Failed to check status: ${pollResponse.status}`);
          }
          
          const pollData = await pollResponse.json();
          console.log(`📊 Poll response:`, pollData);
          
          if (pollData.status === "success") {
            console.log("✅ Generation completed successfully!");
            setResult({
              id: taskId,
              originalImageUrl: uploadedImageUrl,
              resultImageUrl: pollData.result_url,
              color: selectedColor,
              faceSimilarity: pollData.facesim,
              createdAt: new Date(),
            });
            setStatus("success");
          } else if (pollData.status === "error") {
            throw new Error(pollData.error || "Generation failed");
          } else {
            // Still processing
            console.log(`⏳ Still processing... Status: ${pollData.status || pollData.progress}`);
            setTimeout(() => pollResult(taskId, attempts + 1), 3000);
          }
        } catch (pollError) {
          console.error("❌ Polling error:", pollError);
          throw pollError;
        }
      };
      
      await pollResult(data.task_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate buzz cut");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Buzz Cut AI Simulator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Generate high-quality buzz cut previews in seconds
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ImageUpload
                onImageUpload={handleImageUpload}
                isUploading={status === "uploading"}
                uploadedImageUrl={uploadedImageUrl}
              />
              
              <ColorSelector
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
                disabled={status === "generating"}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={handleGenerate}
                  disabled={!uploadedImageUrl || status === "generating"}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "generating" ? "Generating..." : "Generate Buzz Cut"}
                </button>
              </div>
            </div>
            
            <div>
              <ResultDisplay
                status={status}
                result={result}
                error={error}
                onReset={() => {
                  setResult(null);
                  setError(null);
                  setStatus("idle");
                  setUploadedImageUrl(null);
                  setImageBase64(null);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}