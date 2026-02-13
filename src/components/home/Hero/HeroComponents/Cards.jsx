import Card from "./Card";

const Cards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:flex-row relative w-full px-3 md:px-8 lg:px-44 2xl:px-70 mt-4 md:mt-0 gap-4">
      {cards.map((card, index) => (
        <Card
          key={card.id || index}
          imgComponent={card.imgComponent}
          title={card.title}
          content={card.content}
        />
      ))}
    </div>
  );
};

export default Cards;
