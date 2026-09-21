"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";
import { Turnstile } from "@marsidev/react-turnstile";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Formy = () => {
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
      fullname: "",
      companyName: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
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
      await axios.post(`/api/contacttwo`, payload);
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

    } catch (error) {
      console.log("error occurred when trying to submiting form", error);
      toast.error("Failed to submit the form! Please try again later or contact us at admin@outsourceaccountings.co.uk ");
      resetTurnstile();
    }
  };

  return (
    <div className="w-full md:max-w-2xl lg:max-w-none flex flex-col justify-center border border-gray-600 rounded-2xl p-4 md:p-8 text-center lg:text-left shadow-lg shadow-black/10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-1 text-blue-800">
        Message Us
      </h1>
      <p className="mb-2 text-gray-600">we get back to you in 24 hours</p>

      <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
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

        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            {...register("fullname", { required: "Enter your name" })}
            placeholder="Enter Your Full Name"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.fullname && (
            <p className="text-red-900 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <input
            type="text"
            {...register("companyName", {
              required: "Enter your company name",
            })}
            placeholder="Enter Company Name"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.companyName && (
            <p className="text-red-900 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Email (required unless a phone number is given) */}
        <div className="mb-4">
          <input
            type="email"
            {...register("email", {
              validate: (value) => {
                const email = value?.trim();
                const phone = getValues("phone")?.trim();

                if (!email && !phone) {
                  return "Please provide either an email or a phone number";
                }
                if (email && !EMAIL_REGEX.test(email)) {
                  return "Enter a valid email";
                }
                return true;
              },
            })}
            placeholder="Email"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-900 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone (optional if an email is given) */}
        <div className="mb-4">
          <input
            type="tel"
            {...register("phone", {
              validate: (value) => {
                const phone = value?.trim();
                if (!phone) return true;; // "email or phone" rule is reported on the email field

                const parsed = parsePhoneNumberFromString(phone, "GB");
                if (parsed?.isValid()) return true;
                if (isValidPhoneNumber(phone)) return true;
                return "Please enter a valid phone number";
              },
              // Once the form has been submitted, keep the email error in
              // sync as the user fills in / clears the phone number.
              onChange: () => {
                if (isSubmitted) trigger("email");
              },
            })}
            placeholder="Phone Number"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.phone && (
            <p className="text-red-900 text-sm mt-1">{errors.phone.message}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Provide an email, a phone number, or both.
          </p>
        </div>

        {/* Service Selection */}
        <div className="mb-4">
          <select
            {...register("serviceType", { required: "Select a service" })}
            className="border border-gray-300  p-2 w-full rounded"
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="tax">Tax</option>
            <option value="counseling">Counseling</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-900 text-sm mt-1">
              {errors.serviceType.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <textarea
            rows="4"
            {...register("message", { required: "Message is required" })}
            placeholder="Send Message"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.message && (
            <p className="text-red-900 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Cloudflare Turnstile */}
        <div className="mb-4 w-full">
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
            <p className="text-red-900 text-sm mt-1">
              {errors.turnstileToken.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "bg-(--color-buttonBlue) text-white px-6 md:px-10 py-3 md:py-4 rounded hover:bg-blue-700 cursor-not-allowed w-full md:w-auto md:min-w-48 transition duration-300"
              : "bg-(--color-buttonBlue) text-white px-6 md:px-10 py-3 md:py-4 rounded hover:bg-blue-700 cursor-pointer w-full md:w-auto md:min-w-48 transition duration-300"
          }
        >
          {isSubmitting ? "Sending" : "Send Message"}
        </button>
      </form>
    </div>
  );
};
export default Formy;