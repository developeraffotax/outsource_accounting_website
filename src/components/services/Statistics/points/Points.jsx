import Point from "./Point";
import getImageUrl from "@/lib/utils/getImageUrl";

const Points = ({ data }) => {
  return (
    <ul>
      {data?.map((point, index) => {
        const imgUrl = getImageUrl(point.img?.url);
        return (
          <Point
            key={point.id || index}
            img={imgUrl}
            description={point.description}
            heading={point.title}
          />
        );
      })}
    </ul>
  );
};

export default Points;
