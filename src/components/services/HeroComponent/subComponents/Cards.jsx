import first from "@/assets/images/serivePgsImg/Hero/Cards/first.svg";
import second from "@/assets/images/serivePgsImg/Hero/Cards/second.svg";
import third from "@/assets/images/serivePgsImg/Hero/Cards/third.svg";
import forth from "@/assets/images/serivePgsImg/Hero/Cards/forth.svg";
import Card from "./Card";

import {
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";

const data = [
  {
    key: 1,
    title: "Tax Clarity",
    icon: <FiDollarSign size={36} className="text-white" />,
    gradient: "from-blue-400 to-purple-500",
  },
  {
    key: 2,
    title: "Smart Accounting",
    icon: <FiTrendingUp size={36} className="text-white" />,
    gradient: "from-green-400 to-teal-500",
  },
  {
    key: 3,
    title: "Profit Focused",
    icon: <FiBarChart2 size={36} className="text-white" />,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    key: 4,
    title: "Hassle Removed",
    icon: <FiCheckCircle size={36} className="text-white" />,
    gradient: "from-pink-400 to-red-500",
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full px-4 md:px-0">
      {data.map(({ key, title, icon, gradient }) => (
        <Card key={key} title={title} icon={icon} gradient={gradient} />
      ))}
    </div>
  );
};

export default Cards;
