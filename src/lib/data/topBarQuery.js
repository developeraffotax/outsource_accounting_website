import fetchData from "./mainEndPoint";

export default function topBarQuery() {
  return fetchData(
    "home-page",
    {
      populate: {
        topBar: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
