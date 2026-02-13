import first from "@/assets/images/serivePgsImg/Hero/Cards/first.svg";
import second from "@/assets/images/serivePgsImg/Hero/Cards/second.svg";
import third from "@/assets/images/serivePgsImg/Hero/Cards/third.svg";
import forth from "@/assets/images/serivePgsImg/Hero/Cards/forth.svg";
import Card from "./Card";

const data = [
  {
    key: 1,
    title: "Tax Clarity",
    img: first.src,
  },
  {
    key: 2,
    title: "Smart Accounting",
    img: second.src,
  },
  {
    key: 3,
    title: "Profit Focused",
    img: third.src,
  },
  {
    key: 4,
    title: "Hassel Removed",
    img: forth.src,
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
      {data.map((card) => {
        const { key, title, img } = card;
        return <Card key={key} title={title} img={img} />;
      })}
    </div>
  );
};

export default Cards;
