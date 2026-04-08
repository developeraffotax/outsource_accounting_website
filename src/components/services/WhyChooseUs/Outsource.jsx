"use client";
import React, { useState } from "react";
import BulletPoints from "./components/BulletPoints.jsx";
import QuoteButton from "@/components/shared/buttons/QuoteButton.jsx";
import Model from "@/components/shared/forms/Model.jsx";
import QuoteForm from "@/components/shared/forms/QuoteForm.jsx";
import getImageUrl from "@/lib/utils/getImageUrl.js";
import Container from "@/components/wraper/Container";

const Outsource = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgUrl = getImageUrl(data.img?.url);

  return (
    <>
      <Container withYPadding={true} className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Column */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
              <img
                src={imgUrl}
                alt="Outsource Illustration"
                className="w-full h-auto aspect-video lg:aspect-4/3 object-cover"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {data.heading}
            </h1>

            <div className="text-left">
              <BulletPoints data={data.Card} />
            </div>

            <div className="flex justify-center lg:justify-start">
              <QuoteButton onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
        </div>
      </Container>

      {/* Modal Section */}
      <Model onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
          Quick <span className="text-[var(--color-buttonBlue)]">Quote</span>
        </h2>
        <QuoteForm onSuccess={() => setIsModalOpen(false)} />
      </Model>
    </>
  );
};

export default Outsource;
