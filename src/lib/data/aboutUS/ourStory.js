import fetchData from "../mainEndPoint";
export default async function outStoryQuesry() {
  return fetchData(
    "about-us",
    {
      populate: {
        ourstory: {
          populate: { imgOurStory: true },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
}
