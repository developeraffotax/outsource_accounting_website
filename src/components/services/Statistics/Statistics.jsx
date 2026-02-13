import Points from "./points/Points";
import GetStartedButton from "@/components/shared/buttons/GetStartedButton";
import getImageUrl from "@/lib/utils/getImageUrl";

const Statistics = ({ data }) => {
  const imgUrl = getImageUrl(data.imgOne?.url);

  return (
    <div className="flex justify-center lg:justify-evenly items-center mx-6 my-6 md:mx-24 md:my-12 flex-wrap lg:my-12">
      <div className="flex flex-col h-auto justify-center lg:items-start w-120 ">
        <h1 className="text-3xl font-semibold text-center md:mb-4">
          {data.heading}
        </h1>
        <p>{data.description}</p>
        <div className="my-3">
          <Points data={data.data} />
        </div>
        <div className="">
          <GetStartedButton />
        </div>
      </div>
      <div className="relative flex mt-6 w-80 h-70 md:w-140 md:h-120 items-center justify-center lg:justify-end overflow-hidden">
        <img
          src={imgUrl}
          alt="statisticsone"
          className="absolute inline-block rounded  ring-white left-0 lg:left-6"
        />
      </div>
    </div>
  );
};

export default Statistics;
