"use client";
import Card from "./Card.jsx";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 my-6 lg:px-20 2xl:px-49">
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
