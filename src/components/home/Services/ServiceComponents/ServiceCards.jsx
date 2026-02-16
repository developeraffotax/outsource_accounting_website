import ServiceCard from "./ServiceCard.jsx";

const ServiceCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 place-items-center place-content-center text-black bg-white gap-2 lg:gap-5 w-full lg:w-7/9">
      {cards.map((card, index) => (
        <ServiceCard
          key={card.id || index}
          pglink={card.pglink}
          imgServiceCard={card.imgServiceCard}
          titleServiceCard={card.titleServiceCard}
          descriptionServiceCard={card.descriptionServiceCard}
          buttontxtServiceCard={card.buttontxtServiceCard}
        />
      ))}
    </div>
  );
};

export default ServiceCards;
