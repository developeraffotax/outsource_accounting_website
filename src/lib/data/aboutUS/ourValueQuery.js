import fetchAboutUsContent from "./aboutContent";

export default async function ourValueQuery() {
  const content = await fetchAboutUsContent();

  return {
    data: {
      ourValue: content.OurValue.map((card) => ({
        id: card.id,
        imgValue: {
          url: card.imgValue,
        },
        headingValue: card.headingValue,
        descriptionValue: card.descriptionValue,
      })),
    },
  };
}
