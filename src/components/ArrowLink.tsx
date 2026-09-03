import Link from "next/link";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-6 py-4 ${className}`}
    >
      <span className="font-display text-lg italic">{children}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current transition-colors group-hover:bg-current">
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-none stroke-current transition-colors group-hover:stroke-tqh-blush"
          strokeWidth="1.2"
        >
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </span>
    </Link>
  );
}
