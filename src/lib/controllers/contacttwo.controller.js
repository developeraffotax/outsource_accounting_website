import { sendAutoMailTwo } from "@/lib/services/emailTwo.services.js";
import { verifyTurnstileToken } from "../utils/verifyTurnstile";
import { sendAutoMail } from "../services/Email.services";

const validateContactTwoPayload = (val) => {
  const { fullname, companyName, email, phone, serviceType, message } = val;

  const hasFullname =
    typeof fullname === "string" && fullname.trim() !== "";
  const hasCompanyName =
    typeof companyName === "string" && companyName.trim() !== "";
  const hasServiceType =
    typeof serviceType === "string" && serviceType.trim() !== "";
  const hasMessage =
    typeof message === "string" && message.trim() !== "";

  const hasEmail =
    typeof email === "string" && email.trim() !== "";
  const hasPhone =
    typeof phone === "string" && phone.trim() !== "";

  // At least one of email or phone must be present
  const hasContactMethod = hasEmail || hasPhone;

  return (
    hasFullname &&
    hasCompanyName &&
    hasServiceType &&
    hasMessage &&
    hasContactMethod
  );
};

const processContactTwoRequest = async (val) => {
  // ──────────────────────────────────────────────
  // Honeypot check
  // If the hidden "hp_field" has any value → treat as bot
  // Return a normal success response so bots don't detect the trap
  // ──────────────────────────────────────────────
  if (val.hp_field && String(val.hp_field).trim() !== "") {
    return {
      status: 200,
      body: { message: "Success" },
    };
  }

  // Strip honeypot + turnstile token
  const { hp_field, turnstileToken, ...cleanPayload } = val;

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

  if (!validateContactTwoPayload(cleanPayload)) {
    return { status: 400, body: { error: "All Fields are required" } };
  }

  await sendAutoMail(cleanPayload);
  return { status: 200, body: { message: "Success" } };
};

const contacttwo = async (req, res) => {
  const result = await processContactTwoRequest(req.body);
  return res.status(result.status).json(result.body);
};

export { contacttwo, processContactTwoRequest };