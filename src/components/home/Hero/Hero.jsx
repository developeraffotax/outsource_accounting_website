"use client";
import { useState } from "react";
import QuoteForm from "@/components/shared/forms/QuoteForm";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import Model from "@/components/shared/forms/Model.jsx";

const Hero = ({
  img,
  title,
  headingFirstText,
  headingMiddleText,
  headingEndText,
  descriptionHeroHomepage,
  descriptionHeroHomePageTwo,
  freeConsultationImg,
  freeConsultation,
  ukFlagImg,
  cardsComponent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full">
      {/* Background Image */}
      <img
        src={img}
        alt={"Background"}
        className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
      />
      <div className="h-auto w-full flex flex-col md:flex-row md:items-start items-center pt-10 md:pt-12 justify-center md:justify-between overflow-hidden">
        {/* LEFT TEXT SECTION */}
        <div className="w-full px-4 sm:px-6 md:px-0 md:w-3/4 lg:w-2/4 lg:px-6 md:pl-8 lg:pl-44 2xl:pl-80 text-white flex flex-col justify-center my-6 lg:my-12 md:mr-8">
          <p className=" mb-4 bg-linear-to-r from-[#c0b2ff] to-white text-[#333] px-4 py-2 rounded-xl text-sm font-medium w-fit inline-block">
            {title}
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 leading-snug">
            {headingFirstText}{" "}
            <span className="text-(--color-veryLightBlue)">
              {headingMiddleText}
            </span>{" "}
            {headingEndText}{" "}
            {/* <img
              src={ukFlagImg}
              alt="uk flag"
              className="inline-block w-8 h-8 ml-2"
            /> */}
          </h1>

          {/* Hidden on small screens */}
          <p className="hidden md:block mb-4">{descriptionHeroHomepage}</p>

          <p className="hidden md:block mb-8">{descriptionHeroHomePageTwo}</p>

          <div>
            <QuoteButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:w-2/7 mx-4 sm:mx-6 md:mx-0 md:mr-8 lg:mr-44 2xl:mr-80 bg-white/40 backdrop-blur-md p-4 md:p-12 rounded-xl shadow-lg mt-6 md:mt-0 my-6 lg:my-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
            Quick <span className="text-(--color-buttonBlue)">Quote</span>
          </h2>
          <QuoteForm />
        </div>
      </div>
      <div className="py-8">{cardsComponent}</div>
      {/* MODAL OVERLAY */}
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
          Quick <span className="text-(--color-buttonBlue)">Quote</span>
        </h2>
        <QuoteForm onSuccess={() => setIsModalOpen(false)} />
      </Model>
    </section>
  );
};
export default Hero;
