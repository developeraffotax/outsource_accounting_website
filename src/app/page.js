import heroApiCall from "@/components/home/Hero/apiCall.jsx";
import whyOutsourceApiCall from "@/components/home/WhyOutsource/apiCall.jsx";
import servicesApiCall from "@/components/home/Services/apiCall.jsx";
import howWeWorkApiCall from "@/components/home/HowWeWork/apiCall.jsx";
import joinUsApiCall from "@/components/home/JoinUs/apiCall.jsx";
import clientsTestimonialsApiCall from "@/components/home/ClientsTestimonials/apiCall.jsx";

export default async function Home() {
  const Hero = await heroApiCall();
  const WhyOutsource = await whyOutsourceApiCall();
  const Services = await servicesApiCall();
  const HowWeWork = await howWeWorkApiCall();
  const JoinUs = await joinUsApiCall();
  const ClientsTestimonials = await clientsTestimonialsApiCall();

  return (
    <div className="">
      {Hero}
      {WhyOutsource}
      {Services}
      {HowWeWork}
      {JoinUs}
      {ClientsTestimonials}
    </div>
  );
}
