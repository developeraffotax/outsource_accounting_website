import qs from "qs";

const BaseURL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api`;

export default async function fetchData(endpoint, queryObj = {}) {
  const query = qs.stringify(queryObj, { encodeValuesOnly: true });
  const urlQuery = `${BaseURL}/${endpoint}${query ? `?${query}` : ""}`;

  const res = await fetch(urlQuery, {
    next: { tags: [endpoint] }, // tag must match revalidateTag(...)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${text}`);
  }

  return res.json(); // <- this restores old axios-like shape
}
