import {
  COUNTRY_CODES,
  HOTEL_CATEGORIES,
  MAX_CHILDREN,
  MAX_PEOPLE,
} from "@/lib/constants";

/**
 * A single set of enquiry rules, imported by BOTH the browser form and the API route.
 *
 * The client runs them to give immediate feedback; the server runs the exact same
 * rules again because anything arriving at the API is untrusted — a request can be
 * sent with curl or Postman and never touch the React form at all.
 *
 * This module is intentionally dependency-free so it can run in either environment.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const VALID_COUNTRY_CODES = COUNTRY_CODES.map((entry) => entry.code);

/** Today as YYYY-MM-DD, used to reject travel dates that are not in the future. */
export function todayAsIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Parses a value that may arrive as a number or as a string from a form input. */
function toInteger(value) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : NaN;
  }
  if (typeof value === "string" && value.trim() !== "") {
    return /^-?\d+$/.test(value.trim()) ? Number(value.trim()) : NaN;
  }
  return NaN;
}

/**
 * Validates a raw enquiry payload.
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateEnquiry(payload = {}) {
  const errors = {};

  // --- Full name -----------------------------------------------------------
  const fullName = String(payload.fullName ?? "").trim();
  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length > 100) {
    errors.fullName = "Full name must be 100 characters or fewer.";
  }

  // --- Country code --------------------------------------------------------
  const countryCode = String(payload.countryCode ?? "").trim();
  if (!countryCode) {
    errors.countryCode = "Country code is required.";
  } else if (!VALID_COUNTRY_CODES.includes(countryCode)) {
    errors.countryCode = "Please select a valid country code.";
  }

  // --- Contact number ------------------------------------------------------
  const contactNumber = String(payload.contactNumber ?? "").trim();
  const digitsOnly = contactNumber.replace(/[\s()-]/g, "");
  if (!contactNumber) {
    errors.contactNumber = "Contact number is required.";
  } else if (!/^\d+$/.test(digitsOnly)) {
    errors.contactNumber = "Contact number may only contain digits.";
  } else if (digitsOnly.length < 6 || digitsOnly.length > 15) {
    errors.contactNumber = "Contact number must be between 6 and 15 digits.";
  }

  // --- Email ---------------------------------------------------------------
  const email = String(payload.email ?? "").trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // --- Date of travel ------------------------------------------------------
  const dateOfTravel = String(payload.dateOfTravel ?? "").trim();
  if (!dateOfTravel) {
    errors.dateOfTravel = "Date of travel is required.";
  } else if (!DATE_PATTERN.test(dateOfTravel)) {
    errors.dateOfTravel = "Please enter a valid date.";
  } else if (Number.isNaN(new Date(`${dateOfTravel}T00:00:00Z`).getTime())) {
    errors.dateOfTravel = "Please enter a valid date.";
  } else if (dateOfTravel <= todayAsIsoDate()) {
    // ISO date strings compare correctly with <=, which sidesteps timezone drift.
    errors.dateOfTravel = "Date of travel must be a future date.";
  }

  // --- Number of people ----------------------------------------------------
  const numberOfPeople = toInteger(payload.numberOfPeople);
  if (payload.numberOfPeople === undefined || payload.numberOfPeople === "") {
    errors.numberOfPeople = "Number of people is required.";
  } else if (Number.isNaN(numberOfPeople)) {
    errors.numberOfPeople = "Number of people must be a whole number.";
  } else if (numberOfPeople < 1) {
    errors.numberOfPeople = "There must be at least 1 person travelling.";
  } else if (numberOfPeople > MAX_PEOPLE) {
    errors.numberOfPeople = `Please contact us directly for groups larger than ${MAX_PEOPLE}.`;
  }

  // --- Hotel category ------------------------------------------------------
  const hotelCategory = String(payload.hotelCategory ?? "").trim();
  if (!hotelCategory) {
    errors.hotelCategory = "Please choose a hotel category.";
  } else if (!HOTEL_CATEGORIES.includes(hotelCategory)) {
    errors.hotelCategory = "Please choose a valid hotel category.";
  }

  // --- Number of children (optional) ---------------------------------------
  const rawChildren = payload.numberOfChildren;
  if (rawChildren !== undefined && rawChildren !== null && rawChildren !== "") {
    const numberOfChildren = toInteger(rawChildren);
    if (Number.isNaN(numberOfChildren)) {
      errors.numberOfChildren = "Number of children must be a whole number.";
    } else if (numberOfChildren < 0) {
      errors.numberOfChildren = "Number of children cannot be negative.";
    } else if (numberOfChildren > MAX_CHILDREN) {
      errors.numberOfChildren = `Please enter ${MAX_CHILDREN} or fewer children.`;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

/**
 * Converts a validated payload into the exact shape stored in MongoDB: strings are
 * trimmed, numbers are cast from their form-string form, and the date becomes a real
 * Date. Only known fields are copied across, so unexpected keys sent by a client are
 * silently dropped rather than written to the database.
 */
export function normalizeEnquiry(payload) {
  return {
    fullName: String(payload.fullName).trim(),
    countryCode: String(payload.countryCode).trim(),
    contactNumber: String(payload.contactNumber).trim().replace(/[\s()-]/g, ""),
    email: String(payload.email).trim().toLowerCase(),
    dateOfTravel: new Date(`${String(payload.dateOfTravel).trim()}T00:00:00Z`),
    numberOfPeople: Number(payload.numberOfPeople),
    hotelCategory: String(payload.hotelCategory).trim(),
    numberOfChildren:
      payload.numberOfChildren === undefined ||
      payload.numberOfChildren === null ||
      payload.numberOfChildren === ""
        ? 0
        : Number(payload.numberOfChildren),
  };
}
