"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get user on mount
    getUser();

    // Listen for changes on auth state (login, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 检测到认证回调后强制刷新用户状态
  useEffect(() => {
    if (searchParams.get("auth_callback") === "true") {
      // 延迟一下确保 cookie 已设置
      setTimeout(() => {
        getUser();
      }, 100);
    }
  }, [searchParams]);

  async function getUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setLoading(false);
    }
  }

  return { user, loading };
}
