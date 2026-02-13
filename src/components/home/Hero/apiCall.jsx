import heroData from "@/lib/data/homepage/heroData";
import Hero from "./Hero";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await heroData();
  const content = res.data.heroSection;
  return (
    <Hero
      img={getImageUrl(content.bgImage?.url)}
      title={content.title}
      headingFirstText={content.headingFirstText}
      headingMiddleText={content.headingMiddleText}
      headingEndText={content.headingEndText}
      descriptionHeroHomepage={content.descriptionHeroHomepage}
      descriptionHeroHomePageTwo={content.descriptionHeroHomePageTwo}
      freeConsultationImg={getImageUrl(content.freeConsultationImg?.url)}
      freeConsultation={content.freeConsultation}
      ukFlagImg={getImageUrl(content.ukFlage?.url)}
    />
  );
};
export default apiCall;
