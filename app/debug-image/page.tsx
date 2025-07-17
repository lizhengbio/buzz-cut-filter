"use client";

import { useState } from "react";

export default function DebugImagePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      // First upload the image
      const formData = new FormData();
      formData.append("image", file);
      
      const uploadResponse = await fetch("/api/upload-temp-image", {
        method: "POST",
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }
      
      const uploadData = await uploadResponse.json();
      console.log("Upload data:", uploadData);
      
      setUploadedImageBase64(uploadData.imageBase64);
      
      // Then verify the image
      const verifyResponse = await fetch("/api/verify-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64: uploadData.imageBase64
        }),
      });
      
      if (!verifyResponse.ok) {
        throw new Error("Verification failed");
      }
      
      const verifyData = await verifyResponse.json();
      setResult(verifyData);
      
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: error instanceof Error ? error.message : String(error) });
    } finally {
      setLoading(false);
    }
  };

  const testGeneration = async () => {
    if (!uploadedImageBase64) {
      alert("Please upload an image first");
      return;
    }
    
    setLoading(true);
    try {
      console.log("Testing Flux generation with base64 length:", uploadedImageBase64.length);
      
      // Test the direct Flux endpoint
      const response = await fetch("/api/test-flux-direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64: uploadedImageBase64,
          color: "black",
        }),
      });
      
      const data = await response.json();
      console.log("Flux direct test result:", data);
      
      setResult(prev => ({
        ...prev,
        fluxDirectTest: data
      }));
      
    } catch (error) {
      console.error("Flux direct test error:", error);
      setResult(prev => ({
        ...prev,
        fluxDirectError: error instanceof Error ? error.message : String(error)
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Debug Tool</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload & Verify Image</h2>
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileUpload(file);
              }
            }}
            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          {uploadedImageBase64 && (
            <button
              onClick={testGeneration}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 mr-4"
            >
              Test Generation
            </button>
          )}
          
          {loading && <div className="text-blue-600">Processing...</div>}
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Debug Results</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        {uploadedImageBase64 && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Uploaded Image Preview</h2>
            <div className="mb-4">
              <strong>Base64 Length:</strong> {uploadedImageBase64.length}
            </div>
            <div className="mb-4">
              <strong>Base64 Preview:</strong> {uploadedImageBase64.substring(0, 100)}...
            </div>
            <img 
              src={uploadedImageBase64}
              alt="Uploaded"
              className="max-w-md border rounded"
              onError={() => console.error("Failed to display image")}
            />
          </div>
        )}
      </div>
    </div>
  );
}