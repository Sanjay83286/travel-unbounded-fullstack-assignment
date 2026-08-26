import DestinationCard from "@/components/DestinationCard";

/**
 * A titled grid of destination cards.
 *
 * The grid reflows from one column on mobile, to two on tablet, to three on desktop,
 * which satisfies the responsive layout requirement without any custom media queries.
 */
export default function DestinationSection({
  id,
  eyebrow,
  title,
  description,
  destinations,
  className = "",
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-500">
            {description}
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
