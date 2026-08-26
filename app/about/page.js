import Image from "next/image";
import Link from "next/link";

import { OFFICES, WHY_CHOOSE_US } from "@/data/company";

export const metadata = {
  title: "About Travel Unbounded",
  description:
    "Headquartered in Bangalore with offices in Kochi and Nairobi, Travel Unbounded designs trips that blend comfort, culture and raw nature — all personally experienced by our team.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative isolate flex min-h-[340px] items-center overflow-hidden lg:min-h-[400px]">
        <Image
          src="/images/kenya.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand-900/70" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            India&apos;s Most Trusted Experiential Travel Experts
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
            We go where real stories are written, and we bring you along.
          </p>
        </div>
      </section>

      {/* Company story */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          Our Story
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
          Built around the people taking the journey
        </h2>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-500">
          <p>
            Travel Unbounded was born from a simple belief — that the best
            journeys aren&apos;t sold from a catalogue. They&apos;re built around
            the people taking them.
          </p>
          <p>
            Headquartered in Bangalore with offices in Kerala and Nairobi, we
            design trips that blend comfort, culture, and raw nature. Every
            destination, resort, and activity we recommend has been personally
            experienced by our team.
          </p>
          <p>
            From spotting the Big Five at dawn in the Masai Mara to cruising Ha
            Long Bay at sunset — we go where real stories are written, and we
            bring you along.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <header className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              What makes a Travel Unbounded trip different
            </h2>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-stone-200 bg-white p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office locations */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Where We Are
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            Our Offices
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-500">
            Three offices across two continents, so there is always someone on
            your timezone.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {OFFICES.map((office) => (
            <div
              key={office.city}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <p className="text-lg font-semibold text-brand-800">
                {office.city}
              </p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink-500">
                {office.label}
              </p>
              <address className="mt-4 text-sm not-italic leading-relaxed text-ink-500">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-brand-800">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to travel with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-100/85">
            Share your dates and interests — we&apos;ll take it from there.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>
    </>
  );
}
