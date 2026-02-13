"use client";
import React from "react";

const ServiceCard = ({ index, imgSrc, title, description }) => {
  return (
    <div className="no-underline text-inherit flex-wrap">
      <div className="flex flex-col items-center justify-start  bg-white rounded-lg p-3 md:p-6 h-auto border border-gray-400 transition-transform w-full md:w-70 min-h-50 md:min-h-65 max-h-80">
        <div className="flex flex-row items-center w-full">
          <img src={imgSrc} alt="service cards" className="w-12 h-12 mr-4" />
          <h3 className="text-[1.25rem] font-light mb-2 text-black">{title}</h3>
        </div>
        <div className="mt-4 text-center flex flex-col w-full">
          <p className="text-[1rem] font-light text-start text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
