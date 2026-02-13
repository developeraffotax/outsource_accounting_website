"use client";
import React, { useState } from "react";
import BulletPoints from "./components/BulletPoints.jsx";
import QuoteButton from "@/components/shared/buttons/QuoteButton.jsx";
import Model from "@/components/shared/forms/Model.jsx";
import QuoteForm from "@/components/shared/forms/QuoteForm.jsx";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const Outsource = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const imgUrl = getImageUrl(data.img?.url);

  return (
    <>
      <div className="flex justify-center lg:justify-evenly items-center mx-3 my-6 md:mx-8 lg:mx-44 2xl:mx-60 md:my-12 flex-wrap lg:my-12">
        <div className="relative flex mt-6 w-80 h-70 md:w-140 md:h-120 items-center justify-center lg:justify-end overflow-hidden">
          <img
            src={imgUrl}
            alt="whyOutSourceUperImg"
            className="absolute inline-block rounded  ring-white left-0 lg:left-6"
          />
        </div>
        <div className="flex flex-col h-auto justify-center lg:items-start w-120 ">
          <h1 className="text-3xl font-semibold text-center md:mb-4">
            {data.heading}
          </h1>
          <BulletPoints data={data.Card} />
          <div className="flex justify-center md:start-0">
            <QuoteButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <Model onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
            Quick <span className="text-(--color-buttonBlue)">Quote</span>
          </h2>
          <QuoteForm onSuccess={() => setIsModalOpen(false)} />
        </Model>
      </div>
    </>
  );
};
export default Outsource;
