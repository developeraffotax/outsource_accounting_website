import fetchHomeContent from "./homepage/homeContent";

export default async function topBarQuery() {
  const content = await fetchHomeContent();

  return {
    data: {
      topBar: {
        email: content.email,
        number: content.number,
        euNumber: content.eNumber,
      },
    },
  };
}
