import fetchData from "../mainEndPoint";
export default async function missionStatementQuery() {
  return fetchData(
    "about-us",
    {
      populate: {
        missionStatment: {
          populate: { imgStatment: true },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
