import { buyDataExtractor } from "../services/buyDataExtrasctor";

export default async function buyService(serviceName) {
  if (!serviceName) {
    throw Object.assign(new Error("Missing serviceName"), { statusCode: 400 });
  }

  const service = await buyDataExtractor(serviceName);

  if (!service?.name || !service?.price) {
    throw Object.assign(new Error("Service not found"), { statusCode: 404 });
  }

  return service;
}
