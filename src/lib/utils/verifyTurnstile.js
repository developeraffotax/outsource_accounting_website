// lib/turnstile.js  (or utils/verifyTurnstile.js)

export async function verifyTurnstileToken(token, options = {}) {
  const secret = options.secret ?? process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      success: false,
      errorCodes: ["missing-secret"],
      error: "TURNSTILE_SECRET_KEY is not configured",
    };
  }

  if (!token || typeof token !== "string") {
    return {
      success: false,
      errorCodes: ["missing-input-response"],
      error: "Turnstile token is missing",
    };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (options.remoteip) {
      body.append("remoteip", options.remoteip);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        errorCodes: data["error-codes"] ?? ["unknown-error"],
        error: "Turnstile verification failed",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return {
      success: false,
      errorCodes: ["internal-error"],
      error: "Failed to verify Turnstile token",
    };
  }
}