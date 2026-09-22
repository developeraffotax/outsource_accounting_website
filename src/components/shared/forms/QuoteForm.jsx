"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";
import { Turnstile } from "@marsidev/react-turnstile";

const fieldClassName =
  "mt-1 block w-full border-0 border-b border-slate-400/80 bg-transparent px-0 pb-2.5 pt-1 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:border-(--color-buttonBlue) focus:outline-none focus:ring-0";

const labelClassName =
  "block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ErrorMessage = ({ message }) => (
  <p className="mt-1 text-[11px] font-semibold text-red-600">{message}</p>
);

const QuoteForm = ({ onSuccess }) => {
  // Changing this key remounts the Turnstile widget, giving a fresh token.
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      companyTurnover: "",
      email: "",
      phone: "",
      hp_field: "", // honeypot
      turnstileToken: "",
    },
  });

  // Turnstile tokens are single-use, so clear the token and remount the
  // widget after every submit attempt (success or failure).
  const resetTurnstile = () => {
    setValue("turnstileToken", "");
    setTurnstileKey((k) => k + 1);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      email: data.email.trim(),
      phone: data.phone.trim(),
    };

    try {
      await axios.post(`/api/contact`, payload);
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
      resetTurnstile();

      if (onSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSuccess();
      }
    } catch (error) {
      console.log("error occured hero ", error);
      toast.error("Failed to send message");
      resetTurnstile();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative overflow-hidden rounded-[28px] border border-(--color-linearBar) bg-white shadow-[0_28px_80px_rgba(23,33,58,0.22)]"
    >
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
        <input
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
          {...register("hp_field")}
        />
      </div>

      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-(--color-veryLightBlue) px-4 py-8 sm:px-8 md:px-10 md:py-10">
          <p className="text-3xl font-semibold leading-[1.12] text-slate-800 sm:text-4xl">
            Get your custom{" "}
            <span className="text-(--color-buttonBlue)">quote</span>
          </p>
          <p className="mt-2 md:mt-4 max-w-md text-sm leading-7 text-slate-600">
            Tell us about your business and we will share a tailored outsourcing
            plan with clear pricing and next steps.
          </p>
          <p className="mt-2 md:mt-4 max-w-md text-sm leading-7 text-slate-600">
            Once submitted, our team will reach out quickly with a personalized
            response.
          </p>

          <div className="mt-4 md:mt-10 max-w-sm">
            <h3 className="text-[26px] leading-tight text-slate-800">
              Want to talk with us?
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If you are working on something interesting that needs accounting
              support, we would love to hear from you.
            </p>
          </div>

          <div className="pointer-events-none absolute -bottom-16 -left-14 h-28 w-28 md:h-36 md:w-36 rounded-full bg-(--color-linearBar) blur-sm" />
          <div className="pointer-events-none absolute -bottom-10 left-16 h-20 w-8 md:h-24 md:w-10 rounded-[999px] bg-(--color-buttonBlue)" />
          <div className="pointer-events-none absolute -bottom-8 left-28 h-16 w-6 md:h-20 md:w-8 rotate-12 rounded-[999px] bg-(--color-ImgOverlay)" />
        </div>

        <div className="bg-white px-4 py-6 sm:px-8 md:px-9 md:py-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-(--color-buttonBlue)">
            Fill the form to receive a tailored quote. It is free.
          </p>

          <div className="mt-7 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="quote-name" className={labelClassName}>
                Full Name
              </label>
              <input
                id="quote-name"
                type="text"
                placeholder="Enter Full Name"
                className={fieldClassName}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="quote-company" className={labelClassName}>
                Company Name
              </label>
              <input
                id="quote-company"
                type="text"
                placeholder="Enter Company Name"
                className={fieldClassName}
                {...register("company", {
                  // required: "Company name is required",
                })}
              />
              {errors.company && (
                <ErrorMessage message={errors.company.message} />
              )}
            </div>

            {/* Turnover */}
            <div>
              <label htmlFor="quote-turnover" className={labelClassName}>
                Company Turnover
              </label>
              <select
                id="quote-turnover"
                className={`${fieldClassName} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem_1rem] pr-8`}
                {...register("companyTurnover", {
                  required: "Please select a turnover",
                })}
              >
                <option value="" disabled>
                  Select Company Turnover
                </option>
                <option value="under_50k">Under £50,000</option>
                <option value="50k_150k">£50,000 - £150,000</option>
                <option value="150k_500k">£150,000 - £500,000</option>
                <option value="over_500k">Over £500,000</option>
              </select>
              {errors.companyTurnover && (
                <ErrorMessage message={errors.companyTurnover.message} />
              )}
            </div>

            {/* Email (required unless a phone number is given) */}
            <div>
              <label htmlFor="quote-email" className={labelClassName}>
                Email Address
              </label>
              <input
                id="quote-email"
                type="email"
                placeholder="Enter Email"
                className={fieldClassName}
                {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>

            {/* Phone (optional if an email is given) */}
            <div>
              <label htmlFor="quote-phone" className={labelClassName}>
                Phone Number
              </label>
              <input
                id="quote-phone"
                type="tel"
                placeholder="Enter Phone Number"
                className={fieldClassName}
                {...register("phone", {
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
 
                  
                })}
              />
              {errors.phone && <ErrorMessage message={errors.phone.message} />}
              <p className="mt-2 text-[11px] text-slate-500">
                Provide your email - a phone number is optional.
              </p>
            </div>

            {/* Cloudflare Turnstile */}
            <div className="w-full">
              <Controller
                name="turnstileToken"
                control={control}
                rules={{ required: "Please complete the security check" }}
                render={({ field }) => (
                  <Turnstile
                    key={turnstileKey}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => field.onChange(token)}
                    onError={() => field.onChange("")}
                    onExpire={() => field.onChange("")}
                    options={{
                      theme: "light",
                      size: "flexible",
                      appearance: "interaction-only", // only visible when Cloudflare needs a click
                    }}
                  />
                )}
              />
              {errors.turnstileToken && (
                <ErrorMessage message={errors.turnstileToken.message} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-8 block w-full rounded-none px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition-all duration-300 ${
              isSubmitting
                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                : "cursor-pointer bg-(--color-buttonBlue) text-white hover:brightness-110"
            }`}
          >
            {isSubmitting ? "Sending..." : "Get My Quote"}
          </button>

          <p className="mt-3 text-center text-[10px] tracking-wide text-slate-500">
            We respect your inbox. No spam.
          </p>
        </div>
      </div>
    </form>
  );
};
export default QuoteForm;