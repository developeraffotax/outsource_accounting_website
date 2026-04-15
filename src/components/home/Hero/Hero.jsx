"use client";
import { useState } from "react";
import QuoteFormHH from "@/components/shared/forms/QuoteFormHH";
import QuoteForm from "@/components/shared/forms/QuoteForm";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import Model from "@/components/shared/forms/Model.jsx";
import Container from "@/components/wraper/Container";

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
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={img}
        alt={"Background"}
        className="absolute inset-0 h-full w-full object-cover brightness-50 -z-10"
      />

      <Container
        withYPadding={false}
        className="relative z-10 py-10 md:py-14 lg:py-16 md:px-8 lg:px-16 xl:px-44 2xl:px-70"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* LEFT TEXT SECTION */}
          <div className="flex flex-col items-center justify-center text-center text-white lg:col-span-6 lg:items-start lg:text-left xl:col-span-7">
            <p className="mb-4 inline-block w-fit rounded-xl bg-linear-to-r from-[#c0b2ff] to-white px-4 py-2 text-sm font-medium text-[#333]">
              {title}
            </p>

            <h1 className="mb-5 text-2xl font-bold leading-snug sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
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

            <div className="max-w-3xl space-y-4 text-sm leading-relaxed sm:text-base">
              <p>{descriptionHeroHomepage}</p>
              <p>{descriptionHeroHomePageTwo}</p>
            </div>

            <div className="mt-8">
              <QuoteButton onClick={() => setIsModalOpen(true)} />
            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="w-full lg:col-span-6 xl:col-span-5">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white/40 p-4 shadow-lg backdrop-blur-md sm:max-w-lg md:p-8 lg:ml-auto lg:mr-0 lg:max-w-lg lg:p-10 xl:max-w-xl">
              <h2 className="mb-6 text-left text-2xl font-bold text-gray-800 md:text-3xl">
                Quick <span className="text-(--color-buttonBlue)">Quote</span>
              </h2>
              <QuoteFormHH />
            </div>
          </div>
        </div>
      </Container>

      <div className="py-4 md:py-8">{cardsComponent}</div>
      {/* MODAL OVERLAY */}
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuoteForm onSuccess={() => setIsModalOpen(false)} />
      </Model>
    </section>
  );
};
export default Hero;
