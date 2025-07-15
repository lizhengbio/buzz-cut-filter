import Link from "next/link";
import { Scissors } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Scissors className="w-6 h-6" />
      <span className="font-bold text-lg">BuzzCut AI</span>
    </Link>
  );
}
