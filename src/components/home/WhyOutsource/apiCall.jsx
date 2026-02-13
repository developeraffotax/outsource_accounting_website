import whyOutSourceData from "@/lib/data/homepage/whyOutSourceData";
import Outsource from "./Outsource";
import getImageUrl from "@/lib/utils/getImageUrl";
import bulletPointsApiCall from "./components/apiCall";

export const apiCall = async () => {
  const res = await whyOutSourceData();
  const content = res.data.WhyOutsoutcing;
  const BulletPoints = await bulletPointsApiCall();

  return (
    <Outsource
      heading={content.heading}
      description={content.descriptionWhyOutsoutcing}
      img={getImageUrl(content.imgWhyOutsoutcing?.url)}
      imgTwo={getImageUrl(content.imgtwoWhyOutsoutcing?.url)}
      bulletPointsComponent={BulletPoints}
    />
  );
};

export default apiCall;
