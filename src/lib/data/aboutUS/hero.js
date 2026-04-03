import fetchAboutUsContent from "./aboutContent";

export default async function heroQuery() {
  const content = await fetchAboutUsContent();

  return {
    data: {
      aboutUs: {
        heading: content.heading,
        subHeading: content.subHeading,
        ImgHero: {
          url: content.img,
        },
      },
    },
  };
}
