import generalQuizQuery from "@/lib/data/faq/generalQuizQuery.js";
import Cards from "./Cards.jsx";

const Card = async () => {
  const res = await generalQuizQuery();

  const content = res.data?.generalQuiz || res.data?.data?.generalQuiz;

  if (!content || content.length === 0) {
    return <p>there is no data in the content of general quiz</p>;
  }

  return (
    <div className="grid grid-cols-1 items-center w-full md:w-2/3 justify-self-center gap-2">
      {content.map((carding, index) => (
        <Cards
          key={carding.id || index}
          service={carding.service}
          description={carding.description}
        />
      ))}
    </div>
  );
};

export default Card;
