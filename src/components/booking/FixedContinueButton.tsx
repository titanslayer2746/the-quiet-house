export function FixedContinueButton({
  onClick,
  label = "Continue",
  show,
}: {
  onClick: () => void;
  label?: string;
  show: boolean;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out md:bottom-10 md:right-10 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="group flex items-center gap-4 border border-tqh-wine bg-tqh-wine px-5 py-3 text-tqh-blush transition-colors hover:bg-tqh-wine/90"
      >
        <span className="font-display text-lg italic">{label}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-current">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth="1.2"
          >
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </span>
      </button>
    </div>
  );
}
