import { NextResponse } from "next/server";

import { createEnquiry, listEnquiries } from "@/lib/services/enquiry";
import { normalizeEnquiry, validateEnquiry } from "@/lib/validators/enquiry";

/**
 * HTTP layer for /api/enquiry.
 *
 * Responsible for reading the request, choosing a status code and shaping the JSON
 * response. All persistence work is delegated to the service layer.
 */

/** POST /api/enquiry — validate an enquiry, store it, and confirm back to the client. */
export async function handleCreateEnquiry(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  // Never trust the client: the same rules the browser ran are enforced again here,
  // because this endpoint can be called directly without going through the form.
  const { isValid, errors } = validateEnquiry(payload);

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Invalid enquiry data.", errors },
      { status: 400 }
    );
  }

  try {
    const enquiry = await createEnquiry(normalizeEnquiry(payload));

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        data: { id: enquiry._id.toString(), createdAt: enquiry.createdAt },
      },
      { status: 201 }
    );
  } catch (error) {
    // The real error is logged for us; the client only ever sees a safe message so
    // database internals are never leaked to the browser.
    console.error("Failed to create enquiry:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/enquiry — list stored enquiries.
 *
 * Listed in the assignment as an optional bonus that could power an admin view. It is
 * intentionally unauthenticated here to match that description; see the README for why
 * this would be placed behind admin authentication in production.
 */
export async function handleListEnquiries() {
  try {
    const enquiries = await listEnquiries();

    return NextResponse.json(
      { success: true, count: enquiries.length, data: enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to list enquiries:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load enquiries." },
      { status: 500 }
    );
  }
}
