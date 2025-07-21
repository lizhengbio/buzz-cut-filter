"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";


interface HeaderProps {
  user: any;
}

interface NavItem {
  label: string;
  href: string;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  // Main navigation items that are always shown
  const mainNavItems: NavItem[] = [
    { label: "Simulator", href: "/buzz-cut-simulator" },
    { label: "Guides", href: "/buzz-cut-guides" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  // Dashboard items - empty array as we don't want navigation items in dashboard
  const dashboardItems: NavItem[] = [];

  // Choose which navigation items to show
  const navItems = isDashboard ? dashboardItems : mainNavItems;

  return (
    <>
      {/* Main header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white border-gray-200">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {isDashboard && (
                  <span className="hidden sm:inline text-sm text-gray-600">
                    {user.email}
                  </span>
                )}
                {!isDashboard && (
                  <Button asChild size="sm" variant="default">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                )}
                <form action={signOutAction}>
                  <Button type="submit" variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:border-gray-400">
                    Sign out
                  </Button>
                </form>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button asChild size="sm" variant="ghost" className="text-gray-600 hover:text-gray-800">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button asChild size="sm" variant="default" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium border-0 shadow-sm">
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            )}
            <MobileNav items={navItems} user={user} isDashboard={isDashboard} />
          </div>
        </div>
      </header>
    </>
  );
}
