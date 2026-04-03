import fetchHomeContent from "./homeContent";

export default async function testimonialData() {
  const content = await fetchHomeContent();

  return {
    data: {
      clientsTestimonial: {
        heading: content.headingClientsTestimonial,
        testimonialCard: content.testimonialsCard.map((card) => ({
          id: card.id,
          testimonialBgImg: {
            url: card.testimonialBgImg,
          },
          testimonialPersonImg: {
            url: card.testimonialPersonImg,
          },
          testimonialTitle: card.testimonialTitle,
          testimonialDescription: card.testimonialDescription,
          testimonialPersonName: card.testimonialPersonName,
        })),
      },
    },
  };
}
