import { NextResponse } from "next/server";
import { dataHandler } from "@/lib/controllers/contact.controller";

export async function POST(request) {
  try {
    // Parse the JSON body
    const body = await request.json();

    // Create a mock req/res object for the controller
    const req = { body };
    const res = {
      status: (code) => ({
        json: (data) => NextResponse.json(data, { status: code }),
      }),
    };

    return await dataHandler(req, res);
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
