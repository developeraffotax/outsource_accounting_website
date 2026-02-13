"use client";
import { useState } from "react";
import ContectForm from "@/components/shared/forms/contactForm/ContectForm";
import Modeltwo from "@/components/shared/forms/Modeltwo";

const BookACall = ({ heading, description, img }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="  flex justify-evenly flex-col md:flex-row bg-purple-50 py-6 md:py-12 lg:py-16">
      <div className=" flex flex-col gap-6">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-2 md:my-3 text-center lg:text-start ">
          {heading}
        </h1>
        <p className="max-w-140 text-center md:text-start">{description}</p>
        <p
          onClick={() => setIsModalOpen(true)}
          className="bg-(--color-buttonBlue) p-2 text-center text-white lg:p-6 w-1/2 rounded-lg cursor-pointer"
        >
          Book free 30 Min Now
        </p>
      </div>
      <div>
        <img src={img} alt="" className="p-2" />
      </div>
      <Modeltwo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContectForm onSuccess={() => setIsModalOpen(false)} />
      </Modeltwo>
    </div>
  );
};
export default BookACall;
