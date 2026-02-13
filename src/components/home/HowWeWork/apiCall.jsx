import howWeWorkAround from "@/lib/data/homepage/howWeWork";
import HowWeWork from "./HowWeWork";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await howWeWorkAround();
  const content = res.data.howWeWork;

  return (
    <HowWeWork
      heading={content.heading}
      one={content.one}
      oneIcon={getImageUrl(content.oneIcon?.url)}
      description={content.description}
      lineOne={getImageUrl(content.lineOne?.url)}
      two={content.two}
      twoIcon={getImageUrl(content.twoIcon?.url)}
      titletwo={content.titletwo}
      descriptiontwo={content.descriptiontwo}
      lineTwo={getImageUrl(content.lineTwo?.url)}
      three={content.three}
      threeIcon={getImageUrl(content.threeIcon?.url)}
      threeTitle={content.threeTitle}
      threeDescription={content.threeDescription}
    />
  );
};

export default apiCall;