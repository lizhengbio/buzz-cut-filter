"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { getUserCredits, canGenerate, type CustomerCredits } from "@/utils/credits";

export function useCredits() {
  const { user } = useUser();
  const [credits, setCredits] = useState<CustomerCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [canGenerateImage, setCanGenerateImage] = useState(false);

  useEffect(() => {
    if (!user) {
      setCredits(null);
      setCanGenerateImage(false);
      setLoading(false);
      return;
    }

    fetchCredits();
  }, [user]);

  const fetchCredits = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [creditsData, generationCheck] = await Promise.all([
        getUserCredits(user.id),
        canGenerate(user.id)
      ]);

      setCredits(creditsData);
      setCanGenerateImage(generationCheck.canGenerate);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = () => {
    fetchCredits();
  };

  return {
    credits,
    loading,
    canGenerateImage,
    refreshCredits,
    isSubscribed: credits?.isSubscribed || false
  };
}