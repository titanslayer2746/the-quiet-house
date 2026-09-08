"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type BookingDraft = {
  step: number;
  serviceName?: string;
  date?: string; // ISO yyyy-mm-dd
  time?: string; // "10:00 AM"
  name?: string;
  email?: string;
  phone?: string;
};

export type ConfirmedBooking = BookingDraft & {
  code: string;
  confirmedAt: string;
};

const DRAFT_KEY = "tqh_booking_draft";
const CONFIRMED_KEY = "tqh_booking_confirmed";

const EMPTY_DRAFT: BookingDraft = { step: 1 };

type BookingContextValue = {
  draft: BookingDraft;
  updateDraft: (patch: Partial<BookingDraft>) => void;
  resetDraft: () => void;
  confirm: () => ConfirmedBooking;
  getConfirmed: () => ConfirmedBooking | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode etc.) — booking still works
    // in-memory for the session, it just won't survive a refresh.
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(EMPTY_DRAFT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readJSON<BookingDraft>(DRAFT_KEY);
    if (stored) setDraft(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeJSON(DRAFT_KEY, draft);
  }, [draft, hydrated]);

  const updateDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }, []);

  const confirm = useCallback((): ConfirmedBooking => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    const confirmed: ConfirmedBooking = {
      ...draft,
      code,
      confirmedAt: new Date().toISOString(),
    };
    writeJSON(CONFIRMED_KEY, confirmed);
    return confirmed;
  }, [draft]);

  const getConfirmed = useCallback(() => {
    return readJSON<ConfirmedBooking>(CONFIRMED_KEY);
  }, []);

  return (
    <BookingContext.Provider
      value={{ draft, updateDraft, resetDraft, confirm, getConfirmed }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
