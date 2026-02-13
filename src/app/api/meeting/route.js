import { NextResponse } from "next/server";
import meetingService from "../../../lib/controllers/meeting.controller";

export async function POST(request) {
  try {
    return await meetingService(request);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process meeting request" },
      { status: 500 }
    );
  }
}
