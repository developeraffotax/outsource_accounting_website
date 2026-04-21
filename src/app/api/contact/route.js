import { NextResponse } from "next/server";
import { processContactRequest } from "@/lib/controllers/contact.controller";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await processContactRequest(body);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("Contact form error:", {
      message: error?.message,
      code: error?.code,
      statusCode: error?.statusCode,
      causeMessage: error?.cause?.message,
    });

    const status = error?.statusCode || 500;
    const message =
      status >= 400 && status < 500
        ? error?.message || "Request failed"
        : error?.code === "MAIL_DELIVERY_FAILED"
          ? "Failed to deliver email"
          : "Failed to send message";

    return NextResponse.json(
      {
        error: message,
        code: error?.code || "INTERNAL_ERROR",
      },
      { status },
    );
  }
}
