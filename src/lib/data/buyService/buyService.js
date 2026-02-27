import fetchData from "../mainEndPoint";

export default async function buyService() {
  return fetchData(
    "buy-service",
    {
      populate: {
        nameNprize: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
}
