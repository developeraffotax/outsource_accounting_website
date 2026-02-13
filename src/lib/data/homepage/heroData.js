import fetchData from "../mainEndPoint";

export default async function heroData() {
  return fetchData(
    "home-page",
    {
      populate: {
        heroSection: {
          populate: {
            bgImage: true,
            ukFlage: true,
            freeConsultationImg: true,
            Card: {
              populate: {
                imgComponent: true,
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
