"use client";
import ServiceCards from "./ServiceComponents/ServiceCards.jsx";
import GetStartedButton from "@/components/shared/buttons/GetStartedButton.jsx";

const Services = ({ data }) => {
  return (
    <section
      className="flex flex-col self-center items-center content-center justify-center text-black bg-white mx-3 my-6 md:mx-8 lg:mx-44 2xl:mx-80 md:my-12"
      id="services"
    >
      <div className="flex self-center items-center content-center justify-center text-black bg-white flex-wrap">
        <h2 className="text-2xl font-bold mb-4 mx-6 w-full text-center">
          {data.heading}
          <span className="text-blue-800">{data.highlightHeading}</span>
        </h2>
        <ServiceCards data={data.stepCard} />
      </div>
      <div className="my-2 md:my-6">
        <GetStartedButton />
      </div>
    </section>
  );
};

export default Services;
