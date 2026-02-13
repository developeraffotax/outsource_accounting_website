import { sendAutoMailTwo } from "@/lib/services/emailTwo.services.js";

const contacttwo = async (req, res) => {
  const val = req.body;
  // 🐛 DEBUG: Log received data
  console.log("📥 Received data:", val);
  console.log("📋 Data types:", {
    fullname: typeof val.fullname,
    companyName: typeof val.companyName,
    email: typeof val.email,
    serviceType: typeof val.serviceType,
    message: typeof val.message,
  });

  const { fullname, companyName, email, serviceType, message } = val;

  const isValid =
    typeof val.fullname === "string" &&
    fullname.trim() !== "" &&
    typeof val.companyName === "string" &&
    companyName.trim() !== "" &&
    typeof val.email === "string" &&
    email.trim() !== "" &&
    typeof val.serviceType === "string" &&
    serviceType.trim() !== "" &&
    typeof val.message == "string" &&
    message.trim() !== "";

  if (!isValid) {
    console.log("❌ Validation failed!");
    return res.status(400).json({ error: "All Fields are required" });
  }

  try {
    await sendAutoMailTwo(val);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Email service error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  res.status(200).json({ message: "Mail sent" });
};

export { contacttwo };
