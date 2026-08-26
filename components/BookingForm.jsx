"use client";

import { useState } from "react";

import { COUNTRY_CODES, HOTEL_CATEGORIES } from "@/lib/constants";
import { todayAsIsoDate, validateEnquiry } from "@/lib/validators/enquiry";
import SuccessPanel from "@/components/SuccessPanel";

const INITIAL_FORM_DATA = {
  fullName: "",
  countryCode: "+91",
  contactNumber: "",
  email: "",
  dateOfTravel: "",
  numberOfPeople: "1",
  hotelCategory: "",
  numberOfChildren: "0",
};

/** Shared class strings so every control looks identical. */
const fieldClass =
  "rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-stone-400 focus:border-brand-600";
const labelClass = "block text-sm font-medium text-ink-900";

function borderClass(hasError) {
  return hasError ? "border-red-500" : "border-stone-300";
}

/** Inline, accessible error text shown beneath a field. */
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

/**
 * The booking enquiry form.
 *
 * A Client Component because it owns form state, runs validation and calls the API.
 * Status flows through one state machine: idle → submitting → success | error.
 */
export default function BookingForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const isSubmitting = status === "submitting";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));

    // Clear a field's error as soon as the user starts correcting it.
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitError("");
    setStatus("idle");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    // Client-side validation: instant feedback, no network round trip.
    const { isValid, errors: validationErrors } = validateEnquiry(formData);

    if (!isValid) {
      setErrors(validationErrors);
      setStatus("idle");
      setSubmitError("");

      // Move focus to the first invalid field for keyboard and screen-reader users.
      const firstInvalidField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrors({});
    setSubmitError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        // The server re-validates independently; surface its field errors if it sent any.
        if (result.errors) setErrors(result.errors);
        setSubmitError(
          result.message ||
            "Something went wrong while submitting your enquiry. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      // Thrown when the request never reached the server at all (offline, DNS, CORS).
      setSubmitError(
        "We could not reach our servers. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return <SuccessPanel onReset={resetForm} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-semibold">Your enquiry could not be submitted</p>
          <p className="mt-1">{submitError}</p>
        </div>
      )}

      {/* Full name */}
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Sanjay Chary"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`mt-1.5 w-full ${fieldClass} ${borderClass(errors.fullName)}`}
        />
        <FieldError id="fullName-error" message={errors.fullName} />
      </div>

      {/* Contact number with country code selector */}
      <div>
        <label htmlFor="contactNumber" className={labelClass}>
          Contact Number <span className="text-red-600">*</span>
        </label>
        <div className="mt-1.5 flex gap-2">
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            aria-label="Country dialling code"
            className={`w-28 shrink-0 ${fieldClass} ${borderClass(
              errors.countryCode
            )}`}
          >
            {COUNTRY_CODES.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.code}
              </option>
            ))}
          </select>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            inputMode="numeric"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="9876543210"
            aria-invalid={Boolean(errors.contactNumber)}
            aria-describedby={
              errors.contactNumber ? "contactNumber-error" : undefined
            }
            className={`min-w-0 flex-1 ${fieldClass} ${borderClass(
              errors.contactNumber
            )}`}
          />
        </div>
        <FieldError id="contactNumber-error" message={errors.contactNumber} />
        <FieldError id="countryCode-error" message={errors.countryCode} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`mt-1.5 w-full ${fieldClass} ${borderClass(errors.email)}`}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      {/* Date of travel */}
      <div>
        <label htmlFor="dateOfTravel" className={labelClass}>
          Date of Travel <span className="text-red-600">*</span>
        </label>
        <input
          id="dateOfTravel"
          name="dateOfTravel"
          type="date"
          value={formData.dateOfTravel}
          onChange={handleChange}
          // Blocks past dates in the native picker; the validator still enforces it.
          min={todayAsIsoDate()}
          aria-invalid={Boolean(errors.dateOfTravel)}
          aria-describedby={errors.dateOfTravel ? "dateOfTravel-error" : undefined}
          className={`mt-1.5 w-full ${fieldClass} ${borderClass(errors.dateOfTravel)}`}
        />
        <FieldError id="dateOfTravel-error" message={errors.dateOfTravel} />
      </div>

      {/* People and children */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="numberOfPeople" className={labelClass}>
            Number of People <span className="text-red-600">*</span>
          </label>
          <input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            min="1"
            step="1"
            value={formData.numberOfPeople}
            onChange={handleChange}
            aria-invalid={Boolean(errors.numberOfPeople)}
            aria-describedby={
              errors.numberOfPeople ? "numberOfPeople-error" : undefined
            }
            className={`mt-1.5 w-full ${fieldClass} ${borderClass(errors.numberOfPeople)}`}
          />
          <FieldError id="numberOfPeople-error" message={errors.numberOfPeople} />
        </div>

        <div>
          <label htmlFor="numberOfChildren" className={labelClass}>
            Number of Children{" "}
            <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            id="numberOfChildren"
            name="numberOfChildren"
            type="number"
            min="0"
            step="1"
            value={formData.numberOfChildren}
            onChange={handleChange}
            aria-invalid={Boolean(errors.numberOfChildren)}
            aria-describedby={
              errors.numberOfChildren ? "numberOfChildren-error" : undefined
            }
            className={`mt-1.5 w-full ${fieldClass} ${borderClass(
              errors.numberOfChildren
            )}`}
          />
          <FieldError
            id="numberOfChildren-error"
            message={errors.numberOfChildren}
          />
        </div>
      </div>

      {/* Hotel category */}
      <div>
        <label htmlFor="hotelCategory" className={labelClass}>
          Hotel Category <span className="text-red-600">*</span>
        </label>
        <select
          id="hotelCategory"
          name="hotelCategory"
          value={formData.hotelCategory}
          onChange={handleChange}
          aria-invalid={Boolean(errors.hotelCategory)}
          aria-describedby={errors.hotelCategory ? "hotelCategory-error" : undefined}
          className={`mt-1.5 w-full ${fieldClass} ${borderClass(errors.hotelCategory)}`}
        >
          <option value="">Select a category</option>
          {HOTEL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <FieldError id="hotelCategory-error" message={errors.hotelCategory} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-600/60"
      >
        {isSubmitting && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {isSubmitting ? "Submitting…" : "Submit Enquiry"}
      </button>

      <p className="text-center text-xs text-ink-500">
        Fields marked <span className="text-red-600">*</span> are required. We
        never share your details with third parties.
      </p>
    </form>
  );
}
