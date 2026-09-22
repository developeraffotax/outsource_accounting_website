import CardContact from "./Card/CardContact.jsx";
import Container from "../wraper/Container.jsx";
import Formy from "./form/Form.jsx";
import heroQuery from "@/lib/data/contactUs/heroQuery.js";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const ContactUsHero = async () => {
  const res = await heroQuery();
  const content = res.data.hero;

  return (
    <Container withYPadding={false} className="px-0">
      <div className="  flex-col items-center justify-center text-center hidden lg:flex">
        {/* <img
          src={getImageUrl(content.img.url)}
          alt="heroLineIcon"
          className="my-4 md:my-6 w-20 h-20 md:w-24 md:h-24 object-cover border border-transparent rounded"
        /> */}
        {/* <h1 className="text-2xl md:text-3xl lg:text-4xl font-light m-3">
          {content.heading}
        </h1> */}
        <p className="font-semibold my-4 md:my-4 max-w-3xl">
          {content.description}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-2  lg:gap-12 my-3 lg:my-6 ">
        <div className="w-full lg:w-[45%]">
          <CardContact />
        </div>
        <div className="w-full lg:w-[55%]">
          <Formy />
        </div>
      </div>
    </Container>
  );
};
export default ContactUsHero;
