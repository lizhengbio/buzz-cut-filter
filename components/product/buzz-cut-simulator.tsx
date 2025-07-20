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

// Usage steps data
const usageSteps = [
  {
    step: 1,
    title: "Upload Your Photo",
    description: "Supports JPG, JPEG, PNG, BMP, WebP formats",
    icon: "📤",
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: 2,
    title: "Choose Your Style",
    description: "Select from preset styles or customize hair color",
    icon: "✂️",
    color: "from-purple-500 to-pink-500"
  },
  {
    step: 3,
    title: "AI Generation",
    description: "High-quality transformation in seconds",
    icon: "🤖",
    color: "from-green-500 to-emerald-500"
  },
  {
    step: 4,
    title: "Download & Share",
    description: "Save and share on social media",
    icon: "📥",
    color: "from-orange-500 to-red-500"
  }
];

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
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image. Please try again.");
      setStatus("idle");
    }
  };

  const handleGenerate = async () => {
    if (!imageBase64) {
      setError("Please upload an image first");
      return;
    }

    setStatus("generating");
    setError(null);
    
    try {
      console.log("🚀 Starting generation with:", {
        imageBase64Length: imageBase64.length,
        color: selectedColor,
        tier: "free"
      });
      
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
              originalImageUrl: uploadedImageUrl || "",
              resultImageUrl: pollData.result_url,
              color: selectedColor,
              faceSimilarity: pollData.faceSimilarity || 0,
              createdAt: new Date(),
            });
            setStatus("success");
            return;
          } else if (pollData.status === "failed") {
            throw new Error(pollData.message || "Generation failed");
          } else {
            // Still processing, continue polling
            await new Promise(resolve => setTimeout(resolve, 3000));
            return pollResult(taskId, attempts + 1);
          }
        } catch (pollError) {
          console.error(`Poll attempt ${attempts + 1} failed:`, pollError);
          if (attempts < maxAttempts - 1) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return pollResult(taskId, attempts + 1);
          } else {
            throw pollError;
          }
        }
      };
      
      await pollResult(data.task_id);
      
    } catch (error) {
      console.error("Generation error:", error);
      setError(error instanceof Error ? error.message : "Generation failed. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div id="buzz-cut-simulator" className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Usage Guide */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          How to Use the Buzz Cut Filter?
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Get your professional buzz cut preview in just 4 simple steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line - only show for non-last steps */}
              {index < usageSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 z-0"></div>
              )}
              
              <div className="relative bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                {/* Step icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {step.icon}
                </div>
                
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.step}
                </div>
                
                {/* Title and description */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="mt-12">
          <button
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-xl">🚀</span>
            Start Your Transformation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <Card id="upload-section">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            🔥 AI Buzz Cut Simulator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Generate high-quality buzz cut previews in seconds with safe and intelligent hair transformation technology
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
                  className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {status === "generating" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Your Look...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✨</span>
                      Generate My Buzz Cut
                    </div>
                  )}
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
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}