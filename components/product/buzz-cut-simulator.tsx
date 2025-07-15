"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Camera, Download, Share2, Loader2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface BuzzCutSimulatorProps {
  className?: string;
}

export function BuzzCutSimulator({ className }: BuzzCutSimulatorProps) {
  const [guardLength, setGuardLength] = useState([4]);
  const [hairColor, setHairColor] = useState("natural");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hairColors = [
    { value: "natural", label: "Natural", color: "#4a3c1d" },
    { value: "black", label: "Black", color: "#000000" },
    { value: "brown", label: "Brown", color: "#8b4513" },
    { value: "blonde", label: "Blonde", color: "#daa520" },
    { value: "gray", label: "Gray", color: "#808080" },
  ];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setUseCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setUseCamera(false);
  }, [cameraStream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setOriginalImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const processImage = useCallback(async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError(null);
    setProcessingStatus('Analyzing image...');
    
    try {
      // Import the image processing utility
      const { BuzzCutProcessor } = await import('@/utils/image-processing');
      
      setProcessingStatus('Detecting hair regions...');
      
      // Create processor instance
      const processor = new BuzzCutProcessor();
      
      setProcessingStatus('Applying buzz cut effect...');
      
      // Process the image with buzz cut effect
      const processedImage = await processor.processImage(originalImage, {
        guardLength: guardLength[0],
        hairColor: hairColor,
      });
      
      setProcessingStatus('Finalizing result...');
      setResultImage(processedImage);
      setProcessingStatus('');
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again.');
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, guardLength, hairColor]);

  const downloadResult = useCallback(() => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `buzz-cut-result-${guardLength[0]}mm.jpg`;
      link.click();
    }
  }, [resultImage, guardLength]);

  const shareResult = useCallback(async () => {
    if (resultImage && navigator.share) {
      try {
        await navigator.share({
          title: 'My Buzz Cut Preview',
          text: `Check out my ${guardLength[0]}mm buzz cut preview!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  }, [resultImage, guardLength]);

  return (
    <div className={className}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Scissors className="h-6 w-6" />
            Buzz Cut Simulator
          </CardTitle>
          <CardDescription>
            Try on different buzz cut lengths and colors instantly
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Upload/Camera Section */}
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Photo</TabsTrigger>
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-4"
                >
                  Choose Photo
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="camera" className="space-y-4">
              <div className="text-center">
                {!useCamera ? (
                  <Button onClick={startCamera} className="mb-4">
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button onClick={capturePhoto}>
                        Capture Photo
                      </Button>
                      <Button onClick={stopCamera} variant="outline">
                        Stop Camera
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Controls Section */}
          {originalImage && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Guard Length Control */}
                <div className="space-y-2">
                  <Label htmlFor="guard-length">
                    Guard Length: {guardLength[0]}mm
                  </Label>
                  <Slider
                    id="guard-length"
                    min={1}
                    max={12}
                    step={1}
                    value={guardLength}
                    onValueChange={setGuardLength}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1mm</span>
                    <span>12mm</span>
                  </div>
                </div>

                {/* Hair Color Control */}
                <div className="space-y-2">
                  <Label>Hair Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {hairColors.map((color) => (
                      <Button
                        key={color.value}
                        variant={hairColor === color.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHairColor(color.value)}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: color.color }}
                        />
                        {color.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={processImage} 
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {processingStatus || 'Processing...'}
                  </>
                ) : (
                  'Generate Buzz Cut'
                )}
              </Button>
              
              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Image Preview Section */}
          {originalImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Original</Badge>
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
              
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Result</Badge>
                <div className="w-full h-64 rounded-lg border flex items-center justify-center bg-gray-50">
                  {isProcessing ? (
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  ) : resultImage ? (
                    <img 
                      src={resultImage} 
                      alt="Result" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">Click Generate to see result</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Download/Share Section */}
          {resultImage && (
            <div className="flex gap-4 justify-center">
              <Button onClick={downloadResult} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={shareResult} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}