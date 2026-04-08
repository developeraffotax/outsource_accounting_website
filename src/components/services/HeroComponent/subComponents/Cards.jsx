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
  const desktopColsClass =
    data.length >= 5 ? "2xl:grid-cols-5" : "2xl:grid-cols-4";
  const lgRemainder = data.length % 3;

  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${desktopColsClass}`}
    >
      {data.map((card, index) => {
        const isLastOddCard =
          data.length % 2 === 1 && index === data.length - 1;
        const isSecondLastPairOnLg =
          lgRemainder === 2 && index === data.length - 2;
        const isLastPairOnLg = lgRemainder === 2 && index === data.length - 1;

        const wrapperClass = [
          isLastOddCard
            ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-sm lg:col-span-1 lg:max-w-none"
            : "",
          isSecondLastPairOnLg
            ? "lg:col-start-1 lg:justify-self-end 2xl:col-auto 2xl:justify-self-auto"
            : "",
          isLastPairOnLg
            ? "lg:col-start-3 lg:justify-self-start 2xl:col-auto 2xl:justify-self-auto"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={card.key} className={wrapperClass || undefined}>
            <Card title={card.title} icon={card.icon} />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
