import buyService from "../data/buyService/buyService";

export const buyDataExtractor = async (serviceName) => {
  const res = await buyService();

  const services =
    res?.data?.nameNprize?.map((item) => ({
      id: item.id,
      name: item.Name,
      price: item.Prize,
    })) || [];

  const service = services.find((s) => s.name === serviceName);

  if (!service) {
    throw new Error("Service not found");
  }
  return service;
};
