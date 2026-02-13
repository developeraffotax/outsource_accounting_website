import getImageUrl from "@/lib/utils/getImageUrl";

const AnnualAcounts = ({ data }) => {
  const imgUrl = getImageUrl(data.img?.url);

  return (
    <div className="flex flex-col items-center mx-3 md:mx-12 my-6 2xl:mx-24 md:my-12">
      <div className="flex flex-col lg:flex-row justify-center md:justify-evenly items-center gap-6 lg:gap-12 mt-8">
        <div className="relative flex justify-center md:justify-start">
          <img
            src={imgUrl}
            alt="Annual accounts preparation illustration"
            className="rounded w-8/9 h-8/9"
          />
        </div>
        <div className="flex flex-col justify-center content-center items-center text-center md:text-start md:items-start lg:items-start w-full lg:w-120 gap-6 ">
          <h1 className="text-3xl font-semibold">{data.heading}</h1>
          <p className="font-light">{data.descriptionOne}</p>
          <p className="font-light">{data.descriptionTwo}</p>
        </div>
      </div>
    </div>
  );
};
export default AnnualAcounts;
