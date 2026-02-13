import { NextResponse } from "next/server";
import { contacttwo } from "@/lib/controllers/contacttwo.controller";

export async function POST(request) {
  try {
    const body = await request.json();

    const req = { body };
    const res = {
      status: (code) => ({
        json: (data) => NextResponse.json(data, { status: code }),
      }),
    };

    return await contacttwo(req, res);
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
