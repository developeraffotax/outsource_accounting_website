import { getAllServices } from "@/lib/data/services/serviceQuery";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://outsourceaccountings.co.uk";

export default async function sitemap() {
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${siteUrl}/aboutus`,  
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "daily",
    },
    {
      url: `${siteUrl}/contactUs`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${siteUrl}/faqs`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
    },
  ];

  let servicePages = [];
  try {
    const response = await getAllServices();
    servicePages = response.data.map((service) => ({
      url: `${siteUrl}/service/${service.slug}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    }));
  } catch {
    // If services can't be fetched at build time, return static pages only
  }

  return [...staticPages, ...servicePages];
}
