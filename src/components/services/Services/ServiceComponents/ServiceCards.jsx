import React from "react";
import ServiceCard from "./ServiceCard.jsx";

const ServiceCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 items-start justify-center text-black bg-white gap-2 md:gap-8">
      {data?.map((card, index) => {
        const imgUrl = card.imgSrc?.url;
        return (
          /* 'contents' makes this div invisible to the layout, letting the child talk to the parent grid */
          <div key={card.id || index} className="contents">
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
