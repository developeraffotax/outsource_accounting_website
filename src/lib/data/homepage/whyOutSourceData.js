import fetchData from "../mainEndPoint";
export default async function whyOutSourceData() {
  return fetchData(
    "home-page",
    {
      populate: {
        WhyOutsoutcing: {
          populate: {
            imgWhyOutsoutcing: true,
            imgtwoWhyOutsoutcing: true,
            pointerWhyOutsoutcing: {
              populate: {
                imgPoinerWhyOutsoutcing: true,
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
