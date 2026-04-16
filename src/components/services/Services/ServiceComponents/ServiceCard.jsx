"use client";
import React from "react";

const ServiceCard = ({ index, imgSrc, title, description }) => {
  return (
    <div className="contents no-underline text-inherit">
      <div className="row-span-2 grid grid-rows-subgrid gap-y-0 bg-white rounded-lg p-3 md:p-6 border border-gray-400 transition-transform w-full">
        <div className="flex flex-row items-center w-full pb-2">
          <img
            src={imgSrc}
            alt="service cards"
            className="w-12 h-12 mr-4 flex-shrink-0"
          />
          <h3 className="text-[1.15rem] font-medium text-black leading-tight">
            {title}
          </h3>
        </div>
        <div className="border-t border-gray-100 pt-2">
          <p className="text-[0.95rem] font-light text-black leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
