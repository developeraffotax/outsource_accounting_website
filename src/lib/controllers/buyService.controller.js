import { buyDataExtractor } from "../services/buyDataExtrasctor";

export default async function buyService(serviceName) {
  if (!serviceName) {
    return Response.json({ error: "Missing serviceName" }, { status: 400 });
  }
  const service = await buyDataExtractor(serviceName);
  if (!service.name && !service.price) {
    return Response.json({ error: "Service not found" }, { status: 404 });
  }
  return service;
}
