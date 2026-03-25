export const handleCheckout = async ({ service, serviceName }) => {
  const resolvedServiceName = service?.name || serviceName;

  if (!resolvedServiceName) {
    throw new Error("Service name is required for checkout");
  }

  const res = await fetch("/api/createCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
