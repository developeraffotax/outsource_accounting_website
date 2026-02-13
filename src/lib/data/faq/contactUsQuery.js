import fetchData from "../mainEndPoint";

export default async function contactUsQuery() {
  return fetchData(
    "faq",
    {
      populate: {
        bookACall: {
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
