const STEPS = ["Service", "Date & Time", "Details"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-widest">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const active = n === current;
        const done = n < current;
        return (
          <span key={label} className="flex items-center gap-3">
            {i > 0 ? <span className="opacity-30">—</span> : null}
            <span
              className={
                active
                  ? "text-tqh-wine"
                  : done
                    ? "text-tqh-wine/60"
                    : "text-tqh-wine/30"
              }
            >
              {String(n).padStart(2, "0")} {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}
