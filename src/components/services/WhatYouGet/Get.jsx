"use client";
import Cards from "./components/Cards";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import Model from "@/components/shared/forms/Model";
import QuoteForm from "@/components/shared/forms/QuoteForm";
import { useState } from "react";

const Get = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center my-3 md:my-12 lg:my-24 ">
      <div className="flex flex-col items-center bg-blue-50 ">
        <div className="py-3 md:py-8">
          <h1 className="text-blue-800 font-semibold md:font-semibold text-2xl md:text-4xl">
            {data.heading}
          </h1>
        </div>

        <Cards data={data.card} />
      </div>
      <div className="my-3 md:my-6">
        <QuoteButton onClick={() => setIsModalOpen(true)} />
      </div>
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
          Quick <span className="text-(--color-buttonBlue)">Quote</span>
        </h2>
        <QuoteForm onSuccess={() => isModalOpen(false)} />
      </Model>
    </div>
  );
};

export default Get;
