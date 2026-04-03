import fetchFaqContent from "./faqContent";

export default async function contactUsQuery() {
  const content = await fetchFaqContent();
  return {
    data: {
      bookACall: content.bookACall,
    },
  };
}
