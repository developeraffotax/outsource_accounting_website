import fetchData from "../mainEndPoint";

export default async function generalQuizQuery() {
  return fetchData(
    "faq",
    {
      populate: {
        generalQuiz: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
