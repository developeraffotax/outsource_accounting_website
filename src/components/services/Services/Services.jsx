"use client";
import ServiceCards from "./ServiceComponents/ServiceCards.jsx";
import GetStartedButton from "@/components/shared/buttons/GetStartedButton.jsx";
import Container from "@/components/wraper/Container";

const Services = ({ data }) => {
  return (
    <Container withYPadding={false} className="my-6 md:my-12">
      <section
        className="flex flex-col self-center items-center content-center justify-center text-black bg-white"
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
    </Container>
  );
};

export default Services;
