import fetchData from "../mainEndPoint";
export default async function serviceData() {
  return fetchData(
    "home-page",
    {
      populate: {
        service: {
          populate: {
            serviceCard: {
              populate: {
                imgServiceCard: true,
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
