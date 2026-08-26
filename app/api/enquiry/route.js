import {
  handleCreateEnquiry,
  handleListEnquiries,
} from "@/lib/controllers/enquiry";

/**
 * Route handlers for /api/enquiry.
 *
 * Deliberately thin: routing lives here, request handling lives in the controller,
 * and business logic lives in the service — the same separation used in an Express
 * or NestJS application.
 */

// The enquiry list must reflect the database on every request, never a cached build.
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleCreateEnquiry(request);
}

export async function GET() {
  return handleListEnquiries();
}
