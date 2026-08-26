/**
 * Values shared by the booking form, the client-side validator and the server-side
 * validator. Keeping them in one module means the dropdown options and the accepted
 * values can never drift apart.
 */

/** Hotel tiers offered on the enquiry form. */
export const HOTEL_CATEGORIES = ["Standard", "Deluxe", "Luxury"];

/** Dialling codes offered by the phone country-code selector. */
export const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA / Canada" },
  { code: "+44", label: "United Kingdom" },
  { code: "+61", label: "Australia" },
  { code: "+65", label: "Singapore" },
  { code: "+971", label: "UAE" },
  { code: "+254", label: "Kenya" },
  { code: "+255", label: "Tanzania" },
  { code: "+84", label: "Vietnam" },
  { code: "+94", label: "Sri Lanka" },
  { code: "+354", label: "Iceland" },
];

/** Defensive upper bounds so a single enquiry cannot carry absurd values. */
export const MAX_PEOPLE = 50;
export const MAX_CHILDREN = 50;
