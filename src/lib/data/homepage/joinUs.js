import fetchData from "../mainEndPoint";

export default async function joinUsCat() {
  return fetchData(
    "home-page",
    {
      populate: {
        joinUs: {
          populate: {
            bgImg: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
