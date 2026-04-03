import fetchFaqContent from "./faqContent";

export default async function generalQuizQuery() {
  const content = await fetchFaqContent();
  return {
    data: {
      generalQuiz: content.generalQuiz,
    },
  };
}
