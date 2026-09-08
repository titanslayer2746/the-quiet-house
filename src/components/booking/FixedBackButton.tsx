export function FixedBackButton({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="fixed bottom-6 left-6 z-40 md:bottom-10 md:left-10">
      <button
        type="button"
        onClick={onClick}
        className="group flex items-center gap-4 border border-tqh-wine bg-tqh-wine px-5 py-3 text-tqh-blush transition-colors hover:bg-tqh-wine/90"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth="1.2"
          >
            <path d="M16 10H4M9 5l-5 5 5 5" />
          </svg>
        </span>
        <span className="font-display text-lg italic">{label}</span>
      </button>
    </div>
  );
}
