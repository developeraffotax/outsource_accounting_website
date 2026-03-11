"use client";

import { useEffect, useRef, useState } from "react";
import sortDown from "@/assets/images/sortDown.svg";
import { handleCheckout } from "./handleCheckout.js";

const BuyNowButton = ({ services = [], mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  // close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (mobile) return;
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobile]);

  const onServiceClick = async (service) => {
    try {
      await handleCheckout({ service });
      setIsOpen(false);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  // Mobile: accordion inline inside the nav menu
  if (mobile) {
    return (
      <div className="w-full">
        <div
          className="flex w-full cursor-pointer items-center justify-between rounded-sm bg-(--color-buttonBlue) px-4 py-2 font-semibold text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Buy Now</span>
          <img
            src={sortDown.src}
            alt="dropdown icon"
            className={`h-3 w-4 self-center`}
          />
        </div>

        {isOpen && (
          <div className="mt-1 flex flex-col gap-1 rounded-md border border-gray-200 bg-white p-2">
            {services.length === 0 ? (
              <p className="text-sm text-gray-500">No services available</p>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-50 p-2 text-sm hover:bg-gray-100"
                  onClick={() => onServiceClick(service)}
                >
                  <p className="whitespace-nowrap font-medium">
                    {service.name}
                  </p>
                  <p className="whitespace-nowrap font-semibold">
                    £{service.price}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop: floating dropdown
  return (
    <div ref={dropDownRef} className="relative inline-block">
      <div
        className="navbar-btn hidden cursor-pointer items-center gap-2 rounded-sm border-2 border-transparent bg-(--color-buttonBlue) px-8 py-2 font-semibold text-white transition-opacity hover:opacity-90 md:flex"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Buy Now</span>
        <img
          src={sortDown.src}
          alt="dropdown icon"
          className={`h-3 w-4 self-center`}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 flex w-max min-w-52 flex-col gap-2 rounded-md border border-gray-200 bg-white p-3 shadow-md">
          {services.length === 0 ? (
            <p className="text-sm text-gray-500">No services available</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-50 p-2 text-sm hover:bg-gray-100"
                onClick={() => onServiceClick(service)}
              >
                <p className="whitespace-nowrap font-medium">{service.name}</p>
                <p className="whitespace-nowrap font-semibold">
                  £{service.price}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BuyNowButton;
