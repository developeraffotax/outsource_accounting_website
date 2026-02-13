import missionStatementQuery from "@/lib/data/aboutUS/missionStatementQuery";
import getImageUrl from "@/lib/utils/getImageUrl";

const MissionStatement = async () => {
  const res = await missionStatementQuery();
  const content = res.data?.missionStatment || [];

  return (
    <div className="bg-blue-800 flex flex-col justify-between items-center p-8 text-white my-6 lg:my-12 ">
      <div>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl my-6 lg:mb-12">
          Mission Statement & Vision Statement
        </h1>
      </div>
      <div className="w-auto h-auto flex flex-col lg:flex-row gap-8 justify-center items-center">
        {content.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black grid grid-cols-1 grid-rows-[auto_auto_1fr] h-screen p-6 justify-items-center max-w-220 lg:max-w-120 max-h-min md:max-h-90 rounded-2xl"
          >
            {item.imgStatment?.url && (
              <img
                src={getImageUrl(item.imgStatment.url)}
                alt={item.headingStatment || "Statement"}
                className="w-24 h-24 my-2"
              />
            )}
            <h1 className="font-semibold my-2">{item.headingStatment}</h1>
            <p>{item.descriptionStatement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MissionStatement;
