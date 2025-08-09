import Link from "next/link";
import { Logo } from "./logo";
import HeaderClient from "./header_client";
import { createClient } from "@/utils/supabase/server";

interface NavItem {
  label: string;
  href: string;
}

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const mainNavItems: NavItem[] = [
    { label: "Simulator", href: "/buzz-cut-simulator" },
    { label: "Guides", href: "/buzz-cut-guides" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm border-gray-200/50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-8">
          <Logo />
          {/* Nav rendering moved to client for pathname detection only */}
          <nav className="hidden md:flex items-center gap-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        <HeaderClient user={{ id: user?.id ?? null, email: user?.email ?? null }} navItems={mainNavItems} />
      </div>
    </header>
  );
}
