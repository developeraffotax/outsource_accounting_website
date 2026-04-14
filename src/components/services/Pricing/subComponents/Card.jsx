"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { handleCheckout } from "@/components/shared/buttons/handleCheckout.js";

const Card = ({ plan }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!plan) {
    return null;
  }

  const formattedPrice = Number.isFinite(Number(plan.price))
    ? Number(plan.price).toLocaleString("en-GB")
    : plan.price;

  const onBuyNow = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await handleCheckout({
        serviceName: plan.checkoutName || plan.name,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm md:p-6 ${
        plan.isPopular
          ? "border-blue-500 shadow-blue-100"
          : "border-gray-200 shadow-gray-100"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 right-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.description}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-blue-800">
          {plan.billingCycle}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-4xl font-bold text-gray-900">
          {plan.currency}
          {formattedPrice}
        </p>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features?.map((feature) => (
          <li
            key={`${plan.id}-${feature.text}`}
            className="flex items-start gap-2 text-sm"
          >
            <span
              className={`mt-0.5 inline-flex rounded-full p-1 ${
                feature.included
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {feature.included ? <Check size={14} /> : <X size={14} />}
            </span>
            <span
              className={
                feature.included
                  ? "text-gray-700"
                  : "text-gray-500 line-through"
              }
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onBuyNow}
        disabled={isLoading}
        className="mt-6 inline-flex items-center cursor-pointer justify-center rounded-md bg-(--color-buttonBlue) px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Redirecting..." : "Buy Now"}
      </button>
    </article>
  );
};

export default Card;
