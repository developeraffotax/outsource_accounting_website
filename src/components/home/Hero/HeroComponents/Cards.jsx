import Container from "@/components/wraper/Container";
import Card from "./Card";

const Cards = ({ cards }) => {
  const totalCards = cards.length;
  const lgRemainder = totalCards % 3;

  return (
    <Container withYPadding={false}>
      <div className="relative mt-4 grid w-full grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:auto-rows-fr md:gap-8 lg:grid-cols-6 2xl:grid-cols-5">
        {cards.map((card, index) => {
          const isLastOddCard =
            totalCards % 2 === 1 && index === totalCards - 1;
          const isSecondLastPairOnLg =
            lgRemainder === 2 && index === totalCards - 2;
          const isLastPairOnLg = lgRemainder === 2 && index === totalCards - 1;
          const isLastSingleOnLg =
            lgRemainder === 1 && index === totalCards - 1;
          const wrapperClass = [
            "h-full lg:col-span-2 2xl:col-span-1",
            isLastOddCard
              ? "md:col-span-2 md:mx-auto md:w-full md:max-w-lg lg:max-w-none"
              : "",
            isSecondLastPairOnLg ? "lg:col-start-2 2xl:col-start-auto" : "",
            isLastPairOnLg ? "lg:col-start-4 2xl:col-start-auto" : "",
            isLastSingleOnLg ? "lg:col-start-3 2xl:col-start-auto" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={card.id || index} className={wrapperClass}>
              <Card
                imgComponent={card.imgComponent}
                title={card.title}
                content={card.content}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Cards;
