import CardsContact from "./CardsContact";
import gitQuery from "@/lib/data/contactUs/gitQuery";
import getImageUrl from "@/lib/utils/getImageUrl";

const CardContact = async () => {
  const res = await gitQuery();
  const content = res.data.getInTouch;
  return (
    <div className="mx-3 md:mx-8 lg:mx-0 flex flex-col  items-center md:items-start mb-4">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-blue-800 text-center">
        Get In Touch
      </h1>
      <p className="text-center mb-2 ">Fill out the form and a member of our team will be in touch soon.</p>
      {content.map((card, index) => {
        return (
          <div key={card.id || index} className="w-3/4 min-w-auto md:min-w-120">
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
