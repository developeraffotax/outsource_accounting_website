import fetchAboutUsContent from "./aboutContent";

export default async function missionStatementQuery() {
  const content = await fetchAboutUsContent();

  return {
    data: {
      missionStatment: content.OurStory.missionStatmentCards.map((card) => ({
        id: card.id,
        imgStatment: {
          url: card.imgStatment,
        },
        headingStatment: card.headingStatment,
        descriptionStatement: card.descriptionStatement,
      })),
    },
  };
}
