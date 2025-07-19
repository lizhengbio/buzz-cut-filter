"use client";

import { useState } from "react";
import { ImageUpload } from "./image-upload";
import { ColorSelector } from "./color-selector";
import { ResultDisplay } from "./result-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 简化的状态类型
type SimulatorState = "idle" | "uploading" | "generating" | "success" | "error";

// 核心数据结构
interface SimulatorData {
  state: SimulatorState;
  selectedColor: string;
  uploadedImage: string | null;
  resultImageUrl: string | null;
  error: string | null;
}

export function BuzzCutSimulator() {
  // 单一数据源 - 所有状态从这里推导
  const [data, setData] = useState<SimulatorData>({
    state: "idle",
    selectedColor: "black",
    uploadedImage: null,
    resultImageUrl: null,
    error: null,
  });

  /**
   * Handle image upload
   */
  const handleImageUpload = async (file: File) => {
    setData(prev => ({ ...prev, state: "uploading", error: null }));
    
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
      
      const { imageBase64 } = await response.json();
      
      setData(prev => ({
        ...prev,
        state: "idle",
        uploadedImage: imageBase64
      }));
      
    } catch (error) {
      setData(prev => ({
        ...prev,
        state: "error",
        error: error instanceof Error ? error.message : "Upload failed"
      }));
    }
  };

  /**
   * 处理颜色选择
   */
  const handleColorSelect = (color: string) => {
    setData(prev => ({ ...prev, selectedColor: color }));
  };

  /**
   * Start generating buzz cut
   */
  const handleGenerate = async () => {
    if (!data.uploadedImage) {
      setData(prev => ({ ...prev, error: "Please upload an image first" }));
      return;
    }
    
    setData(prev => ({ ...prev, state: "generating", error: null }));
    
    try {
      // 1. Create generation task
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: data.uploadedImage,
          color: data.selectedColor,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create generation task");
      }
      
      const { task_id } = await response.json();
      
      // 2. Poll for generation result
      await pollGenerationResult(task_id);
      
    } catch (error) {
      setData(prev => ({
        ...prev,
        state: "error",
        error: error instanceof Error ? error.message : "Generation failed"
      }));
    }
  };

  /**
   * Poll for generation result
   */
  const pollGenerationResult = async (taskId: string) => {
    const maxAttempts = 60; // Max 60 attempts (3 minutes)
    let attempts = 0;
    
    const poll = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        throw new Error("Generation timeout, please try again");
      }
      
      attempts++;
      
      try {
        const response = await fetch(`/api/generate/${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to check status");
        }
        
        const result = await response.json();
        
        switch (result.status) {
          case "success":
            setData(prev => ({
              ...prev,
              state: "success",
              resultImageUrl: result.result_url
            }));
            return;
            
          case "error":
            throw new Error(result.error || "Generation failed");
            
          case "processing":
            // Continue polling after 3 seconds
            setTimeout(poll, 3000);
            return;
            
          default:
            throw new Error("Unknown response status");
        }
      } catch (error) {
        throw error;
      }
    };
    
    await poll();
  };

  /**
   * 重置状态
   */
  const handleReset = () => {
    setData({
      state: "idle",
      selectedColor: "black",
      uploadedImage: null,
      resultImageUrl: null,
      error: null,
    });
  };

  // 从核心数据推导UI状态
  const canGenerate = data.uploadedImage && data.state !== "generating";
  const isGenerating = data.state === "generating";

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
            {/* 左侧：输入控制 */}
            <div className="space-y-4">
              <ImageUpload
                onImageUpload={handleImageUpload}
                isUploading={data.state === "uploading"}
                uploadedImageUrl={data.uploadedImage}
                onClear={() => setData(prev => ({ ...prev, uploadedImage: null }))}
              />
              
              <ColorSelector
                selectedColor={data.selectedColor}
                onColorSelect={handleColorSelect}
                disabled={isGenerating}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? "Generating..." : "Generate Buzz Cut"}
                </button>
              </div>
            </div>
            
            {/* 右侧：结果展示 */}
            <div>
              <ResultDisplay
                state={data.state}
                originalImage={data.uploadedImage}
                resultImage={data.resultImageUrl}
                error={data.error}
                onReset={handleReset}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}