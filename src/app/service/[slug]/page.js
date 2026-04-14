import { notFound } from "next/navigation";
import Hero from "@/components/services/HeroComponent/Hero";
import Get from "@/components/services/WhatYouGet/Get";
import Outsource from "@/components/services/WhyChooseUs/Outsource";
import FASolutions from "@/components/services/BookACall/FASolutions.jsx";
import Services from "../../../components/services/Services/Services";
import AnnualAccounts from "@/components/services/AnnualAcounts/AnnualAcounts";
import Pricing from "@/components/services/Pricing/Pricing";
import What from "@/components/services/what/what";
import GetStarted from "@/components/services/GetStarted/GetStarted";
import Statistics from "@/components/services/Statistics/Statistics";
import {
  getServiceBySlug,
  getAllServices,
} from "@/lib/data/services/serviceQuery";

const resolveServiceDescription = (service, title) => {
  const descriptionValue = Array.isArray(service?.description)
    ? service.description.filter(Boolean).join(" ")
    : service?.description;

  return (
    descriptionValue ||
    service?.shortDescription ||
    `Professional ${title} services for UK businesses from Outsource Accounting.`
  );
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await getServiceBySlug(slug);
  const service = response.data[0];

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = service.name || service.title || slug.replace(/-/g, " ");
  const description = resolveServiceDescription(service, title);

  return {
    title,
    description,
    alternates: {
      canonical: `/service/${slug}`,
    },
    openGraph: {
      title: `${title} | Outsource Accounting`,
      description,
      url: `/service/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await getAllServices();
    return response.data.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Failed to generate service slugs at build time:", error);
    return [];
  }
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const response = await getServiceBySlug(slug);
  const service = response.data[0];

  if (!service) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://outsourceaccountings.co.uk";
  const title = service.name || service.title || slug.replace(/-/g, " ");
  const description = resolveServiceDescription(service, title);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: title,
        description,
        url: `${siteUrl}/service/${slug}`,
        provider: {
          "@type": "AccountingService",
          name: "Outsource Accounting",
          url: siteUrl,
        },
        areaServed: "GB",
        serviceType: title,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `${siteUrl}/service/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero data={service} />
      <Pricing data={service.Pricing} />
      <Services data={service.ServiceProcess} />
      <What data={service.WhatData} />
      <AnnualAccounts data={service.WhoData} />

      <Get data={service.WhatYouGet} />
      <Outsource data={service.WhyChooseUs} />
      <Statistics data={service.statics} />
      <FASolutions />
      <GetStarted data={service.GetStarted} />
    </>
  );
}
