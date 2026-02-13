import fetchData from "../mainEndPoint";

export default async function howWeWorkAround() {
  return fetchData(
    "home-page",
    {
      populate: {
        howWeWork: {
          populate: {
            oneIcon: true,
            twoIcon: true,
            threeIcon: true,
            lineOne: true,
            lineTwo: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
