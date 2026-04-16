import React from "react";
import ServiceCard from "./ServiceCard.jsx";

const ServiceCards = ({ data }) => {
  return (
    <div className="flex items-stretch justify-center text-black bg-white gap-2 md:gap-8 flex-wrap">
      {data?.map((card, index) => {
        const imgUrl = card.imgSrc?.url;
        return (
          /* The wrapper must also be a flex child that can grow */
          <div key={card.id || index} className="flex">
            <ServiceCard
              imgSrc={imgUrl}
              title={card.title}
              description={card.description}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCards;
