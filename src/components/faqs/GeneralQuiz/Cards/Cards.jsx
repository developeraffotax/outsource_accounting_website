"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Cards = ({ service, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center border border-gray-200 mx-6 md:mx-0 px-6 py-4 lg:mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none"
      >
        <h1 className="font-medium md:font-semibold text-lg leading-tight flex">
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 mr-3 border border-gray-500 rounded hidden md:block ${
              isOpen ? "rotate-180  " : "rotate-0 "
            }`}
          />
          {service}
        </h1>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-light text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
