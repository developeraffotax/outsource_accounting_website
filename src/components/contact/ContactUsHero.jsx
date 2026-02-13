import CardContact from "./Card/CardContact.jsx";
import heroLineIcon from "../../assets/images/ContactUS/ContactUsHero/heroLineImg.png";
import Formy from "./form/Form.jsx";
import heroQuery from "@/lib/data/contactUs/heroQuery.js";
import getImageUrl from "@/lib/utils/getImageUrl.js";

const ContactUsHero = async () => {
  const res = await heroQuery();
  const content = res.data.hero;

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center my-3 md:my-6 lg:my-12 mx-3 md:mx-8 lg:mx-44 2xl:mx-60">
        <img
          src={getImageUrl(content.img.url)}
          alt="heroLineIcon"
          className="m-6"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light m-3">
          {content.heading}
        </h1>
        <p className="font-semibold m-6">{content.description}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly items-center">
        <div>
          <CardContact />
        </div>
        <Formy />
      </div>
    </div>
  );
};
export default ContactUsHero;
