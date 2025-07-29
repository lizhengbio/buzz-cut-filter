import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Image
        src="/images/BuzzCut AI Logo.png"
        alt="Buzz Cut AI Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Buzz Cut AI
      </span>
    </Link>
  );
}
