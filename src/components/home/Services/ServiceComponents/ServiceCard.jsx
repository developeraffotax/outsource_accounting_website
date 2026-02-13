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
    <Link
      href={pglink}
      className="no-underline text-inherit flex-wrap place-self-center h-full"
    >
      <div className="grid grid-cols-1 grid-rows-[1fr_3fr_1fr] row-span-1 place-self-center bg-white rounded-lg p-3 md:p-6 h-full border border-[#333333] transition-transform w-full md:w-7/8 md:min-h-8/9 lg:min-h-7/8 ">
        <div className="flex flex-row items-center w-full">
          <img
            src={imgServiceCard}
            alt="service cards"
            className="w-12 h-12 mr-4"
          />
          <h3 className="text-[1.25rem] font-light mb-2 text-black">
            {titleServiceCard}
          </h3>
        </div>
        <div className="mt-4 text-center flex flex-col w-full">
          <p className="text-[1rem] font-light text-start text-black">
            {descriptionServiceCard}
          </p>
        </div>
        <span className="mt-4 text-[1rem] font-medium text-black no-underline text-start align-bottom justify-between">
          {buttontxtServiceCard}
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
