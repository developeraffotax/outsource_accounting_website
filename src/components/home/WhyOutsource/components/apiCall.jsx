import whyOutSourceData from "@/lib/data/homepage/whyOutSourceData";
import BulletPoints from "./BulletPoints";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await whyOutSourceData();
  const pointArray = res.data?.WhyOutsoutcing?.pointerWhyOutsoutcing || [];

  return (
    <BulletPoints
      points={pointArray.map((point) => ({
        id: point.id,
        img: getImageUrl(point.imgPoinerWhyOutsoutcing?.url),
        description: point.pointerTextWhyOutsoutcing,
      }))}
    />
  );
};

export default apiCall;
