import contactUsQuery from "@/lib/data/faq/contactUsQuery";
import BookACall from "./BookACall";

export const apiCall = async () => {
  const res = await contactUsQuery();
  const content = res?.data?.bookACall;

  if (!content) {
    return null;
  }

  const imageSource =
    content?.img || "/images/serivePgsImg/BookACall/BookACall.png";

  return (
    <BookACall
      heading={content.heading}
      description={content.description}
      img={imageSource}
    />
  );
};
