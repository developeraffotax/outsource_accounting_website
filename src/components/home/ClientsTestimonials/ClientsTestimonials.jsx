"use client";
import React, { useRef } from "react";
import Card from "./components/Card";
import arrow from "../../../assets/images/ClientsTestimonials/arrow.png";
import Container from "@/components/wraper/Container";

const ClientsTestimonials = ({ heading, testimonialCards }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <Container>
      <div className="relative flex flex-col md:flex-row items-center justify-center mb-12">
        <h1 className="font-bold text-3xl text-center bg-linear-to-l from-blue-600 to-black bg-clip-text text-transparent">
          {heading}
        </h1>

        <div className="hidden md:flex absolute right-0 gap-4">
          <button
            onClick={scrollLeft}
            className="h-auto w-auto rounded-full hover:bg-gray-200 transition-colors bg-white"
          >
            <img
              src={arrow.src}
              alt="Previous"
              className="w-6 h-6 rotate-180"
            />
          </button>
          <button
            onClick={scrollRight}
            className="h-auto w-auto rounded-full hover:bg-gray-200 transition-colors bg-white"
          >
            <img src={arrow.src} alt="Next" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-8 px-2"
      >
        {testimonialCards.map((card, index) => (
          <div key={card.id || index} className="flex">
            <Card
              bgImg={card.bgImg}
              personImg={card.personImg}
              name={card.name}
              title={card.title}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ClientsTestimonials;
