import fetchFaqContent from "./faqContent";

export default async function faqHeroQuery() {
  const content = await fetchFaqContent();
  return {
    data: {
      hero: content.hero,
    },
  };
}
