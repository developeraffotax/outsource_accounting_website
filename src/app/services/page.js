export const metadata = {
  title: "Our Accounting Services",
  description:
    "Explore our full range of professional accounting services — Annual Accounts, Self Assessment, Bookkeeping, Payroll, VAT, Corporation Tax, and Company Formation for UK businesses.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Accounting Services | Outsource Accounting",
    description:
      "Explore our full range of professional accounting services — Annual Accounts, Self Assessment, Bookkeeping, Payroll, VAT, Corporation Tax, and Company Formation for UK businesses.",
    url: "/services",
  },
};

import servicesApiCall from "@/components/home/Services/apiCall.jsx";
import joinUsApiCall from "@/components/home/JoinUs/apiCall.jsx";

export default async function services() {
  const Services = await servicesApiCall();
  const JoinUs = await joinUsApiCall();

  return (
    <>
      {Services}
      {JoinUs}
    </>
  );
}
