"use client";
import React from "react";

const ServiceCard = ({ index, imgSrc, title, description }) => {
  return (
    <div className="no-underline text-inherit flex h-full">
      <div className="flex flex-col items-center min-h-60 justify-center bg-white rounded-lg p-3 md:p-6 h-full border border-gray-400 transition-transform w-full md:w-70">
        <div className="flex flex-row items-center  w-full">
          <img src={imgSrc} alt="service cards" className="w-12 h-12 mr-4" />
          <h3 className="">{title}</h3>
        </div>

        <div className="mt-4  flex flex-col w-full">
          <p className=" font-light  ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
