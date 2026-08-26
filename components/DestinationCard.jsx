import Image from "next/image";
import Link from "next/link";

/** Formats a price as Indian rupees with no decimals, e.g. ₹25,000. */
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * One destination card. Rendered from the static destination data, so the same
 * component serves both the India and International sections.
 */
export default function DestinationCard({ destination }) {
  const { name, country, image, description, price } = destination;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={`${name}, ${country}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink-900">{name}</h3>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink-500">
          {country}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
              Starting from
            </p>
            <p className="text-lg font-bold text-brand-700">
              {formatPrice(price)}
            </p>
          </div>

          <Link
            href="/contact"
            aria-label={`Enquire about travelling to ${name}`}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}
