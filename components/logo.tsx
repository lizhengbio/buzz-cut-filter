import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <span className="text-2xl">🔥</span>
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Buzz Cut AI
      </span>
    </Link>
  );
}
