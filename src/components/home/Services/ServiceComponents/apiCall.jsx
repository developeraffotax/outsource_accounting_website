import serviceData from "@/lib/data/homepage/serviceData";
import ServiceCards from "./ServiceCards";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await serviceData();
  const serviceCardArray = res.data?.service?.serviceCard || [];

  return (
    <ServiceCards
      cards={serviceCardArray.map((card) => ({
        id: card.id,
        pglink: card.pglink,
        imgServiceCard: getImageUrl(card.imgServiceCard?.url),
        titleServiceCard: card.titleServiceCard,
        descriptionServiceCard: card.descriptionServiceCard,
        buttontxtServiceCard: card.buttontxtServiceCard,
      }))}
    />
  );
};

export default apiCall;
