"use client";

import { Coins, Crown, Clock } from "lucide-react";
import { CreditTransaction } from "@/types/creem";
import { formatDate } from "@/lib/utils";

type CreditsBalanceCardProps = {
  credits: number;
  recentHistory: CreditTransaction[];
  isSubscribed?: boolean;
};

export function CreditsBalanceCard({
  credits,
  recentHistory,
  isSubscribed = false,
}: CreditsBalanceCardProps) {
  const canGenerate = isSubscribed || credits >= 5;
  const maxGenerations = Math.floor(credits / 5);

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${isSubscribed ? 'bg-yellow-100' : 'bg-primary/10'}`}>
          {isSubscribed ? (
            <Crown className="h-6 w-6 text-yellow-600" />
          ) : (
            <Coins className="h-6 w-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {isSubscribed ? "Premium Credits" : "Available Credits"}
          </p>
          <h3 className="text-2xl font-bold mt-1">
            {credits}
          </h3>
        </div>
      </div>
      
      {/* Generation Info */}
      <div className="mt-4 p-3 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Generations available:</span>
          <span className={`font-medium ${canGenerate ? 'text-green-600' : 'text-red-600'}`}>
            {maxGenerations}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Cost per generation:</span>
          <span className="font-medium">
            5 credits {isSubscribed ? "(Premium rate)" : ""}
          </span>
        </div>
      </div>

      {/* Daily Credits Info for Free Users */}
      {!isSubscribed && (
        <div className="mt-4 p-3 rounded-lg border border-blue-200 bg-blue-50">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Daily Credits:</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            Free users get 10 credits daily. Credits reset every 24 hours.
          </p>
        </div>
      )}

      {/* Premium Info for Subscribed Users */}
      {isSubscribed && (
        <div className="mt-4 p-3 rounded-lg border border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-2 text-sm text-yellow-800">
            <Crown className="h-4 w-4" />
            <span className="font-medium">Premium Subscription:</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            You receive monthly credits with your subscription. Credits accumulate and don't expire.
          </p>
        </div>
      )}

      {/* Recent Activity */}
      {recentHistory.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">Recent Activity</p>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {recentHistory.map((history, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm py-1"
              >
                <span
                  className={
                    history.type === "add" ? "text-green-600" : "text-red-600"
                  }
                >
                  {history.type === "add" ? "+" : "-"}
                  {history.amount}
                  <span className="text-muted-foreground ml-1 text-xs">
                    {history.type === "add" ? "granted" : "spent"}
                  </span>
                </span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(history.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
