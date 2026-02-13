import fetchData from "../mainEndPoint";

export default function heroQuery() {
  return fetchData(
    "contact-us",
    {
      populate: {
        hero: {
          populate: {
            img: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
