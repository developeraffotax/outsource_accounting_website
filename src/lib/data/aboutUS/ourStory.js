import fetchAboutUsContent from "./aboutContent";

export default async function outStoryQuesry() {
  const content = await fetchAboutUsContent();

  return {
    data: {
      ourstory: {
        imgOurStory: {
          url: content.OurStory.imgOurStory,
        },
        headingOurStory: content.OurStory.headingOurStory,
        descriptionOurStory: content.OurStory.descriptionOurStory,
        descriptiontwoOurStory: content.OurStory.descriptiontwoOurStory,
      },
    },
  };
}
