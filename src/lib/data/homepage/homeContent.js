export const HOME_CONTENT_ENDPOINT = "/api/content/home";

const HOME_FALLBACK_CONTENT = Object.freeze({
  bgImage: "",
  ukFlag: "",
  title: "",
  headingTextFirst: "",
  headingTextMiddle: "",
  headingTextEnd: "",
  description: "",
  description2: "",
  freeConsultation: "",
  freeConsultationImg: "",
  cardSelector: "",
  heroCards: [],
  whyOutsoutcing: "",
  headingWhyOutsoutcing: "",
  descriptionWhyOutsoutcing: "",
  imgWhyOutsoutcing: "",
  imgtwoWhyOutsoutcing: "",
  whyOutSourceAccounting: "",
  whyOutsoutcingCards: [],
  headingServiceSection: "",
  descriptionServiceSection: "",
  serviceCards: [],
  headingHowWeWork: "",
  howWeWorkSteps: [],
  lineOne: "",
  lineTwo: "",
  headingClientsTestimonial: "",
  testimonialsCard: [],
  email: "",
  number: "",
  eNumber: "",
  joinUsHeading: "",
  joinUsBgImage: "",
});

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getHomeApiBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.HOME_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.BUY_SERVICE_API_BASE_URL ||
    process.env.FAQ_API_BASE_URL ||
    process.env.CONTACT_US_API_BASE_URL ||
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
  const baseUrl = getHomeApiBaseUrl();

  return baseUrl ? `${baseUrl}${path}` : path;
};

const getHomeContentFromPayload = (payload) => {
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

const normalizeHeroCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.heroCardImg?.url ||
        entry?.heroCardImg?.path ||
        entry?.heroCardImg?.src ||
        entry?.heroCardImg?.data?.attributes?.url ||
        entry?.heroCardImg ||
        entry?.imgComponent?.url ||
        entry?.imgComponent ||
        "";

      const heroCardTitle = normalizeText(entry?.heroCardTitle || entry?.title);
      const heroCardContent = normalizeText(
        entry?.heroCardContent || entry?.content,
      );

      if (!rawImg && !heroCardTitle && !heroCardContent) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        heroCardImg:
          typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        heroCardTitle,
        heroCardContent,
      };
    })
    .filter(Boolean);
};

const normalizeWhyCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.whyCardImage?.url ||
        entry?.whyCardImage?.path ||
        entry?.whyCardImage?.src ||
        entry?.whyCardImage?.data?.attributes?.url ||
        entry?.whyCardImage ||
        entry?.imgPoinerWhyOutsoutcing?.url ||
        entry?.imgPoinerWhyOutsoutcing ||
        "";

      const whyCardPointerText = normalizeText(
        entry?.whyCardPointerText || entry?.pointerTextWhyOutsoutcing,
      );

      if (!rawImg && !whyCardPointerText) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        whyCardImage:
          typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        whyCardPointerText,
      };
    })
    .filter(Boolean);
};

const normalizeServiceCards = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.imgServiceCard?.url ||
        entry?.imgServiceCard?.path ||
        entry?.imgServiceCard?.src ||
        entry?.imgServiceCard?.data?.attributes?.url ||
        entry?.imgServiceCard ||
        "";

      const titleServiceCard = normalizeText(entry?.titleServiceCard);
      const descriptionServiceCard = normalizeText(
        entry?.descriptionServiceCard,
      );
      const buttontxtServiceCard = normalizeText(entry?.buttontxtServiceCard);
      const pglink = normalizeText(entry?.pglink);

      if (
        !rawImg &&
        !titleServiceCard &&
        !descriptionServiceCard &&
        !buttontxtServiceCard &&
        !pglink
      ) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        imgServiceCard:
          typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        titleServiceCard,
        descriptionServiceCard,
        buttontxtServiceCard,
        pglink,
      };
    })
    .filter(Boolean);
};

const normalizeHowWeWorkSteps = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawImg =
        entry?.howWeWorkIcon?.url ||
        entry?.howWeWorkIcon?.path ||
        entry?.howWeWorkIcon?.src ||
        entry?.howWeWorkIcon?.data?.attributes?.url ||
        entry?.howWeWorkIcon ||
        entry?.oneIcon?.url ||
        entry?.twoIcon?.url ||
        entry?.threeIcon?.url ||
        "";

      const stepNumber = normalizeText(entry?.stepNumber);
      const stepTitle = normalizeText(entry?.stepTitle);
      const stepDescription = normalizeText(entry?.stepDescription);

      if (!rawImg && !stepNumber && !stepTitle && !stepDescription) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        stepNumber,
        howWeWorkIcon:
          typeof rawImg === "string" ? toAbsoluteImageUrl(rawImg) : "",
        stepTitle,
        stepDescription,
      };
    })
    .filter(Boolean);
};

