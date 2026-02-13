"use client";
import Card from "./Card.jsx";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const Cards = ({ data }) => {
  return (
    <div className="flex h-auto flex-wrap gap-3 flex-col md:flex-row justify-evenly my-6 lg:px-20 2xl:px-24">
      {data?.map((card, index) => {
        const imgUrl = getImageUrl(card.img?.url);
        return (
          <Card
            key={card.id || index}
            img={imgUrl}
            title={card.title}
            description={card.description}
          />
        );
      })}
    </div>
  );
};
export default Cards;
