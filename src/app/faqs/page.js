import { apiCall } from "@/components/faqs/BookACall/apiCall";
import GeneralQuiz from "@/components/faqs/GeneralQuiz/GeneralQuiz";
import Hero from "@/components/faqs/Hero/Faqs";

export default async function faqs() {
  const bookACallSection = await apiCall();

  return (
    <>
      <Hero />
      <GeneralQuiz />
      {bookACallSection}
    </>
  );
}
