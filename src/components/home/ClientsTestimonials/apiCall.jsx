import testimonial from "@/lib/data/homepage/testimonial";
import ClientsTestimonials from "./ClientsTestimonials";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await testimonial();
  const content = res.data.clientsTestimonial;
  const testimonialCards = content.testimonialCard || [];

  return (
    <ClientsTestimonials
      heading={content.heading}
      testimonialCards={testimonialCards.map((card) => ({
        id: card.id,
        bgImg: getImageUrl(card.testimonialBgImg?.url),
        personImg: getImageUrl(card.testimonialPersonImg?.url),
        name: card.testimonialPersonName,
        title: card.testimonialTitle,
        description: card.testimonialDescription,
      }))}
    />
  );
};

export default apiCall;
