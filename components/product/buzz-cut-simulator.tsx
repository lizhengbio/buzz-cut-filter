"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { useCredits } from "@/hooks/use-credits";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "./image-upload";
import { ColorSelector } from "./color-selector";
import { ResultDisplay } from "./result-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coins, User, Crown } from "lucide-react";

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
  const router = useRouter();
  const { user } = useUser();
  const { credits, loading: creditsLoading, canGenerateImage, refreshCredits, isSubscribed } = useCredits();
  const { toast } = useToast();
  
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

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate buzz cut images.",
        variant: "destructive",
      });
      router.push('/sign-in');
      return;
    }

    // Check if user can generate
    if (!canGenerateImage) {
      const message = isSubscribed 
        ? "Something went wrong. Please try again." 
        : `You need 5 credits to generate. You have ${credits?.credits || 0} credits.`;
      
      toast({
        title: "Cannot Generate",
        description: message,
        variant: "destructive",
      });
      return;
    }

    setStatus("generating");
    setError(null);
    
    try {
      console.log("🚀 Starting generation with:", {
        imageBase64Length: imageBase64.length,
        color: selectedColor,
        tier: isSubscribed ? "pro" : "free"
      });
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64: imageBase64,
          color: selectedColor,
          tier: isSubscribed ? "pro" : "free",
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          // Authentication required
          toast({
            title: "Authentication Required",
            description: data.error || "Please sign in to generate images.",
            variant: "destructive",
          });
          router.push('/sign-in');
          return;
        } else if (response.status === 402) {
          // Insufficient credits
          toast({
            title: "Insufficient Credits",
            description: data.error || "You don't have enough credits to generate.",
            variant: "destructive",
          });
          refreshCredits(); // Refresh to show current credits
          setStatus("idle");
          return;
        }
        throw new Error(data.error || "Failed to generate buzz cut");
      }
      
      // Refresh credits after successful generation start
      if (!isSubscribed) {
        refreshCredits();
      }
      
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
      // Refresh credits in case there was a refund
      if (!isSubscribed) {
        refreshCredits();
      }
    }
  };

  const renderCreditsInfo = () => {
    if (!user) {
      return (
        <Alert className="mb-4">
          <User className="h-4 w-4" />
          <AlertDescription>
            <strong>Sign in required:</strong> Please sign in to use the buzz cut generator. Free users get 10 credits daily!
          </AlertDescription>
        </Alert>
      );
    }

    if (!canGenerateImage && !isSubscribed) {
      return (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <Coins className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Insufficient Credits:</strong> You need 5 credits to generate. 
            {credits?.credits === 0 ? " Sign in daily for free credits!" : ` You have ${credits?.credits || 0} credits.`}
          </AlertDescription>
        </Alert>
      );
    }

    return null;
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
          {renderCreditsInfo()}
          
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
                <Button
                  onClick={handleGenerate}
                  disabled={!uploadedImageUrl || status === "generating" || (!user || (!canGenerateImage && !isSubscribed))}
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {status === "generating" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Your Look...
                    </div>
                  ) : !user ? (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Sign In to Generate
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✨</span>
                      Generate My Buzz Cut
                      {!isSubscribed && (
                        <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                          5 credits
                        </span>
                      )}
                    </div>
                  )}
                </Button>
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
                  refreshCredits();
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}