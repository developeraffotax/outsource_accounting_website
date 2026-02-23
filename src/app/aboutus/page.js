export const metadata = {
  title: "About Us",
  description:
    "Learn about Outsource Accounting — our story, mission, values, and the expert team dedicated to delivering professional accounting services across the UK.",
  alternates: {
    canonical: "/aboutus",
  },
  openGraph: {
    title: "About Us | Outsource Accounting",
    description:
      "Learn about Outsource Accounting — our story, mission, values, and the expert team dedicated to delivering professional accounting services across the UK.",
    url: "/aboutus",
  },
};

import AboutHero from "@/components/about/AboutHero/AboutHero.jsx";
import MissionStatement from "@/components/about/MissionStatement/MissionStatement";
import OurStoryPg from "@/components/about/OurStory/OurStory";
import OurValues from "@/components/about/OurValues/OurValues";
import joinUsApiCall from "@/components/home/JoinUs/apiCall.jsx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://outsourceaccountings.co.uk";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteUrl}/aboutus`,
  url: `${siteUrl}/aboutus`,
  name: "About Us | Outsource Accounting",
  description:
    "Learn about Outsource Accounting — our story, mission, values, and the expert team dedicated to delivering professional accounting services across the UK.",
  publisher: {
    "@type": "AccountingService",
    "@id": `${siteUrl}/#organization`,
    name: "Outsource Accounting",
    url: siteUrl,
  },
};

export default async function aboutus() {
  const JoinUs = await joinUsApiCall();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutHero />
      <OurStoryPg />
      <MissionStatement />
      <OurValues />
      {JoinUs}
    </>
  );
}
