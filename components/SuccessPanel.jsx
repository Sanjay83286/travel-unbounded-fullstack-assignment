/**
 * Confirmation shown after an enquiry is stored successfully.
 *
 * The brief asks for a real UI element rather than an alert(), so this replaces the
 * form entirely — which also makes an accidental duplicate submission impossible.
 */
export default function SuccessPanel({ onReset }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-brand-100 bg-brand-50 p-8 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600">
        <span aria-hidden="true" className="text-2xl text-white">
          ✓
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold text-brand-800">
        Thank you! Your enquiry has been received.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
        Our travel expert will contact you within 24 hours to start building your
        itinerary.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
      >
        Submit another enquiry
      </button>
    </div>
  );
}
