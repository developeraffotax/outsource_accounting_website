import meetingService from "../services/meeting.services";
import { NextResponse } from "next/server";

const meetingController = async (request) => {
  //   const data = req.body;

  const data = await request.json();

  const { date, time, Name, email } = data;
  const isValid =
    typeof date === "string" &&
    date.trim() !== "" &&
    typeof time === "string" &&
    time.trim() !== "" &&
    typeof Name === "string" &&
    Name.trim() !== "" &&
    typeof email === "string" &&
    email.trim() !== "";

  if (!isValid) {
    console.log("Missing or invalid data. Meeting NOT scheduled.");
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  } else {
    await meetingService({ date, time, Name, email });

    console.log("✅ All data present. Meeting scheduled...");
    return NextResponse.json({ message: "Meeting Scheduled" }, { status: 200 });
  }
};

export default meetingController;
