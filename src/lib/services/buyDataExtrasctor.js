import buyService from "../data/buyService/buyService";

export const buyDataExtractor = async (serviceName) => {
  const services = await buyService();
  const normalizedServiceName =
    typeof serviceName === "string" ? serviceName.trim().toLowerCase() : "";

  const service = services.find((s) => {
    const normalizedName =
      typeof s?.name === "string" ? s.name.trim().toLowerCase() : "";
    return normalizedName === normalizedServiceName;
  });

  if (!service) {
    throw new Error("Service not found");
  }
  return service;
};
