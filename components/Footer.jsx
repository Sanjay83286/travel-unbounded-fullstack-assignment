import Link from "next/link";

import { OFFICES } from "@/data/company";

/** Site footer. A Server Component — it renders static content and ships no JavaScript. */
export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">Travel Unbounded</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-100/80">
              India&apos;s most trusted experiential travel experts. Every trip we
              recommend has been personally experienced by our team.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Plan Your Trip
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Offices
            </p>
            <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <span className="font-medium text-white">{office.city}</span>
                  {" — "}
                  {office.country}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-brand-100/70">
          © {new Date().getFullYear()} Travel Unbounded. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
