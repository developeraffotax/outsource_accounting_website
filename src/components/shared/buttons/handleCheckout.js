const createRequestId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const handleCheckout = async ({ service, serviceName }) => {
  const resolvedServiceName = service?.name || serviceName;
  const idempotencyKey = `checkout:${resolvedServiceName}:${createRequestId()}`;

  if (!resolvedServiceName) {
    throw new Error("Service name is required for checkout");
  }

  const res = await fetch("/api/createCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-idempotency-key": idempotencyKey,
    },
    body: JSON.stringify({
      serviceName: resolvedServiceName,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Checkout session creation failed");
  }

  const data = await res.json();

  if (!data.url) {
    throw new Error("Checkout URL not returned from API");
  }

  window.location.href = data.url;
};
