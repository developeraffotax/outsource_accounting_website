import fetchData from "../mainEndPoint";

export default async function faqHeroQuery() {
  return fetchData(
    "faq",
    {
      populate: {
        hero: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
