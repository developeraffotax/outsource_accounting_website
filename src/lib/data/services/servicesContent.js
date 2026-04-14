export const SERVICES_CONTENT_ENDPOINT = "/api/content/services";

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getServicesApiBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.SERVICES_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.HOME_API_BASE_URL ||
    process.env.ABOUT_US_API_BASE_URL ||
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
  const baseUrl = getServicesApiBaseUrl();

  return baseUrl ? `${baseUrl}${path}` : path;
};

const getImageValue = (value) => {
  if (typeof value === "string") {
    return value;
  }

  if (!isRecord(value)) {
    return "";
  }

  return (
    value.url || value.path || value.src || value?.data?.attributes?.url || ""
  );
};

const toLegacyImageObject = (value) => ({
  url: toAbsoluteImageUrl(getImageValue(value)),
});

const normalizeCardList = (value, imageKey) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const title = normalizeText(entry?.title);
      const description = normalizeText(entry?.description);
      const rawImg = getImageValue(entry?.[imageKey]);

      if (!title && !description && !rawImg) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        title,
        description,
        [imageKey]: toLegacyImageObject(rawImg),
      };
    })
    .filter(Boolean);
};

const normalizePricingFeatures = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry) => {
      const text = normalizeText(entry?.text);

      if (!text) {
        return null;
      }

      return {
        text,
        included: Boolean(entry?.included),
      };
    })
    .filter(Boolean);
};

const normalizePricingPlans = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const name = normalizeText(entry?.name);

      if (!name) {
        return null;
      }

      const rawPrice = entry?.price;
      const numericPrice = Number(rawPrice);

      return {
        id: normalizeText(entry?.id) || `plan-${index + 1}`,
        name,
        checkoutName:
          normalizeText(entry?.checkoutName) || normalizeText(entry?.name),
        price: Number.isFinite(numericPrice) ? numericPrice : 0,
        currency: normalizeText(entry?.currency) || "£",
        description: normalizeText(entry?.description),
        billingCycle: normalizeText(entry?.billingCycle),
        isPopular: Boolean(entry?.isPopular),
        features: normalizePricingFeatures(entry?.features),
      };
    })
    .filter(Boolean);
};

const normalizePricing = (value) => {
  if (!isRecord(value) && !Array.isArray(value)) {
    return null;
  }

  const rawConfig = isRecord(value?.config) ? value.config : value;
  const rawPlans = Array.isArray(value?.plans)
    ? value.plans
    : Array.isArray(value)
      ? value
      : [];

  const plans = normalizePricingPlans(rawPlans);

  if (plans.length === 0) {
    return null;
  }

  return {
    config: {
      eyebrow: normalizeText(rawConfig?.eyebrow),
      title: normalizeText(rawConfig?.title),
      description: normalizeText(rawConfig?.description),
    },
    plans,
  };
};

const normalizeStepCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const title = normalizeText(entry?.title);
      const description = normalizeText(entry?.description);
      const rawImg = getImageValue(entry?.imgSrc);

      if (!title && !description && !rawImg) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        title,
        description,
        imgSrc: toLegacyImageObject(rawImg),
      };
    })
    .filter(Boolean);
};

const normalizeServiceItem = (entry, index) => {
  const description = normalizeText(entry?.description);
  const descriptiontwo = normalizeText(entry?.descriptiontwo);

  return {
    id: entry?._id || entry?.id || index + 1,
    slug: normalizeText(entry?.slug),
    name: normalizeText(entry?.name) || normalizeText(entry?.title),
    title: normalizeText(entry?.title),
    titleHighlight: normalizeText(entry?.titleHighlight),
    subtitle: normalizeText(entry?.subtitle),
    description,
    descriptiontwo,
    shortDescription: description || descriptiontwo,
    buttonText: normalizeText(entry?.buttonText),
    image: toLegacyImageObject(entry?.img || entry?.image),
    bgImage: toLegacyImageObject(entry?.bgimg || entry?.bgImage),
    Pricing: normalizePricing(entry?.Pricing || entry?.pricing),
    WhatYouGet: {
      heading: normalizeText(entry?.WhatYouGet?.heading),
      card: normalizeCardList(entry?.WhatYouGet?.card, "img"),
    },
    ServiceProcess: {
      heading: normalizeText(entry?.ServiceProcess?.heading),
      highlightHeading: normalizeText(
        entry?.ServiceProcess?.highlightheading ||
          entry?.ServiceProcess?.highlightHeading,
      ),
      stepCard: normalizeStepCards(entry?.ServiceProcess?.stepCard),
    },
    GetStarted: {
      heading: normalizeText(entry?.GetStarted?.heading),
      descriptionone: normalizeText(
        entry?.GetStarted?.descriptionone || entry?.GetStarted?.descriptionOne,
      ),
      descriptiontwo: normalizeText(
        entry?.GetStarted?.descriptiontwo || entry?.GetStarted?.descriptionTwo,
      ),
    },
    WhyChooseUs: {
      heading: normalizeText(entry?.WhyChooseUs?.heading),
      img: toLegacyImageObject(entry?.WhyChooseUs?.img),
      Card: normalizeCardList(entry?.WhyChooseUs?.card, "img"),
    },
    statics: {
      heading: normalizeText(entry?.statics?.heading),
      description: normalizeText(entry?.statics?.description),
      imgOne: toLegacyImageObject(
        entry?.statics?.img || entry?.statics?.imgOne,
      ),
      data: normalizeCardList(
        entry?.statics?.card || entry?.statics?.data,
        "img",
      ),
    },
    WhatData: {
      heading: normalizeText(entry?.WhatData?.heading),
      descriptionOne: normalizeText(
        entry?.WhatData?.descriptionone || entry?.WhatData?.descriptionOne,
      ),
      descriptionTwo: normalizeText(
        entry?.WhatData?.descriptiontwo || entry?.WhatData?.descriptionTwo,
      ),
      img: toLegacyImageObject(entry?.WhatData?.img),
    },
    WhoData: {
      heading: normalizeText(entry?.WhoData?.heading),
      descriptionOne: normalizeText(
        entry?.WhoData?.descriptionone || entry?.WhoData?.descriptionOne,
      ),
      descriptionTwo: normalizeText(
        entry?.WhoData?.descriptiontwo || entry?.WhoData?.descriptionTwo,
      ),
      img: toLegacyImageObject(entry?.WhoData?.img),
    },
  };
};

const getServicesArrayFromPayload = (payload) => {
  if (Array.isArray(payload?.content)) {
    return payload.content;
  }

  if (Array.isArray(payload?.data?.content)) {
    return payload.data.content;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (isRecord(payload?.content)) {
    return [payload.content];
  }

  if (isRecord(payload?.data)) {
    return [payload.data];
  }

  if (isRecord(payload)) {
    return [payload];
  }

  return [];
};

const fetchServicesContentFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getServicesApiBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${SERVICES_CONTENT_ENDPOINT}`
    : SERVICES_CONTENT_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["services"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch services content: ${response.status}`);
  }

  const payload = await response.json();
  const servicesArray = getServicesArrayFromPayload(payload);

  return servicesArray
    .map((entry, index) => normalizeServiceItem(entry, index))
    .filter((service) => service.slug.length > 0);
};

export default async function fetchServicesContent(fetchImpl = fetch) {
  try {
    return await fetchServicesContentFromApi(fetchImpl);
  } catch (error) {
    console.error("Failed to fetch services content:", error);
    return [];
  }
}
