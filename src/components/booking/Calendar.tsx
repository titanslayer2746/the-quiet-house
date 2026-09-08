"use client";

import { useState } from "react";
import { isClosedDay, isPastDate, toISODate } from "@/lib/booking-slots";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Calendar({
  selectedISO,
  onSelect,
}: {
  selectedISO?: string;
  onSelect: (iso: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  function goPrevMonth() {
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    setViewMonth(m);
    setViewYear(y);
  }

  function goNextMonth() {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewMonth(m);
    setViewYear(y);
  }

  const isPrevDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-2xl">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center border border-current disabled:cursor-not-allowed disabled:opacity-20"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.2">
              <path d="M12 5l-5 5 5 5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center border border-current"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.2">
              <path d="M8 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-tqh-wine/15 text-center text-xs uppercase tracking-wide">
        {WEEKDAYS.map((w) => (
          <div key={w} className="bg-tqh-blush py-2 text-tqh-wine/50">
            {w}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square bg-tqh-blush" />;
          const iso = toISODate(date);
          const disabled = isPastDate(date, today) || isClosedDay(date);
          const selected = iso === selectedISO;
          const isToday = iso === toISODate(today);
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`flex aspect-square items-center justify-center text-sm transition-colors ${
                selected
                  ? "bg-tqh-wine text-tqh-blush"
                  : disabled
                    ? "bg-tqh-blush text-tqh-wine/20 cursor-not-allowed"
                    : "bg-tqh-blush text-tqh-wine hover:bg-tqh-wine/10"
              } ${isToday && !selected ? "underline decoration-tqh-accent decoration-2 underline-offset-4" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
