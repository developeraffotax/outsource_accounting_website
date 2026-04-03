import fetchContactUsContent from "./contactContent";

export default async function heroQuery() {
  const content = await fetchContactUsContent();

  return {
    data: {
      hero: {
        heading: content.heading,
        description: content.description,
        img: {
          url: content.img,
        },
      },
    },
  };
}
