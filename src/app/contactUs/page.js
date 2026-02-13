import ContactUsHero from "@/components/contact/ContactUsHero";
import { apiCall } from "@/components/faqs/BookACall/apiCall";

export default async function contactus() {
  const bookACallSection = await apiCall();
  return (
    <>
      <ContactUsHero />
      {bookACallSection}
    </>
  );
}
