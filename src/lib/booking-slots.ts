const OPEN_HOUR = 10;
const CLOSE_HOUR = 19;
const SLOT_MINUTES = 60;

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isPastDate(date: Date, today = new Date()): boolean {
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const b = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return a < b;
}

/** The Quiet House is closed Mondays. */
export function isClosedDay(date: Date): boolean {
  return date.getDay() === 1;
}

export function formatSlotLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = String(minute).padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

// Deterministic pseudo-random so the same date always shows the same
// "booked" slots (no backend, so we fake stable mock data from the date).
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

export type TimeSlot = {
  label: string;
  minutesFromOpen: number;
  booked: boolean;
};

export function getSlotsForDate(isoDate: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      const label = formatSlotLabel(h, m);
      const seed = `${isoDate}-${label}`;
      const booked = seededRandom(seed) < 0.3;
      slots.push({ label, minutesFromOpen: (h - OPEN_HOUR) * 60 + m, booked });
    }
  }
  return slots;
}
