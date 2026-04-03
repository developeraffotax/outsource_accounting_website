import fetchContactUsContent from "./contactContent";

export default async function gitQuery() {
  const content = await fetchContactUsContent();

  return {
    data: {
      getInTouch: content.getInTouch.map((item) => ({
        ...item,
        img: {
          url: item.img,
        },
      })),
    },
  };
}
