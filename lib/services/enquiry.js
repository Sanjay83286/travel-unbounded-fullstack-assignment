import { connectToDatabase } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";

/**
 * Business logic for enquiries.
 *
 * This layer knows about the database but nothing about HTTP — no request objects,
 * no status codes. That keeps it independently testable and means the same functions
 * could be called from a different transport (a cron job, a CLI) without change.
 */

/** Persists a normalized enquiry and returns the created document. */
export async function createEnquiry(enquiryData) {
  await connectToDatabase();
  return Enquiry.create(enquiryData);
}

/** Returns every stored enquiry, newest first. */
export async function listEnquiries() {
  await connectToDatabase();
  return Enquiry.find().sort({ createdAt: -1 }).lean();
}
