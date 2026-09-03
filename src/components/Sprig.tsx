export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 29V13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M16 18C16 18 9 16.5 9 10.5C9 6.5 12 4 16 4C13.5 4 11 6.5 11 10C11 14.5 16 18 16 18Z"
        fill="currentColor"
      />
      <path
        d="M16 21C16 21 23 19.5 23 13.5C23 9.5 20 7 16 7C18.5 7 21 9.5 21 13C21 17.5 16 21 16 21Z"
        fill="currentColor"
      />
      <circle cx="16" cy="4" r="1.6" fill="currentColor" />
    </svg>
  );
}
