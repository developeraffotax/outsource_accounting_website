"use client";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";
import { Turnstile } from "@marsidev/react-turnstile";

// --- Turnover Options ---
const turnoverOptions = [
  { value: "under_50k", label: "Under £50,000" },
  { value: "50k_150k", label: "£50,000 - £150,000" },
  { value: "150k_500k", label: "£150,000 - £500,000" },
  { value: "over_500k", label: "Over £500,000" },
];

// --- Enhanced Custom Select ---
const CustomSelect = ({ control, name, error, rules }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e, field) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < turnoverOptions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : turnoverOptions.length - 1,
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            const option = turnoverOptions[highlightedIndex];
            field.onChange(option.value);
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "Tab":
          setIsOpen(false);
          break;
        default:
          // Type‑ahead: focus first option starting with pressed letter
          const letter = e.key.toLowerCase();
          if (letter.length === 1) {
            const index = turnoverOptions.findIndex((opt) =>
              opt.label.toLowerCase().startsWith(letter),
            );
            if (index !== -1) {
              setHighlightedIndex(index);
              listRef.current?.children[index]?.scrollIntoView({
                block: "nearest",
              });
            }
          }
      }
    },
    [isOpen, highlightedIndex],
  );

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      listRef.current.children[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="mb-3 relative" ref={containerRef}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selectedOption = turnoverOptions.find(
            (opt) => opt.value === field.value,
          );

          return (
            <>
              {/* Trigger */}
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className={`w-full h-11 px-3.5 bg-white border rounded-lg text-sm text-left flex items-center justify-between outline-none transition-all duration-200 ${
                  isOpen
                    ? "border-indigo-500 ring-2 ring-indigo-500/20"
                    : "border-gray-200 hover:border-gray-300"
                } ${error ? "border-red-400 ring-2 ring-red-400/15" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${name}-label`}
              >
                <span
                  className={
                    selectedOption
                      ? "text-gray-900 font-medium"
                      : "text-gray-400"
                  }
                >
                  {selectedOption?.label || "Company Turnover"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute z-20 mt-1.5 w-full max-h-56 overflow-auto rounded-lg border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/60 transform-gpu transition-all duration-200 ease-out origin-top ${
                  isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"
                }`}
                role="listbox"
                aria-label="Turnover options"
              >
                <div ref={listRef}>
                  {turnoverOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        setIsOpen(false);
                        triggerRef.current?.focus();
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`px-3.5 py-2.5 text-sm cursor-pointer transition-colors duration-100 flex items-center justify-between ${
                        field.value === option.value
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : highlightedIndex === index
                            ? "bg-gray-50 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                      }`}
                      role="option"
                      aria-selected={field.value === option.value}
                    >
                      {option.label}
                      {field.value === option.value && (
                        <svg
                          className="w-4 h-4 text-indigo-600 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }}
      />

      {/* Error message */}
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50/80 border border-red-100 rounded-md">
          <svg
            className="w-3.5 h-3.5 text-red-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 text-xs font-medium leading-none">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
};

// --- QuoteForm ---
const QuoteForm = ({ onSuccess }) => {
  const {
    handleSubmit,
    control,
    getValues,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      companyTurnover: "",
      hp_field: "", // honeypot
      turnstileToken: "", // ← new field
    },
  });

  const onSubmit = async (data) => {
    const { ...payload } = data;

    console.log(payload);

    try {
      const res = await axios.post(`/api/contact`, payload);
      toast.success(
        <div>
          <p className="font-bold">Quote Request Received</p>
          <p className="text-xs opacity-80">
            Thanks for reaching out! Your quote request has been successfully
            submitted. We’ll be in touch soon with the details.
          </p>
        </div>,
      );
      reset();
    } catch (error) {
      console.log("error occued hero ", error);
      toast.error("Failed to send message");
      setValue("turnstileToken", "");
    }
  };

  const inputBase =
    "w-full h-11 px-3.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-gray-300";

  const errorBox =
    "mt-1.5 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50/80 border border-red-100 rounded-md";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
      {/* Honeypot: hidden from users, bots will fill it */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <Controller
          name="hp_field"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              tabIndex={-1}
              autoComplete="new-password"
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              data-form-type="other"
            />
          )}
        />
      </div>
      {/* Name */}
      <div className="mb-3">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Enter Full Name"
              className={`${inputBase} ${
                errors.name ? "border-red-400 ring-2 ring-red-400/15" : ""
              }`}
              {...field}
            />
          )}
        />
        {errors.name && (
          <div className={errorBox}>
            <svg
              className="w-3.5 h-3.5 text-red-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-600 text-xs font-medium leading-none">
              Name is required
            </p>
          </div>
        )}
      </div>

      {/* Company */}
      <div className="mb-3">
        <Controller
          name="company"
          control={control}
          rules={{   }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Enter Company Name"
              className={`${inputBase} ${
                errors.company ? "border-red-400 ring-2 ring-red-400/15" : ""
              }`}
              {...field}
            />
          )}
        />
        {errors.company && (
          <div className={errorBox}>
            <svg
              className="w-3.5 h-3.5 text-red-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-600 text-xs font-medium leading-none">
              Company name is required
            </p>
          </div>
        )}
      </div>

      {/* Custom Turnover Dropdown */}
      <CustomSelect
        name="companyTurnover"
        control={control}
        error={errors.companyTurnover}
        rules={{ required: "Please select a turnover" }}
      />

      {/* Email */}
      <div className="mb-3">
        <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <input
                type="email"
                placeholder="Enter Email"
                className={`${inputBase} ${
                  errors.email ? "border-red-400 ring-2 ring-red-400/15" : ""
                }`}
                {...field}
              />
            )}
          />
        {errors.email && (
          <div className={errorBox}>
            <svg
              className="w-3.5 h-3.5 text-red-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-red-600 text-xs font-medium leading-none">
              {errors.email.message}
            </p>
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
       <Controller
          name="phone"
          control={control}
          rules={{
          validate: (value) => {
            if (!value || value.trim() === "") return true; // optional

            // Strip allowed formatting: spaces, dashes, dots, parentheses, leading +
            const cleaned = value.trim().replace(/[\s\-.()+]/g, "");

            if (!/^\d+$/.test(cleaned)) {
              return "Phone number should only contain digits";
            }

            if (cleaned.length < 7 || cleaned.length > 15) {
              return "Phone number must be between 7 and 15 digits";
            }

            return true;
          },
        }}
  render={({ field }) => (
    <input
      type="tel"
      placeholder="Enter Phone Number (optional)"
      className={`${inputBase} ${
        errors.phone ? "border-red-400 ring-2 ring-red-400/15" : ""
      }`}
      {...field}
    />
  )}
/>
        {errors.phone && (
          <div className={errorBox}>
            <svg
              className="w-3.5 h-3.5 text-red-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-red-600 text-xs font-medium leading-none">
              {errors.phone.message}
            </p>
          </div>
        )}
        

        {/* ========== Cloudflare Turnstile ========== */}
        <div className=" w-full mt-5">
          <Controller
            name="turnstileToken"
            control={control}
            rules={{ required: "Please complete the security check" }}
            render={({ field }) => (
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} // or hardcode for testing
                onSuccess={(token) => {
                  field.onChange(token);
                }}
                onError={() => {
                  field.onChange("");
                }}
                onExpire={() => {
                  field.onChange("");
                }}
                options={{
                  theme: "light",
                  size: "flexible",
                  appearance: "interaction-only", // only appears when Cloudflare needs the user to click
                }}
              />
            )}
          />

          {errors.turnstileToken && (
            <div className={errorBox}>
              {/* your error icon + message */}
              <p className="text-red-600 text-xs font-medium leading-none">
                {errors.turnstileToken.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:w-auto min-w-[140px] mx-auto block px-6 h-11 rounded-lg bg-[var(--color-buttonBlue)] text-white text-sm font-semibold tracking-wide shadow-sm shadow-indigo-500/20 hover:opacity-90 hover:shadow-md hover:shadow-indigo-500/25 active:scale-[0.98] transition-all duration-200 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default QuoteForm;
