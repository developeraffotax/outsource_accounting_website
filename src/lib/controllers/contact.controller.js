import { sendAutoMail } from "@/lib/services/Email.services.js";

const dataHandler = async (req, res) => {
  const value = req.body;

  const { name, company, companyTurnover, email } = value;
  const isValid =
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof company === "string" &&
    company.trim() !== "" &&
    typeof companyTurnover === "string" &&
    companyTurnover.trim() !== "" &&
    typeof email === "string" &&
    email.trim() !== "";

  console.log("Is data valid?", isValid);

  if (!isValid) {
    console.log("Missing or invalid data. Mail NOT sent.");
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("✅ All data present. Sending mail...");
  await sendAutoMail(value);

  return res.status(200).json({ message: "Success" });
};

export { dataHandler };
