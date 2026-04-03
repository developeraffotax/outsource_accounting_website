import fetchHomeContent from "./homeContent";

export default async function joinUsCat() {
  const content = await fetchHomeContent();

  return {
    data: {
      joinUs: {
        heading: content.joinUsHeading,
        bgImg: {
          url: content.joinUsBgImage,
        },
      },
    },
  };
}
