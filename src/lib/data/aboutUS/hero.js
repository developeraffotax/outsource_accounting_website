import fetchData from "../mainEndPoint";

export default async function heroQuery() {
  return fetchData(
    "about-us",
    {
      populate: {
        aboutUs: {
          populate: { ImgHero: true },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
