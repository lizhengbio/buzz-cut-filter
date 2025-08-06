"use client";

import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export function DailyCreditGranter() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const grantDailyCredits = async () => {
      if (!user?.email) return;

      try {
        console.log(`🎯 Requesting daily credits for: ${user.email}`);
        
        const response = await fetch('/api/credits/daily-grant', {
          method: 'POST',
        });
        
        const data = await response.json();
        console.log('📊 Daily credits response:', data);
        
        if (response.ok && data.granted) {
          console.log(`✅ Daily credits granted to: ${user.email}`);
          // Optionally refresh the page to show updated credits
          router.refresh();
        }
      } catch (error) {
        console.error('❌ Failed to grant daily credits:', error);
      }
    };

    // Grant credits when component mounts and user is available
    if (user) {
      grantDailyCredits();
    }
  }, [user, router]);

  // This component doesn't render anything visible
  return null;
}