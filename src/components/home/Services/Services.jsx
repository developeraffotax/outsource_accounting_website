"use client";
import { useState } from "react";
import QuoteButton from "@/components/shared/buttons/QuoteButton.jsx";
import Model from "@/components/shared/forms/Model.jsx";
import QuoteForm from "@/components/shared/forms/QuoteForm.jsx";
import Container from "@/components/wraper/Container";

const Services = ({ heading, description, serviceCardsComponent }) => {
  const [isModelOpen, setisModelOpen] = useState(false);

  return (
    <Container>
      <section
        className="flex flex-col self-center items-center content-center justify-center text-black bg-white"
        id="services"
      >
        <div className="flex flex-col self-center items-center content-center justify-center align-middle text-black bg-white flex-wrap">
          <h2 className="text-[2rem] font-semibold mb-4 w-full text-center text-[#4632DA] ">
            {heading}
          </h2>
          <p className="text-[1rem] font-normal mb-8 w-full md:w-2/3 text-start md:text-center text-[#333333]">
            {description}
          </p>
          {serviceCardsComponent}
        </div>
        <div className="mt-6">
          <QuoteButton onClick={() => setisModelOpen(true)} />
        </div>
        <Model isOpen={isModelOpen} onClose={() => setisModelOpen(false)}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
            Quick <span className="text-(--color-buttonBlue)">Quote</span>
          </h2>
          <QuoteForm onSuccess={() => setisModelOpen(false)} />
        </Model>
      </section>
    </Container>
  );
};

export default Services;
