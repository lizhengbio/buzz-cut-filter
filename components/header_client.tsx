"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { MobileNav } from "./mobile-nav";
import { signOutAction } from "@/app/actions";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderClientProps {
  user: { id: string | null; email: string | null };
  navItems: NavItem[];
}

export default function HeaderClient({ user, navItems }: HeaderClientProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <div className="flex items-center gap-3">
      <ThemeSwitcher />
      {user?.id ? (
        <div className="hidden md:flex items-center gap-3">
          {isDashboard && (
            <span className="hidden sm:inline text-sm text-gray-500">
              {user.email}
            </span>
          )}
          {!isDashboard && (
            <Button asChild size="sm" variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
          <form action={signOutAction}>
            <Button type="submit" variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex gap-3">
          <Button asChild size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-white font-medium shadow-sm">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
      <MobileNav items={navItems} user={user} isDashboard={isDashboard} />
    </div>
  );
}


