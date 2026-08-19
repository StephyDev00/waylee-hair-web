import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 text-ink transition-colors hover:text-wine ${className}`}
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-ink md:h-12 md:w-12">
        <Image
          src="/images/logo/waylee-icon.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="48px"
          priority
        />
      </span>
      <span className="font-serif font-bold tracking-wide">
        <span className="block text-2xl leading-none md:text-3xl">WAYLEE</span>
        <span className="block text-[0.6rem] tracking-[0.35em] uppercase text-wine font-sans font-medium md:text-xs">
          Hair &amp; Beauty
        </span>
      </span>
    </Link>
  );
}
