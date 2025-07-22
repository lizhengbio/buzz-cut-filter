"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // 检查是否有从 landing page 传来的图片数据或示例图片
  useEffect(() => {
    const handleImageLoading = async () => {
      // 首先检查 URL 参数中的示例图片
      const sampleImage = searchParams.get('sampleImage');
      const filename = searchParams.get('filename');
      
      if (sampleImage && filename) {
        console.log('📷 Loading sample image:', sampleImage);
        setStatus("uploading");
        
        try {
          const response = await fetch(sampleImage);
          if (!response.ok) {
            throw new Error('Failed to load sample image');
          }
          
          const blob = await response.blob();
          const base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          
          setUploadedImageUrl(base64Data);
          setImageBase64(base64Data);
          setStatus("idle");
          
          console.log('📸 Loaded sample image:', {
            filename,
            size: blob.size,
            type: blob.type
          });
          
          return; // 如果加载了示例图片，就不再检查 sessionStorage
        } catch (error) {
          console.error('Failed to load sample image:', error);
          setError('Failed to load sample image. Please upload your own image.');
          setStatus("idle");
        }
      }

      // 检查 sessionStorage 中的数据
      const uploadedData = sessionStorage.getItem('uploadedImageData');
      if (uploadedData) {
        try {
          const data = JSON.parse(uploadedData);
          // 检查数据是否过期（1小时）
          if (Date.now() - data.uploadedAt < 60 * 60 * 1000) {
            setUploadedImageUrl(data.imageUrl);
            setImageBase64(data.imageBase64);
            console.log('📸 Loaded image from landing page:', {
              imageUrlLength: data.imageUrl?.length || 0,
              imageBase64Length: data.imageBase64?.length || 0
            });
          }
          // 清除 sessionStorage 中的数据，避免重复使用
          sessionStorage.removeItem('uploadedImageData');
        } catch (error) {
          console.error('Failed to parse uploaded image data:', error);
          sessionStorage.removeItem('uploadedImageData');
        }
      }
    };

    handleImageLoading();
  }, [searchParams]);

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