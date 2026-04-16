"use client";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

// --- Turnover Options ---
const turnoverOptions = [
  { value: "under_50k", label: "Under £50,000" },
  { value: "50k_150k", label: "£50,000 – £150,000" },
  { value: "150k_500k", label: "£150,000 – £500,000" },
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
    <div className="mb-4 relative" ref={containerRef}>
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
              {/* Trigger — identical styling to original inputs */}
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className={`w-full p-4 bg-white border rounded text-sm text-left flex items-center justify-between outline-none transition-all duration-150 ${
                  isOpen
                    ? "border-indigo-600 ring-2 ring-indigo-300"
                    : "border-gray-300 hover:border-gray-400"
                } ${error ? "border-red-500 ring-red-200" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${name}-label`}
              >
                <span
                  className={selectedOption ? "text-gray-900" : "text-gray-500"}
                >
                  {selectedOption?.label || "Company Turnover"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu with enhanced animations */}
              <div
                className={`absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg transform-gpu transition-all duration-300 ease-out origin-top ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-3 pointer-events-none"
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
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100 flex items-center justify-between ${
                        field.value === option.value
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : highlightedIndex === index
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                      role="option"
                      aria-selected={field.value === option.value}
                    >
                      {option.label}
                      {field.value === option.value && (
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
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

      {/* Error message — untouched, matches original design */}
      {error && (
        <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1 duration-200">
          <svg
            className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800 text-xs font-medium leading-tight">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
};

// --- QuoteForm (unchanged except adding control) ---
const QuoteForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`/api/contact`, data);
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

      if (onSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log("error occued hero ", error);
      toast.error("failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name field — unchanged */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Full Name"
          className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <div className="flex items-center gap-1.5 mt-1 px-2 py-1 bg-red-50 border-l-2 border-red-500 rounded-r-md">
            <svg
              className="w-3.5 h-3.5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 text-[11px] font-medium leading-none">
              Name is required
            </p>
          </div>
        )}
      </div>

      {/* Company field — unchanged */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Company Name"
          className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
          {...register("company", { required: true })}
        />
        {errors.company && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1 duration-200">
            <svg
              className="w-4 h-4 text-red-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-800 text-xs font-medium leading-none">
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

      {/* Email field — unchanged */}
      <div className="mb-6">
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1">
            <svg
              className="w-4 h-4 text-red-600 shrink-0"
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
            <p className="text-red-800 text-xs font-semibold tracking-wide">
              {errors.email.message || "Email is required"}
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-2/3 md:w-2/3 lg:1/3 mx-auto block px-8 py-2 rounded-sm bg-(--color-buttonBlue) text-white text-lg font-medium hover:opacity-90 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default QuoteForm;
