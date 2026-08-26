import Link from "next/link";

import DestinationSection from "@/components/DestinationSection";
import Hero from "@/components/Hero";
import {
  indiaDestinations,
  internationalDestinations,
} from "@/data/destinations";

export const metadata = {
  title: "Travel Unbounded | Experiential Travel Experts",
  description:
    "Custom journeys across Kerala, Himachal, Ladakh, Andaman, Goa, Kenya, Vietnam, Tanzania, Iceland and Sri Lanka — every one personally experienced by our team.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <DestinationSection
        id="india-destinations"
        eyebrow="Within India"
        title="India Destinations"
        description="From the backwaters of Kerala to the high passes of Ladakh — the India we show you is the one we keep going back to."
        destinations={indiaDestinations}
      />

      <DestinationSection
        id="international-destinations"
        eyebrow="Across the world"
        title="International Destinations"
        description="Safari camps in East Africa, limestone bays in Vietnam, glacier lagoons in Iceland. Run by our own teams on the ground."
        destinations={internationalDestinations}
        className="bg-sand-50"
      />

      {/* Closing call to action */}
      <section className="bg-brand-800">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-100/85">
            Tell us how you like to travel and we&apos;ll build the itinerary
            around you. A real travel expert replies within 24 hours.
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
