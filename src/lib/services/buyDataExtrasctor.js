import buyService from "../data/buyService/buyService";

export const buyDataExtractor = async (serviceName) => {
  const services = await buyService();
  const normalizedServiceName =
    typeof serviceName === "string" ? serviceName.trim() : "";

  const service = services.find((s) => s.name === normalizedServiceName);

  if (!service) {
    throw new Error("Service not found");
  }
  return service;
};
