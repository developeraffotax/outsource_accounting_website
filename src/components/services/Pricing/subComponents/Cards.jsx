import Card from "./Card";

const Cards = ({ data = [] }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((plan) => (
        <Card key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default Cards;
