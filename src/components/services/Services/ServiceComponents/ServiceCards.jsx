import React from "react";
import ServiceCard from "./ServiceCard.jsx";

const ServiceCards = ({ data }) => {
  return (
    <div className="flex self-center items-center content-center justify-center text-black bg-white gap-2 md:gap-8 flex-wrap">
      {data?.map((card, index) => {
        const imgUrl = card.imgSrc?.url;
        return (
          <ServiceCard
            key={card.id || index}
            imgSrc={imgUrl}
            title={card.title}
            description={card.description}
          />
        );
      })}
    </div>
  );
};

export default ServiceCards;
