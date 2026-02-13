import serviceData from "@/lib/data/homepage/serviceData";
import Services from "./Services";
import serviceCardsApiCall from "./ServiceComponents/apiCall";

export const apiCall = async () => {
  const res = await serviceData();
  const content = res.data.service;
  const ServiceCardsComponent = await serviceCardsApiCall();

  return (
    <Services
      heading={content.heading}
      description={content.description}
      serviceCardsComponent={ServiceCardsComponent}
    />
  );
};

export default apiCall;
