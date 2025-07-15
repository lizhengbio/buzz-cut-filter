"use client";

import { useState, useCallback } from "react";
import { useUser } from "./use-user";

interface BuzzCutSettings {
  guardLength: number;
  hairColor: string;
}

interface BuzzCutResult {
  originalImage: string;
  resultImage: string;
  settings: BuzzCutSettings;
  taskId: string;
  processedAt: Date;
}

export function useBuzzCut() {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<BuzzCutResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (
    image: string,
    guardLength: number,
    hairColor: string
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/buzzcut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          guard: guardLength,
          color: hairColor,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const result = await response.json();
      
      const buzzCutResult: BuzzCutResult = {
        originalImage: image,
        resultImage: result.result_url,
        settings: { guardLength, hairColor },
        taskId: result.task_id,
        processedAt: new Date(),
      };

      setResults(prev => [buzzCutResult, ...prev]);
      return buzzCutResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  const canUseFeature = useCallback(() => {
    // For MVP, all features are free
    return true;
  }, [user]);

  const getRemainingCredits = useCallback(() => {
    // For MVP, unlimited usage
    return null;
  }, [user]);

  return {
    isProcessing,
    results,
    error,
    processImage,
    clearResults,
    canUseFeature,
    getRemainingCredits,
  };
}