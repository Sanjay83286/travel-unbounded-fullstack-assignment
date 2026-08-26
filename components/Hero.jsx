import Image from "next/image";
import Link from "next/link";

/** Full-width banner with headline, subheading and the primary call to action. */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden lg:min-h-[620px]">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        // The hero is the largest element above the fold, so it loads eagerly.
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Overlay keeps the headline readable regardless of the photo behind it. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />

      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
          Bangalore · Kochi · Nairobi
        </p>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          India&apos;s Most Trusted Experiential Travel Experts
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          The best journeys aren&apos;t sold from a catalogue. They&apos;re built
          around the people taking them — and every one we recommend, we&apos;ve
          travelled ourselves.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-full bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:w-auto"
          >
            Plan Your Trip
          </Link>
          <Link
            href="#india-destinations"
            className="w-full rounded-full border border-white/70 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