const normalizeTestimonials = (value) => {
  const source = Array.isArray(value) ? value : [];

  return source
    .map((entry, index) => {
      const rawBgImg =
        entry?.testimonialBgImg?.url ||
        entry?.testimonialBgImg?.path ||
        entry?.testimonialBgImg?.src ||
        entry?.testimonialBgImg?.data?.attributes?.url ||
        entry?.testimonialBgImg ||
        "";

      const rawPersonImg =
        entry?.testimonialPersonImg?.url ||
        entry?.testimonialPersonImg?.path ||
        entry?.testimonialPersonImg?.src ||
        entry?.testimonialPersonImg?.data?.attributes?.url ||
        entry?.testimonialPersonImg ||
        "";

      const testimonialTitle = normalizeText(entry?.testimonialTitle);
      const testimonialDescription = normalizeText(
        entry?.testimonialDescription,
      );
      const testimonialPersonName = normalizeText(entry?.testimonialPersonName);

      if (
        !rawBgImg &&
        !rawPersonImg &&
        !testimonialTitle &&
        !testimonialDescription &&
        !testimonialPersonName
      ) {
        return null;
      }

      return {
        id: entry?.id || index + 1,
        testimonialBgImg:
          typeof rawBgImg === "string" ? toAbsoluteImageUrl(rawBgImg) : "",
        testimonialPersonImg:
          typeof rawPersonImg === "string"
            ? toAbsoluteImageUrl(rawPersonImg)
            : "",
        testimonialTitle,
        testimonialDescription,
        testimonialPersonName,
      };
    })
    .filter(Boolean);
};

