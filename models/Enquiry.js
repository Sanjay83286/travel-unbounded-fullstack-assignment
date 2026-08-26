import mongoose from "mongoose";

import { HOTEL_CATEGORIES, MAX_CHILDREN, MAX_PEOPLE } from "@/lib/constants";

/**
 * The stored shape of a travel enquiry: every field from the booking form plus a
 * createdAt timestamp, as required by the assignment.
 *
 * The schema constraints duplicate the request validator on purpose. The validator
 * produces friendly, field-level messages for the user; the schema is the last line
 * of defence at the database boundary, so a bad write cannot happen even if a future
 * code path forgets to validate first.
 */
const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      maxlength: 100,
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required."],
      trim: true,
    },
    // Stored as a String, not a Number: phone numbers can have leading zeros and
    // are long enough that numeric storage would lose precision.
    contactNumber: {
      type: String,
      required: [true, "Contact number is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
    },
    dateOfTravel: {
      type: Date,
      required: [true, "Date of travel is required."],
    },
    numberOfPeople: {
      type: Number,
      required: [true, "Number of people is required."],
      min: [1, "There must be at least 1 person travelling."],
      max: MAX_PEOPLE,
    },
    hotelCategory: {
      type: String,
      required: [true, "Hotel category is required."],
      enum: {
        values: HOTEL_CATEGORIES,
        message: "{VALUE} is not a valid hotel category.",
      },
    },
    numberOfChildren: {
      type: Number,
      default: 0,
      min: [0, "Number of children cannot be negative."],
      max: MAX_CHILDREN,
    },
  },
  {
    // Adds createdAt (required by the assignment) and updatedAt.
    timestamps: true,
  }
);

// In development the module is re-evaluated on every hot reload, so reuse the
// already-compiled model instead of redefining it, which Mongoose rejects.
export const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
