import Link from "next/link";

const COLUMNS = [
  {
    heading: "The House",
    links: [
      { href: "/services", label: "Treatments" },
      { href: "/about", label: "Our Story" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { href: "/book", label: "Reserve" },
      { href: "/contact", label: "Directions" },
      { href: "/contact", label: "Enquiries" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-tqh-wine px-6 pb-8 pt-16 text-tqh-cream md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-2 gap-10 pb-14 text-sm md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className="text-tqh-cream/50">{col.heading}</span>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-tqh-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <span className="text-tqh-cream/50">Instagram</span>
            <a href="#" className="hover:text-tqh-accent">
              @thequiethouse
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-tqh-cream/50">Enquiries</span>
            <a href="mailto:hello@thequiethouse.com" className="hover:text-tqh-accent">
              hello@thequiethouse.com
            </a>
          </div>
        </div>

        <div className="divider" />

        <div className="grid grid-cols-1 gap-6 py-10 text-sm md:grid-cols-2">
          <div>
            <p>314 Ojai Avenue,</p>
            <p>Ojai, CA, 93023</p>
            <p className="mt-2 text-tqh-cream/60">(805) 555-0147</p>
          </div>
          <div>
            <p>Open Tuesday – Sunday</p>
            <p>10:00 AM – 7:00 PM</p>
            <p className="mt-2 text-tqh-cream/60">Closed Mondays</p>
          </div>
        </div>

        <div className="divider" />

        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-tqh-cream/50 md:flex-row md:items-center">
          <span>© The Quiet House 2026 · All Rights Reserved</span>
          <Link
            href="/contact"
            className="border border-tqh-cream/30 px-4 py-2"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
