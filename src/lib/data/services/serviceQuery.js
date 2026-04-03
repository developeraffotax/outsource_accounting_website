import fetchServicesContent from "./servicesContent";

export async function getServiceBySlug(slug) {
  const normalizedSlug =
    typeof slug === "string" ? slug.trim().toLowerCase() : "";

  if (!normalizedSlug) {
    return { data: [] };
  }

  const services = await fetchServicesContent();
  const service = services.find(
    (item) => item.slug.toLowerCase() === normalizedSlug,
  );

  return {
    data: service ? [service] : [],
  };
}

export async function getAllServices() {
  const services = await fetchServicesContent();

  return {
    data: services
      .filter((service) => service.slug)
      .map((service) => ({ slug: service.slug })),
  };
}
