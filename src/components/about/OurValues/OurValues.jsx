import ourValueQuery from "@/lib/data/aboutUS/ourValueQuery";
import getImageUrl from "@/lib/utils/getImageUrl";

const OurValues = async () => {
  const res = await ourValueQuery();
  const content = res.data.ourValue || [];

  return (
    <div className="flex flex-col justify-between items-center mx-3 md:mx-8 lg:mx-44 2xl:mx-70 my-6 md:my-12 lg:my-18">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl my-12 lg:mb-12 text-center">
        Mission Statement & Vision Statement
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
        {content.map((card, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index % 2 === 1 ? "pt-6 md:pt-8 lg:pt-10" : ""
              }`}
            >
              <img
                src={getImageUrl(card.imgValue?.url)}
                alt="one"
                className="w-46 md:w-48 lg:w-66 h-auto object-contain"
              />
              <p className="text-center mt-2">{card.descriptionValue}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OurValues;
