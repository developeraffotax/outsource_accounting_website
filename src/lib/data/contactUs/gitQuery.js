import fetchData from "../mainEndPoint";

export default function gitQuery() {
  return fetchData(
    "contact-us",
    {
      populate: {
        getInTouch: {
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
