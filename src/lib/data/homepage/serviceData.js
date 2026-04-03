import fetchHomeContent from "./homeContent";

export default async function serviceData() {
  const content = await fetchHomeContent();

  return {
    data: {
      service: {
        heading: content.headingServiceSection,
        description: content.descriptionServiceSection,
        serviceCard: content.serviceCards.map((card) => ({
          id: card.id,
          imgServiceCard: {
            url: card.imgServiceCard,
          },
          titleServiceCard: card.titleServiceCard,
          descriptionServiceCard: card.descriptionServiceCard,
          buttontxtServiceCard: card.buttontxtServiceCard,
          pglink: card.pglink,
        })),
      },
    },
  };
}
