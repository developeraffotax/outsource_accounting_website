import { sendAutoMail } from "@/lib/services/Email.services.js";

const validateContactPayload = (value) => {
  const { name, company, companyTurnover, email } = value;
  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof company === "string" &&
    company.trim() !== "" &&
    typeof companyTurnover === "string" &&
    companyTurnover.trim() !== "" &&
    typeof email === "string" &&
    email.trim() !== ""
  );
};

const processContactRequest = async (value) => {
  if (!validateContactPayload(value)) {
    return { status: 400, body: { error: "All fields are required" } };
  }

  await sendAutoMail(value);
  return { status: 200, body: { message: "Success" } };
};

const dataHandler = async (req, res) => {
  const result = await processContactRequest(req.body);
  return res.status(result.status).json(result.body);
};

export { dataHandler, processContactRequest };
