import Container from "@/components/wraper/Container";
import Card from "./Card";

const Cards = ({ cards }) => {
  return (
    <Container withYPadding={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 md:flex-row relative w-full mt-4 md:mt-8 gap-3 md:gap-8 ">
        {cards.map((card, index) => (
          <Card
            key={card.id || index}
            imgComponent={card.imgComponent}
            title={card.title}
            content={card.content}
          />
        ))}
      </div>
    </Container>
  );
};

export default Cards;
