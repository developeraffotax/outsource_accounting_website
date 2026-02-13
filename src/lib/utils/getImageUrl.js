const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Get the correct image URL for both local and cloud Strapi
 * - Cloud Strapi returns full URLs (https://...)
 * - Local Strapi returns relative paths (/uploads/...)
 */
export default function getImageUrl(url) {
  if (!url) return "";
  // If URL is already absolute (from Strapi Cloud CDN), use it directly
  if (url.startsWith("http")) return url;
  // Otherwise, prepend Strapi URL (for local development)
  return `${STRAPI_URL}${url}`;
}
