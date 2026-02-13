import { notFound } from "next/navigation";
import Hero from "@/components/services/HeroComponent/Hero";
import Get from "@/components/services/WhatYouGet/Get";
import Outsource from "@/components/services/WhyChooseUs/Outsource";
import FASolutions from "@/components/services/BookACall/FASolutions.jsx";
import Services from "../../../components/services/Services/Services";
import AnnualAccounts from "@/components/services/AnnualAcounts/AnnualAcounts";
import What from "@/components/services/what/what";
import GetStarted from "@/components/services/GetStarted/GetStarted";
import Statistics from "@/components/services/Statistics/Statistics";
import {
  getServiceBySlug,
  getAllServices,
} from "@/lib/data/services/serviceQuery";

export async function generateStaticParams() {
  const response = await getAllServices();
  return response.data.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const response = await getServiceBySlug(slug);
  const service = response.data[0];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Hero data={service} />
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
