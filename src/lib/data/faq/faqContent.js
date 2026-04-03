export const FAQ_CONTENT_ENDPOINT = "/api/content/faq";

const FAQ_FALLBACK_CONTENT = Object.freeze({
  hero: {
    heading: "Frequently Ask Questions",
    description:
      "These are most commonly question about Outsource Accounting. Can't find what you're Looking for ?",
    link: "Chat to our friendly team",
  },
  generalQuiz: [],
  bookACall: {
    heading: "Book a 1 - on - 1 Call",
    description:
      "Have questions or need personalized support? Our team is here to help you every step of the way--don't hesitate to reach out!",
    img: "",
  },
});

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getFaqApiBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.FAQ_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.BUY_SERVICE_API_BASE_URL ||
    process.env.NEXT_PUBLIC_FAQ_API_BASE_URL ||
    process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BUY_SERVICE_API_BASE_URL;

  if (explicitApiBaseUrl) {
    return normalizeBaseUrl(explicitApiBaseUrl);
  }

  const siteBaseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  return normalizeBaseUrl(siteBaseUrl);
};

const isRecord = (value) => value && typeof value === "object";

const getFaqContentFromPayload = (payload) => {
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
  const baseUrl = getFaqApiBaseUrl();

  return baseUrl ? `${baseUrl}${path}` : path;
};

const normalizeHero = (content) => {
  const candidate = isRecord(content?.hero) ? content.hero : content;

  return {
    heading: normalizeText(candidate?.heading),
    description: normalizeText(candidate?.description),
    link: normalizeText(candidate?.link),
  };
};

const normalizeGeneralQuiz = (content) => {
  const source = Array.isArray(content?.generalQuiz) ? content.generalQuiz : [];

  return source
    .map((entry, index) => {
      const service = normalizeText(entry?.service || entry?.question);
      const description = normalizeText(entry?.description || entry?.answer);

      if (!service || !description) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        service,
        description,
      };
    })
    .filter(Boolean);
};

const normalizeBookACall = (content) => {
  const source = isRecord(content?.bookACall) ? content.bookACall : {};
  const rawImg =
    source?.img?.url ||
    source?.img?.path ||
    source?.img?.src ||
    source?.img?.data?.attributes?.url ||
    source?.img ||
    "";

  return {
    heading: normalizeText(source?.heading),
    description: normalizeText(source?.description),
    img: typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
  };
};

const normalizeFaqContent = (content) => {
  const hero = normalizeHero(content);
  const generalQuiz = normalizeGeneralQuiz(content);
  const bookACall = normalizeBookACall(content);

  return {
    hero: {
      heading: hero.heading || FAQ_FALLBACK_CONTENT.hero.heading,
      description: hero.description || FAQ_FALLBACK_CONTENT.hero.description,
      link: hero.link || FAQ_FALLBACK_CONTENT.hero.link,
    },
    generalQuiz,
    bookACall: {
      heading: bookACall.heading || FAQ_FALLBACK_CONTENT.bookACall.heading,
      description:
        bookACall.description || FAQ_FALLBACK_CONTENT.bookACall.description,
      img: bookACall.img,
    },
  };
};

const fetchFaqContentFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getFaqApiBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${FAQ_CONTENT_ENDPOINT}`
    : FAQ_CONTENT_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["faq"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQ content: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeFaqContent(getFaqContentFromPayload(payload));
};

export default async function fetchFaqContent(fetchImpl = fetch) {
  try {
    return await fetchFaqContentFromApi(fetchImpl);
  } catch (error) {
    console.error("Failed to fetch FAQ content:", error);
    return {
      hero: { ...FAQ_FALLBACK_CONTENT.hero },
      generalQuiz: [...FAQ_FALLBACK_CONTENT.generalQuiz],
      bookACall: { ...FAQ_FALLBACK_CONTENT.bookACall },
    };
  }
}
