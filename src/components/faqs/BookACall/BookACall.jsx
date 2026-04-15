"use client";
import { useState } from "react";
import Model from "@/components/shared/forms/Model";
import QuoteForm from "@/components/shared/forms/QuoteForm";

const BookACall = ({ heading, description, img }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" mt-12 flex justify-evenly flex-col md:flex-row bg-purple-50 py-6 md:py-12 lg:py-16">
      <div className=" flex flex-col  gap-6  max-lg:items-center max-lg:max-w-[90%] max-lg:mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-2 md:my-3 text-center lg:text-start ">
          {heading}
        </h1>
        <p className="max-w-140 text-center md:text-start ">{description}</p>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-(--color-buttonBlue) cursor-pointer px-8 py-2 text-white font-normal border-2 rounded-sm border-transparent inline-flex transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:brightness-110 hover:shadow-lg hover:ring-3 hover:ring-(--color-buttonBlue)/20 active:scale-90 active:duration-50"
          >
            Contact us
          </button>
        </div>
      </div>
      <div>
        <img
          src={img}
          alt=""
          className="p-2 w-full max-w-xs sm:max-w-sm md:max-w-md aspect-19/15 object-cover rounded-2xl"
        />
      </div>
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuoteForm onSuccess={() => setIsModalOpen(false)} />
      </Model>
    </div>
  );
};
export default BookACall;
