import fetchHomeContent from "./homeContent";

export default async function heroData() {
  const content = await fetchHomeContent();

  return {
    data: {
      heroSection: {
        bgImage: {
          url: content.bgImage,
        },
        ukFlage: {
          url: content.ukFlag,
        },
        title: content.title,
        headingFirstText: content.headingTextFirst,
        headingMiddleText: content.headingTextMiddle,
        headingEndText: content.headingTextEnd,
        descriptionHeroHomepage: content.description,
        descriptionHeroHomePageTwo: content.description2,
        freeConsultationImg: {
          url: content.freeConsultationImg,
        },
        freeConsultation: content.freeConsultation,
        Card: content.heroCards.map((card) => ({
          id: card.id,
          imgComponent: {
            url: card.heroCardImg,
          },
          title: card.heroCardTitle,
          content: card.heroCardContent,
        })),
      },
    },
  };
}
