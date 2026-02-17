import React from "react";
import Link from "next/link";

const ServiceCard = ({
  index,
  pglink,
  imgServiceCard,
  titleServiceCard,
  descriptionServiceCard,
  buttontxtServiceCard,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-3 lg:p-6 h-full border border-[#333333] transition-transform w-full">
      {/* Top Section */}
      <div className="flex flex-row md:flex-col lg:flex-row items-center w-full">
        <img
          src={imgServiceCard}
          alt="service cards"
          className="w-12 h-12 mr-4"
        />
        <h3 className="text-[1.25rem] font-light mb-2 text-black">
          {titleServiceCard}
        </h3>
      </div>

      {/* Middle Section */}
      <div className="mt-4">
        <p className="text-[1rem] font-light text-start text-black">
          {descriptionServiceCard}
        </p>
      </div>

      {/* Bottom Link */}
      <Link
        href={pglink}
        className="mt-auto pt-4 text-[1rem] font-medium text-black no-underline text-start"
      >
        {buttontxtServiceCard}
      </Link>
    </div>
  );
};

export default ServiceCard;
