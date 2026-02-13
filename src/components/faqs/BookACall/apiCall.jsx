import contactUsQuery from "@/lib/data/faq/contactUsQuery";
import BookACall from "./BookACall";
import getImageUrl from "@/lib/utils/getImageUrl";

export const apiCall = async () => {
  const res = await contactUsQuery();
  const content = res.data.bookACall;
  if (!content) return console.log(res);

  return (
    <BookACall
      heading={content.heading}
      description={content.description}
      img={getImageUrl(content.img.url)}
    />
  );
};
