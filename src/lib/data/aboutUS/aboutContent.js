export const ABOUT_US_CONTENT_ENDPOINT = "/api/content/about-us";

const ABOUT_US_FALLBACK_CONTENT = Object.freeze({
  heading: "",
  subHeading: "",
  img: "",
  OurStory: {
    imgOurStory: "",
    headingOurStory: "",
    descriptionOurStory: "",
    descriptiontwoOurStory: "",
    missionStatmentCards: [],
  },
  OurValue: [],
});

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getAboutUsApiBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.ABOUT_US_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.HOME_API_BASE_URL ||
    process.env.CONTACT_US_API_BASE_URL ||
    process.env.FAQ_API_BASE_URL ||
    process.env.BUY_SERVICE_API_BASE_URL ||
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
  const baseUrl = getAboutUsApiBaseUrl();

  return baseUrl ? `${baseUrl}${path}` : path;
};

const getAboutUsContentFromPayload = (payload) => {
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

const normalizeMissionStatementCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.imgStatment?.url ||
        entry?.imgStatment?.path ||
        entry?.imgStatment?.src ||
        entry?.imgStatment?.data?.attributes?.url ||
        entry?.imgStatment ||
        "";

      const headingStatment = normalizeText(entry?.headingStatment);
      const descriptionStatement = normalizeText(entry?.descriptionStatement);

      if (!rawImg && !headingStatment && !descriptionStatement) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        imgStatment:
          typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        headingStatment,
        descriptionStatement,
      };
    })
    .filter(Boolean);
};

const normalizeOurValueCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.imgValue?.url ||
        entry?.imgValue?.path ||
        entry?.imgValue?.src ||
        entry?.imgValue?.data?.attributes?.url ||
        entry?.imgValue ||
        "";

      const headingValue = normalizeText(entry?.headingValue);
      const descriptionValue = normalizeText(entry?.descriptionValue);

      if (!rawImg && !headingValue && !descriptionValue) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        imgValue: typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        headingValue,
        // Keep existing UI populated when CMS stores text in headingValue only.
        descriptionValue: descriptionValue || headingValue,
      };
    })
    .filter(Boolean);
};

const normalizeOurStory = (value) => {
  const source = isRecord(value) ? value : {};

  const rawImg =
    source?.imgOurStory?.url ||
    source?.imgOurStory?.path ||
    source?.imgOurStory?.src ||
    source?.imgOurStory?.data?.attributes?.url ||
    source?.imgOurStory ||
    "";

  return {
    imgOurStory: typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
    headingOurStory: normalizeText(source?.headingOurStory),
    descriptionOurStory: normalizeText(source?.descriptionOurStory),
    descriptiontwoOurStory: normalizeText(source?.descriptiontwoOurStory),
    missionStatmentCards: normalizeMissionStatementCards(
      source?.missionStatmentCards,
    ),
  };
};

const normalizeAboutUsContent = (content) => {
  const rawHeroImg =
    content?.img?.url ||
    content?.img?.path ||
    content?.img?.src ||
    content?.img?.data?.attributes?.url ||
    content?.img ||
    content?.ImgHero?.url ||
    content?.ImgHero ||
    "";

  return {
    heading: normalizeText(content?.heading),
    subHeading: normalizeText(content?.subHeading),
    img: typeof rawHeroImg === "string" ? toAbsoluteImageUrl(rawHeroImg) : "",
    OurStory: normalizeOurStory(content?.OurStory || content?.ourstory),
    OurValue: normalizeOurValueCards(content?.OurValue || content?.ourValue),
  };
};

const fetchAboutUsFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getAboutUsApiBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${ABOUT_US_CONTENT_ENDPOINT}`
    : ABOUT_US_CONTENT_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["about-us"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch about-us content: ${response.status}`);
  }

  const payload = await response.json();
  const content = getAboutUsContentFromPayload(payload);

  return normalizeAboutUsContent(content);
};

export default async function fetchAboutUsContent(fetchImpl = fetch) {
  try {
    return await fetchAboutUsFromApi(fetchImpl);
  } catch (error) {
    console.error("Failed to fetch about-us content:", error);
    return {
      heading: ABOUT_US_FALLBACK_CONTENT.heading,
      subHeading: ABOUT_US_FALLBACK_CONTENT.subHeading,
      img: ABOUT_US_FALLBACK_CONTENT.img,
      OurStory: {
        ...ABOUT_US_FALLBACK_CONTENT.OurStory,
        missionStatmentCards: [
          ...ABOUT_US_FALLBACK_CONTENT.OurStory.missionStatmentCards,
        ],
      },
      OurValue: [...ABOUT_US_FALLBACK_CONTENT.OurValue],
    };
  }
}
