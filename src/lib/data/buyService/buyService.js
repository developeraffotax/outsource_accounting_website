/**
 * @typedef {Object} BuyServiceEntry
 * @property {number} id
 * @property {string} name
 * @property {string} price
 */

/**
 * @typedef {Object} BuyServiceApiResponse
 * @property {{ entries?: Array<{ name?: unknown, price?: unknown }> }} [content]
 * @property {Array<{ name?: unknown, price?: unknown }>} [entries]
 * @property {{ entries?: Array<{ name?: unknown, price?: unknown }>, content?: { entries?: Array<{ name?: unknown, price?: unknown }> } }} [data]
 */

export const BUY_SERVICE_ENDPOINT = "/api/content/buy-service";
// Backward-compatible export for any existing imports.
export const BUY_SERVICE_CMS_ENDPOINT = BUY_SERVICE_ENDPOINT;

// Existing in-use buy service fallback entry from current repository cache.
export const BUY_SERVICE_FALLBACK_ENTRIES = Object.freeze([
  { id: 1, name: "Company Accounts & Tax Return!", price: "299" },
]);

const normalizeBaseUrl = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";

const getBuyServiceBaseUrl = () => {
  const explicitApiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BUY_SERVICE_API_BASE_URL ||
    process.env.CONTENT_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BUY_SERVICE_API_BASE_URL ||
    process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL;

  if (explicitApiBaseUrl) {
    return normalizeBaseUrl(explicitApiBaseUrl);
  }

  const siteBaseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  return normalizeBaseUrl(siteBaseUrl);
};

const getEntriesFromPayload = (payload) => {
  if (Array.isArray(payload?.content?.entries)) {
    return payload.content.entries;
  }

  if (Array.isArray(payload?.entries)) {
    return payload.entries;
  }

  if (Array.isArray(payload?.data?.entries)) {
    return payload.data.entries;
  }

  if (Array.isArray(payload?.data?.content?.entries)) {
    return payload.data.content.entries;
  }

  if (Array.isArray(payload?.data)) {
    const entryContainer = payload.data.find((item) =>
      Array.isArray(item?.entries),
    );

    if (entryContainer) {
      return entryContainer.entries;
    }
  }

  if (Array.isArray(payload)) {
    const entryContainer = payload.find((item) => Array.isArray(item?.entries));

    if (entryContainer) {
      return entryContainer.entries;
    }
  }

  return [];
};

/**
 * @param {unknown} value
 * @returns {value is string}
 */
const isUsableString = (value) =>
  typeof value === "string" && value.trim().length > 0;

/**
 * @param {BuyServiceApiResponse | null | undefined} payload
 * @returns {BuyServiceEntry[]}
 */
export const normalizeBuyServiceEntries = (payload) => {
  const entries = getEntriesFromPayload(payload);

  return entries
    .map((entry, index) => {
      const name = isUsableString(entry?.name) ? entry.name.trim() : "";

      let price = "";
      if (isUsableString(entry?.price)) {
        price = entry.price.trim();
      } else if (
        typeof entry?.price === "number" &&
        Number.isFinite(entry.price)
      ) {
        price = String(entry.price);
      }

      if (!name || !price) {
        return null;
      }

      return {
        id: index + 1,
        name,
        price,
      };
    })
    .filter(Boolean);
};

const fetchBuyServiceFromApi = async (fetchImpl = fetch) => {
  const baseUrl = getBuyServiceBaseUrl();
  const targetUrl = baseUrl
    ? `${baseUrl}${BUY_SERVICE_ENDPOINT}`
    : BUY_SERVICE_ENDPOINT;

  const response = await fetchImpl(targetUrl, {
    next: { tags: ["buy-service"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch buy service data: ${response.status}`);
  }

  const json = await response.json();
  return normalizeBuyServiceEntries(json);
};

/**
 * @param {typeof fetch} [fetchImpl]
 * @returns {Promise<BuyServiceEntry[]>}
 */
export default async function buyService(fetchImpl = fetch) {
  try {
    const entries = await fetchBuyServiceFromApi(fetchImpl);
    if (entries.length > 0) {
      return entries;
    }
  } catch (error) {
    console.error("Failed to fetch buy service entries:", error);
  }

  return [...BUY_SERVICE_FALLBACK_ENTRIES];
}
