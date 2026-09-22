"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";

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


  const router = useRouter()
  // Turnstile tokens are single-use, so clear the token and remount the
  // widget after every submit attempt (success or failure).
  const resetTurnstile = () => {
    setValue("turnstileToken", "");
    setTurnstileKey((k) => k + 1);
  };

    const handleSuccess = () => {
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

  sessionStorage.setItem("quote_form_submitted", "true");
  router.push("/thank-you");


};


  const onSubmit = async (data) => {
    const payload = {
      ...data,
      email: data.email.trim(),
      phone: data.phone.trim(),
    };

    try {
      // await axios.post(`/api/contacttwo`, payload);
      

      handleSuccess()

    } catch (error) {
      console.log("error occurred when trying to submiting form", error);
      toast.error("Failed to submit the form! Please try again later or contact us at admin@outsourceaccountings.co.uk ");
      resetTurnstile();
    }
  };

  // Shared input styling for a compact enterprise look
  const inputStyles =
    "border border-slate-300 p-2 text-sm w-full rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow bg-white";

  return (
    <div className="w-full bg-slate-50 border border-slate-200 lg:rounded-xl p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
          Message Us
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          we get back to you in 24 hours
        </p>
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              {...register("fullname", { required: "Enter your name" })}
              placeholder="Enter Your Full Name"
              className={inputStyles}
            />
            {errors.fullname && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <input
              type="text"
              {...register("companyName", {
                // required: "Enter your company name",
              })}
              placeholder="Enter Company Name"
              className={inputStyles}
            />
            {errors.companyName && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {/* Email (required unless a phone number is given) */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Email"
              className={inputStyles}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          
          <div>
            <input
              type="tel"
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
              placeholder="Phone Number"
              className={inputStyles}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.phone.message}
              </p>
            )}
            
          </div>

         

        </div>

         <p className="text-slate-500 text-xs mt-1 mb-4">
              Provide your email - a phone number is optional.
            </p>


        {/* Service Selection */}
        <div className="mb-4">
          <select
            {...register("serviceType", { required: "Select a service" })}
            className={inputStyles}
            defaultValue=""
          >
            <option value="" disabled className="text-slate-400">
              Select Service
            </option>
            <option value="Accounts">Accounts</option>
            <option value="Corporation Tax">Corporation Tax</option>
            <option value="Self Assessment">Self Assessment</option>
            <option value="Payroll">Payroll</option>
            <option value="VAT">VAT</option>
            <option value="Company Formation">Company Formation</option>
            <option value="Other">Other</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.serviceType.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <textarea
            rows="3"
            {...register("message", {
              // required: "Message is required"
            })}
            placeholder="Send Message"
            className={`${inputStyles} resize-none`}
          />
          {errors.message && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Cloudflare Turnstile */}
        <div className="mb-5 w-full flex justify-center md:justify-start">
          <div className="w-full  flex flex-col">
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
              <p className="text-red-600 text-xs mt-1 font-medium text-center md:text-left">
                {errors.turnstileToken.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full md:w-auto px-6 py-2.5 text-sm font-medium rounded-md text-white transition-all
              ${
                isSubmitting
                  ? "bg-(--color-buttonBlue) opacity-70 cursor-not-allowed"
                  : "bg-(--color-buttonBlue) hover:bg-blue-800 hover:shadow-md focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none cursor-pointer"
              }
            `}
          >
            {isSubmitting ? "Sending" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Formy;