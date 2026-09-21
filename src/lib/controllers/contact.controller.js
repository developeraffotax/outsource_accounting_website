import { sendAutoMail } from "@/lib/services/Email.services.js";
import { verifyTurnstileToken } from "../utils/verifyTurnstile";

const validateContactPayload = (value) => {
  const { name, company, companyTurnover, email, phone } = value;

  const hasName =
    typeof name === "string" && name.trim() !== "";
  const hasCompany =
    typeof company === "string" && company.trim() !== "";
  const hasTurnover =
    typeof companyTurnover === "string" && companyTurnover.trim() !== "";

  const hasEmail =
    typeof email === "string" && email.trim() !== "";
  const hasPhone =
    typeof phone === "string" && phone.trim() !== "";

  // At least one of email or phone must be present
  const hasContactMethod = hasEmail || hasPhone;

  return hasName && hasCompany && hasTurnover && hasContactMethod;
};

const processContactRequest = async (value) => {
  // ──────────────────────────────────────────────
  // Honeypot check
  // If the hidden "website" field has any value → treat as bot
  // Return a normal success response so bots don't detect the trap
  // ──────────────────────────────────────────────


  console.log("THE VALUE IS", value)
  if (value.hp_field && String(value.hp_field).trim() !== "") {
    return {
      status: 200,
      body: { message: "Success" },
    };
  }

// Strip honeypot + turnstile token
  const { hp_field, turnstileToken, ...cleanPayload } = value;
 
  // ──────────────────────────────────────────────
  // Cloudflare Turnstile verification
  // ──────────────────────────────────────────────
  const turnstileResult = await verifyTurnstileToken(turnstileToken);

  if (!turnstileResult.success) {
    return {
      status: 400,
      body: {
        error: turnstileResult.error || "Turnstile verification failed",
        details: turnstileResult.errorCodes,
        code: "TURNSTILE_FAILED",
      },
    };
  }




  if (!validateContactPayload(cleanPayload)) {
    return { status: 400, body: { error: "All fields are required" } };
  }

  await sendAutoMail(cleanPayload);

  return { status: 200, body: { message: "Success" } };
};

const dataHandler = async (req, res) => {
  const result = await processContactRequest(req.body);
  return res.status(result.status).json(result.body);
};

export { dataHandler, processContactRequest };