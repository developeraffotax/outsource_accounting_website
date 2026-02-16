import { FaCalculator, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import Card from "./Card";

const data = [
  {
    key: 1,
    title: "Tax Clarity",
    icon: FaCalculator,
  },
  {
    key: 2,
    title: "Smart Accounting",
    icon: MdAnalytics,
  },
  {
    key: 3,
    title: "Profit Focused",
    icon: FaChartLine,
  },
  {
    key: 4,
    title: "Hassel Removed",
    icon: FaShieldAlt,
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full ">
      {data.map((card) => (
        <Card key={card.key} title={card.title} icon={card.icon} />
      ))}
    </div>
  );
};

export default Cards;