const normalizeHomeContent = (content) => {
  const rawBgImage =
    content?.bgImage?.url ||
    content?.bgImage?.path ||
    content?.bgImage?.src ||
    content?.bgImage?.data?.attributes?.url ||
    content?.bgImage ||
    "";

  const rawUkFlag =
    content?.ukFlag?.url ||
    content?.ukFlag?.path ||
    content?.ukFlag?.src ||
    content?.ukFlag?.data?.attributes?.url ||
    content?.ukFlag ||
    content?.ukFlage?.url ||
    content?.ukFlage ||
    "";

  const rawFreeConsultationImg =
    content?.freeConsultationImg?.url ||
    content?.freeConsultationImg?.path ||
    content?.freeConsultationImg?.src ||
    content?.freeConsultationImg?.data?.attributes?.url ||
    content?.freeConsultationImg ||
    "";

  const rawImgWhyOutsoutcing =
    content?.imgWhyOutsoutcing?.url ||
    content?.imgWhyOutsoutcing?.path ||
    content?.imgWhyOutsoutcing?.src ||
    content?.imgWhyOutsoutcing?.data?.attributes?.url ||
    content?.imgWhyOutsoutcing ||
    "";

  const rawImgtwoWhyOutsoutcing =
    content?.imgtwoWhyOutsoutcing?.url ||
    content?.imgtwoWhyOutsoutcing?.path ||
    content?.imgtwoWhyOutsoutcing?.src ||
    content?.imgtwoWhyOutsoutcing?.data?.attributes?.url ||
    content?.imgtwoWhyOutsoutcing ||
    "";

  const rawLineOne =
    content?.lineOne?.url ||
    content?.lineOne?.path ||
    content?.lineOne?.src ||
    content?.lineOne?.data?.attributes?.url ||
    content?.lineOne ||
    "";

  const rawLineTwo =
    content?.lineTwo?.url ||
    content?.lineTwo?.path ||
    content?.lineTwo?.src ||
    content?.lineTwo?.data?.attributes?.url ||
    content?.lineTwo ||
    "";

  const rawJoinUsBgImage =
    content?.joinUsBgImage?.url ||
    content?.joinUsBgImage?.path ||
    content?.joinUsBgImage?.src ||
    content?.joinUsBgImage?.data?.attributes?.url ||
    content?.joinUsBgImage ||
    content?.joinUs?.bgImg?.url ||
    content?.joinUs?.bgImg ||
    "";

  return {
    bgImage:
      typeof rawBgImage === "string"
        ? toAbsoluteImageUrl(rawBgImage)
        : HOME_FALLBACK_CONTENT.bgImage,
    ukFlag:
      typeof rawUkFlag === "string"
        ? toAbsoluteImageUrl(rawUkFlag)
        : HOME_FALLBACK_CONTENT.ukFlag,
    title: normalizeText(content?.title),
    headingTextFirst: normalizeText(content?.headingTextFirst),
    headingTextMiddle: normalizeText(content?.headingTextMiddle),
    headingTextEnd: normalizeText(content?.headingTextEnd),
    description: normalizeText(content?.description),
    description2: normalizeText(content?.description2),
    freeConsultation: normalizeText(content?.freeConsultation),
    freeConsultationImg:
      typeof rawFreeConsultationImg === "string"
        ? toAbsoluteImageUrl(rawFreeConsultationImg)
        : HOME_FALLBACK_CONTENT.freeConsultationImg,
    cardSelector: normalizeText(content?.cardSelector),
    heroCards: normalizeHeroCards(
      content?.heroCards || content?.heroSection?.Card,
    ),
    whyOutsoutcing: normalizeText(content?.whyOutsoutcing),
    headingWhyOutsoutcing: normalizeText(content?.headingWhyOutsoutcing),
    descriptionWhyOutsoutcing: normalizeText(
      content?.descriptionWhyOutsoutcing,
    ),
    imgWhyOutsoutcing:
      typeof rawImgWhyOutsoutcing === "string"
        ? toAbsoluteImageUrl(rawImgWhyOutsoutcing)
        : HOME_FALLBACK_CONTENT.imgWhyOutsoutcing,
    imgtwoWhyOutsoutcing:
      typeof rawImgtwoWhyOutsoutcing === "string"
        ? toAbsoluteImageUrl(rawImgtwoWhyOutsoutcing)
        : HOME_FALLBACK_CONTENT.imgtwoWhyOutsoutcing,
    whyOutSourceAccounting: normalizeText(content?.whyOutSourceAccounting),
    whyOutsoutcingCards: normalizeWhyCards(
      content?.whyOutsoutcingCards ||
        content?.WhyOutsoutcing?.pointerWhyOutsoutcing,
    ),
    headingServiceSection: normalizeText(content?.headingServiceSection),
    descriptionServiceSection: normalizeText(
      content?.descriptionServiceSection,
    ),
    serviceCards: normalizeServiceCards(
      content?.serviceCards || content?.service?.serviceCard,
    ),
    headingHowWeWork: normalizeText(content?.headingHowWeWork),
    howWeWorkSteps: normalizeHowWeWorkSteps(
      content?.howWeWorkSteps || content?.howWeWork?.steps,
    ),
    lineOne:
      typeof rawLineOne === "string"
        ? toAbsoluteImageUrl(rawLineOne)
        : HOME_FALLBACK_CONTENT.lineOne,
    lineTwo:
      typeof rawLineTwo === "string"
        ? toAbsoluteImageUrl(rawLineTwo)
        : HOME_FALLBACK_CONTENT.lineTwo,
    headingClientsTestimonial: normalizeText(
      content?.headingClientsTestimonial,
    ),
    testimonialsCard: normalizeTestimonials(
      content?.testimonialsCard || content?.clientsTestimonial?.testimonialCard,
    ),
    email: normalizeText(content?.email),
    number: normalizeText(content?.number),
    eNumber: normalizeText(content?.eNumber || content?.euNumber),
    joinUsHeading: normalizeText(content?.joinUsHeading),
    joinUsBgImage:
      typeof rawJoinUsBgImage === "string"
        ? toAbsoluteImageUrl(rawJoinUsBgImage)
        : HOME_FALLBACK_CONTENT.joinUsBgImage,
  };
};

const fetchHomeContentFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getHomeApiBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${HOME_CONTENT_ENDPOINT}`
    : HOME_CONTENT_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["home-page"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch home content: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeHomeContent(getHomeContentFromPayload(payload));
};

export default async function fetchHomeContent(fetchImpl = fetch) {
  try {
    return await fetchHomeContentFromApi(fetchImpl);
  } catch (error) {
    console.error("Failed to fetch home content:", error);
    return {
      ...HOME_FALLBACK_CONTENT,
      heroCards: [...HOME_FALLBACK_CONTENT.heroCards],
      whyOutsoutcingCards: [...HOME_FALLBACK_CONTENT.whyOutsoutcingCards],
      serviceCards: [...HOME_FALLBACK_CONTENT.serviceCards],
      howWeWorkSteps: [...HOME_FALLBACK_CONTENT.howWeWorkSteps],
      testimonialsCard: [...HOME_FALLBACK_CONTENT.testimonialsCard],
    };
  }
}
