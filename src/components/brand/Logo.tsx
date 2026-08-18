import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-serif font-bold tracking-wide text-ink hover:text-wine transition-colors ${className}`}
    >
      <span className="text-2xl md:text-3xl">WAYLEE</span>
      <span className="block text-[0.6rem] md:text-xs tracking-[0.35em] uppercase text-wine font-sans font-medium">
        Hair &amp; Beauty
      </span>
    </Link>
  );
}
