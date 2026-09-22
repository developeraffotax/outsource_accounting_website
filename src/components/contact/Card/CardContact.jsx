import CardsContact from "./CardsContact";
import gitQuery from "@/lib/data/contactUs/gitQuery";
import getImageUrl from "@/lib/utils/getImageUrl";

const CardContact = async () => {
  const res = await gitQuery();
  const content = res.data.getInTouch;
  return (
    <div className="flex flex-col items-center lg:items-start  w-full">
      <div className="w-full flex flex-col items-start gap-0 px-6 lg:px-0">

        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-blue-800 ">
        Get In Touch
      </h1>
      <p className="  text-xs lg:text-sm">
        Fill out the form and a member of our team will be in touch soon.
      </p>

      
      </div>
      {content.map((card, index) => {
        return (
          
            <CardsContact
              img={getImageUrl(card.img.url)}
              title={card.title}
              description={card.description}
              details={card.detail}
              href={card.href}
               key={card.id || index} 
            />
           
        );
      })}
    </div>
  );
};

export default CardContact;
