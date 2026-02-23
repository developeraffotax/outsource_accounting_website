export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to the most common questions about our accounting services, pricing, processes, and how we can support your UK business.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | Outsource Accounting",
    description:
      "Find answers to the most common questions about our accounting services, pricing, processes, and how we can support your UK business.",
    url: "/faqs",
  },
};

import { apiCall } from "@/components/faqs/BookACall/apiCall";
import GeneralQuiz from "@/components/faqs/GeneralQuiz/GeneralQuiz";
import Hero from "@/components/faqs/Hero/Faqs";
import generalQuizQuery from "@/lib/data/faq/generalQuizQuery.js";

export default async function faqs() {
  const [bookACallSection, faqData] = await Promise.all([
    apiCall(),
    generalQuizQuery(),
  ]);

  const faqs =
    faqData?.data?.generalQuiz ?? faqData?.data?.data?.generalQuiz ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.service,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.description,
      },
    })),
  };

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Hero />
      <GeneralQuiz />
      {bookACallSection}
    </>
  );
}
