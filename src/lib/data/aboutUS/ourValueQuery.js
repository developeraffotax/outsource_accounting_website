import fetchData from "../mainEndPoint";

export default async function ourValueQuery() {
  return fetchData(
    "about-us",
    {
      populate: {
        ourValue: {
          populate: { imgValue: true },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
