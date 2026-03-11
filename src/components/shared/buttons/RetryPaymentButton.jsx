"use client";

import { useState } from "react";
import { handleCheckout } from "./handleCheckout";

const RetryPaymentButton = ({ serviceName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRetry = async () => {
    if (!serviceName || isLoading) return;

    setIsLoading(true);

    try {
      await handleCheckout({ serviceName });
    } catch (error) {
      console.error("Retry checkout failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onRetry}
      disabled={!serviceName || isLoading}
      className="px-6 py-2 bg-(--color-buttonBlue) text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {isLoading ? "Redirecting..." : "Retry Payment"}
    </button>
  );
};

export default RetryPaymentButton;
