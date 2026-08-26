import BookingForm from "@/components/BookingForm";
import { OFFICES } from "@/data/company";

export const metadata = {
  title: "Plan Your Trip",
  description:
    "Tell us where you want to go and how you like to travel. A Travel Unbounded expert will contact you within 24 hours with a custom itinerary.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-stone-200 bg-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Plan Your Trip
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
            Share a few details and one of our travel experts will get in touch
            within 24 hours to build an itinerary around you. No catalogues, no
            packages you did not ask for.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Enquiry form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-ink-900">
                Booking Enquiry
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                All enquiries are answered by a real travel expert.
              </p>

              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
          </div>

          {/* Office contact details */}
          <aside className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink-900">Our Offices</h2>
            <p className="mt-1 text-sm text-ink-500">
              Prefer to visit? We are in three cities.
            </p>

            <ul className="mt-6 space-y-5">
              {OFFICES.map((office) => (
                <li
                  key={office.city}
                  className="rounded-xl border border-stone-200 bg-white p-5"
                >
                  <p className="font-semibold text-brand-800">
                    {office.city}
                    <span className="ml-2 text-xs font-medium uppercase tracking-wider text-ink-500">
                      {office.label}
                    </span>
                  </p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-ink-500">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
