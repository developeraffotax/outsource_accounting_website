import CardContact from "./Card/CardContact.jsx";
import Container from "../wraper/Container.jsx";
import Formy from "./form/Form.jsx";
import heroQuery from "@/lib/data/contactUs/heroQuery.js";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const ContactUsHero = async () => {
  const res = await heroQuery();
  const content = res.data.hero;

  return (
    <Container withYPadding={false}>
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src={getImageUrl(content.img.url)}
          alt="heroLineIcon"
          className="my-4 md:my-6 max-w-full h-auto"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light m-3">
          {content.heading}
        </h1>
        <p className="font-semibold my-4 md:my-6 max-w-3xl">
          {content.description}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 lg:gap-10 my-8">
        <div className="w-full lg:w-1/2">
          <CardContact />
        </div>
        <div className="w-full lg:w-1/2">
          <Formy />
        </div>
      </div>
    </Container>
  );
};
export default ContactUsHero;
