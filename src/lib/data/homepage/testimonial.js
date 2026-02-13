import fetchData from "../mainEndPoint";
export default async function testimonialData() {
  return fetchData(
    "home-page",
    {
      populate: {
        clientsTestimonial: {
          populate: {
            testimonialCard: {
              populate: {
                testimonialBgImg: true,
                testimonialPersonImg: true,
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
