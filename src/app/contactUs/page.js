export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our accounting experts today. We're here to help with all your accounting, tax, and financial needs. Book a free consultation.",
  alternates: {
    canonical: "/contactUs",
  },
  openGraph: {
    title: "Contact Us | Outsource Accounting",
    description:
      "Get in touch with our accounting experts today. We're here to help with all your accounting, tax, and financial needs. Book a free consultation.",
    url: "/contactUs",
  },
};

import ContactUsHero from "@/components/contact/ContactUsHero";
import { apiCall } from "@/components/faqs/BookACall/apiCall";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://outsourceaccountings.co.uk";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${siteUrl}/#organization`,
  name: "Outsource Accounting",
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
  description:
    "Expert outsourced accounting services for UK businesses — Annual Accounts, Self Assessment, Payroll, VAT, Bookkeeping, Corporation Tax & Company Formation.",
  areaServed: "GB",
  serviceType: [
    "Annual Accounts",
    "Self Assessment",
    "Bookkeeping",
    "Payroll",
    "VAT Returns",
    "Company Formation",
    "Corporation Tax",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
  ],
  sameAs: [],
};

export default async function contactus() {
  const bookACallSection = await apiCall();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactUsHero />
      {bookACallSection}
    </>
  );
}
