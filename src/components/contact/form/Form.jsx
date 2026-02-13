"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const Formy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/api/contacttwo`, data);
      // Example usage in your form component
      toast.success(
        <div>
          <p className="font-bold">Quote Request Received</p>
          <p className="text-xs opacity-80">Thanks for reaching out! Your quote request has been successfully submitted. We’ll be in touch soon with the details.</p>
        </div>
      );
      // toast.success(res.data.message);
      console.log(data);
      reset();

      await new Promise((res) => setTimeout(res, 2000));
    } catch (error) {
      console.log("error occurred when trying to submiting form", error);
      toast.error("Failed submit Form");
    }
  };
  return (
    <div className="w-8/9 md:w-1/3 flex flex-col justify-center border border-gray-600 rounded-2xl  h-1/2 p-4 md:p-8 text-center lg:text-left shadow-lg shadow-black/10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-1 text-blue-800">
        Message Us
      </h1>
      <p className="mb-2 text-gray-600">we get back to you in 24 hours</p>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            {...register("fullname", { required: true })}
            placeholder="Enter Your Full Name"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.fullname && (
            <p className="text-red-900 text-sm mt-1">Enter your name</p>
          )}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <input
            type="text"
            {...register("companyName", { required: true })}
            placeholder="Enter Company Name"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.companyName && (
            <p className="text-red-900 text-sm mt-1">Enter your company name</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            placeholder="Email"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-900 text-sm mt-1">Enter a valid email</p>
          )}
        </div>

        {/* Service Selection */}
        <div className="mb-4">
          <select
            {...register("serviceType", { required: true })}
            className="border border-gray-300  p-2 w-full rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="tax">Tax</option>
            <option value="counseling">Counseling</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-900 text-sm mt-1">Select a service</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <textarea
            rows="4"
            {...register("message", { required: true })}
            placeholder="Send Message"
            className="border border-gray-300  p-2 w-full rounded"
          />
          {errors.message && (
            <p className="text-red-900 text-sm mt-1">Message is required</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "bg-(--color-buttonBlue) text-white px-10 py-4 rounded hover:bg-blue-700 cursor-not-allowed flex justify-self-center text-center w-auto transition duration-300"
              : "bg-(--color-buttonBlue) text-white px-10 py-4 rounded hover:bg-blue-700 cursor-pointer flex justify-self-center text-center w-auto transition duration-300"
          }
        >
          {isSubmitting ? "Sending" : "Send Message"}
        </button>
      </form>
    </div>
  );
};
export default Formy;
