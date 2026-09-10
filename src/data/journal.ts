export type JournalEntry = {
  number: string;
  date: string;
  title: string;
  excerpt: string;
  src: string;
  tone: "clay" | "moss" | "sand" | "wine";
};

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    number: "N.003",
    date: "25·SEP·26",
    title: "Stillness is the treatment",
    excerpt:
      "We used to think of rest as the reward at the end of a service. Here it is the service — the pause between the scissors and the mirror, the quiet before the colour is rinsed. A short note on why we build every appointment around slowing down.",
    src: "/journal-teaser.jpg",
    tone: "clay",
  },
  {
    number: "N.002",
    date: "12·SEP·26",
    title: "The case for a slower haircut",
    excerpt:
      "A good cut is mostly listening. Before a single strand is touched we spend ten minutes on how you wash, part, and actually wear your hair — because the best cut is the one that still works on a Wednesday morning.",
    src: "/hero-1.jpg",
    tone: "wine",
  },
  {
    number: "N.001",
    date: "28·AUG·26",
    title: "Colour that grows out gracefully",
    excerpt:
      "Soft roots, hand-painted lift, a gloss to finish. Why we favour colour that ages well over colour that demands a standing appointment — and how to talk to your colourist about the difference.",
    src: "/bottom-cta-home.jpg",
    tone: "moss",
  },
];
