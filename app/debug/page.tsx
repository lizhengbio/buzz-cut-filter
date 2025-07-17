"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testKieAPI = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog("Testing kie.ai API connection...");
      
      const response = await fetch("/api/test-kie");
      const data = await response.json();
      
      addLog(`API Test Result: ${data.success ? "SUCCESS" : "FAILED"}`);
      addLog(`Status: ${data.status}`);
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);
      
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const testFullFlow = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog("Testing full generation flow...");
      
      // Create a test image (1x1 red pixel)
      const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      
      addLog("Step 1: Starting generation...");
      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64: testImageBase64,
          color: "black",
          tier: "free",
        }),
      });
      
      const generateData = await generateResponse.json();
      addLog(`Generate Response: ${JSON.stringify(generateData, null, 2)}`);
      
      if (!generateData.task_id) {
        throw new Error("No task_id received");
      }
      
      // Check status
      addLog("Step 2: Checking status...");
      const statusResponse = await fetch(`/api/generate/${generateData.task_id}`);
      const statusData = await statusResponse.json();
      addLog(`Status Response: ${JSON.stringify(statusData, null, 2)}`);
      
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Buzz Cut API Debug Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={testKieAPI}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Testing..." : "Test Kie API"}
            </Button>
            <Button 
              onClick={testFullFlow}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Testing..." : "Test Full Flow"}
            </Button>
            <Button 
              onClick={() => setLogs([])}
              variant="outline"
            >
              Clear Logs
            </Button>
          </div>
          
          <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500">No logs yet. Click a test button to start debugging.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}