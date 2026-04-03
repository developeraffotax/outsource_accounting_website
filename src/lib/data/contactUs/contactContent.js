export const CONTACT_US_CONTENT_ENDPOINT = "/api/content/contact-us";

const CONTACT_US_FALLBACK_CONTENT = Object.freeze({
  heading: "Contact Our Friendly Team",
  description:
    "Looking for help? Look no further! Our team of experts is always ready to answer any questions you may have.",
  img: "",
  getInTouch: [],
});

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getContactUsApiBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.CONTACT_US_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.BUY_SERVICE_API_BASE_URL ||
    process.env.FAQ_API_BASE_URL ||
    process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL;

  if (explicitApiBaseUrl) {
    return normalizeBaseUrl(explicitApiBaseUrl);
  }

  const siteBaseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  return normalizeBaseUrl(siteBaseUrl);
};

const isRecord = (value) => Boolean(value) && typeof value === "object";

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : String(value ?? "").trim();

const toAbsoluteImageUrl = (value) => {
  const normalized = normalizeText(value);

  if (!normalized) {
    return "";
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("//")) {
    return `https:${normalized}`;
  }

  const path = normalized.startsWith("/") ? normalized : `/${normalized}`;
  const baseUrl = getContactUsApiBaseUrl();
  return baseUrl ? `${baseUrl}${path}` : path;
};

const getContactUsContentFromPayload = (payload) => {
  if (isRecord(payload?.content)) {
    return payload.content;
  }

  if (isRecord(payload?.data?.content)) {
    return payload.data.content;
  }

  if (isRecord(payload?.data)) {
    return payload.data;
  }

  if (isRecord(payload)) {
    return payload;
  }

  return {};
};

const normalizeGetInTouch = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const title = normalizeText(entry?.title);
      const description = normalizeText(entry?.description);
      const detail = normalizeText(entry?.detail);
      const rawImg =
        entry?.img?.url ||
        entry?.img?.path ||
        entry?.img?.src ||
        entry?.img?.data?.attributes?.url ||
        entry?.img ||
        "";

      if (!title && !description && !detail && !rawImg) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        title,
        description,
        detail,
        img: typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
      };
    })
    .filter(Boolean);
};

const normalizeContactUsContent = (content) => {
  const rawImg =
    content?.img?.url ||
    content?.img?.path ||
    content?.img?.src ||
    content?.img?.data?.attributes?.url ||
    content?.img ||
    "";

  const normalizedHeading = normalizeText(content?.heading);
  const normalizedDescription = normalizeText(content?.description);

  return {
    heading:
      normalizedHeading || normalizeText(CONTACT_US_FALLBACK_CONTENT.heading),
    description:
      normalizedDescription ||
      normalizeText(CONTACT_US_FALLBACK_CONTENT.description),
    img: typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
    getInTouch: normalizeGetInTouch(content?.getInTouch),
  };
};

const fetchContactUsFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getContactUsApiBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${CONTACT_US_CONTENT_ENDPOINT}`
    : CONTACT_US_CONTENT_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["contact-us"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contact-us content: ${response.status}`);
  }

  const payload = await response.json();
  const content = getContactUsContentFromPayload(payload);
  return normalizeContactUsContent(content);
};

export default async function fetchContactUsContent(fetchImpl = fetch) {
  try {
    return await fetchContactUsFromApi(fetchImpl);
  } catch (error) {
    console.error("Failed to fetch contact-us content:", error);
    return {
      heading: CONTACT_US_FALLBACK_CONTENT.heading,
      description: CONTACT_US_FALLBACK_CONTENT.description,
      img: CONTACT_US_FALLBACK_CONTENT.img,
      getInTouch: [...CONTACT_US_FALLBACK_CONTENT.getInTouch],
    };
  }
}
