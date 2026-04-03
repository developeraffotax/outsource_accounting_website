import fetchHomeContent from "./homeContent";

export default async function whyOutSourceData() {
  const content = await fetchHomeContent();

  return {
    data: {
      WhyOutsoutcing: {
        // Heading is now sourced from the heading field first.
        heading: content.headingWhyOutsoutcing || content.whyOutsoutcing,
        descriptionWhyOutsoutcing: content.descriptionWhyOutsoutcing,
        imgWhyOutsoutcing: {
          url: content.imgWhyOutsoutcing,
        },
        imgtwoWhyOutsoutcing: {
          url: content.imgtwoWhyOutsoutcing,
        },
        pointerWhyOutsoutcing: content.whyOutsoutcingCards.map((card) => ({
          id: card.id,
          imgPoinerWhyOutsoutcing: {
            url: card.whyCardImage,
          },
          pointerTextWhyOutsoutcing: card.whyCardPointerText,
        })),
      },
    },
  };
}
