import CardsContact from "./CardsContact";
import gitQuery from "@/lib/data/contactUs/gitQuery";
import getImageUrl from "@/lib/utils/getImageUrl";

const CardContact = async () => {
  const res = await gitQuery();
  const content = res.data.getInTouch;
  return (
    <div className="flex flex-col items-center lg:items-start mb-4 w-full">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-blue-800 text-center lg:text-left">
        Get In Touch
      </h1>
      <p className="text-center lg:text-left mb-3 md:mb-4 max-w-xl">
        Fill out the form and a member of our team will be in touch soon.
      </p>
      {content.map((card, index) => {
        return (
          <div key={card.id || index} className="w-full">
            <CardsContact
              img={getImageUrl(card.img.url)}
              title={card.title}
              description={card.description}
              details={card.detail}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardContact;
