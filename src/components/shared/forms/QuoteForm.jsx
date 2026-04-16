"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const fieldClassName =
  "mt-1 block w-full border-0 border-b border-slate-400/80 bg-transparent px-0 pb-2.5 pt-1 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:border-(--color-buttonBlue) focus:outline-none focus:ring-0";

const labelClassName =
  "block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500";

const ErrorMessage = ({ message }) => (
  <p className="mt-1 text-[11px] font-semibold text-red-600">{message}</p>
);

const QuoteForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post(`/api/contact`, data);
      toast.success(
        <div>
          <p className="font-bold">Quote Request Received</p>
          <p className="text-xs opacity-80">
            Thanks for reaching out! Your quote request has been successfully
            submitted. We’ll be in touch soon with the details.
          </p>
        </div>,
      );
      // toast.success(res.data.message);
      reset();

      if (onSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onSuccess();
      }
    } catch (error) {
      console.log("error occued hero ", error);
      toast.error("failed to send message");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden rounded-[28px] border border-(--color-linearBar) bg-white shadow-[0_28px_80px_rgba(23,33,58,0.22)]"
    >
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
            <div>
              <label htmlFor="quote-name" className={labelClassName}>
                Full Name
              </label>
              <input
                id="quote-name"
                type="text"
                placeholder="Enter Full Name"
                className={fieldClassName}
                {...register("name", { required: true })}
              />
              {errors.name && <ErrorMessage message="Name is required" />}
            </div>

            <div>
              <label htmlFor="quote-company" className={labelClassName}>
                Company Name
              </label>
              <input
                id="quote-company"
                type="text"
                placeholder="Enter Company Name"
                className={fieldClassName}
                {...register("company", { required: true })}
              />
              {errors.company && (
                <ErrorMessage message="Company name is required" />
              )}
            </div>

            <div>
              <label htmlFor="quote-turnover" className={labelClassName}>
                Company Turnover
              </label>
              <select
                id="quote-turnover"
                className={`${fieldClassName} cursor-pointer`}
                {...register("companyTurnover", {
                  required: "Please select a turnover",
                })}
              >
                <option value="" disabled>
                  Company Turnover
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

            <div>
              <label htmlFor="quote-email" className={labelClassName}>
                Email Address
              </label>
              <input
                id="quote-email"
                type="email"
                placeholder="Enter Email"
                className={fieldClassName}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <ErrorMessage
                  message={errors.email.message || "Email is required"}
                />
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
