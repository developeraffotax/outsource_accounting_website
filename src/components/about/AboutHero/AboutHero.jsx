import heroQuery from "@/lib/data/aboutUS/hero";
import getImageUrl from "@/lib/utils/getImageUrl";

const AboutHero = async () => {
  const res = await heroQuery();
  const content = res.data?.aboutUs;

  if (!content) return null;

  return (
    <div className="flex flex-col justify-center items-center my-6 lg:my-12 mx-3 md:mx-8 lg:mx-44 2xl:mx-80">
      <div className="flex flex-col justify-center items-center mb-7 md:mb-14 mx-4 content-center ">
        <h1 className="font-semibold text-3xl md:text-4xl">
          {content.heading}
        </h1>
        <h2 className="my-3 md:my-6 font-serif text-2xl lg:text-3xl">
          {content.subHeading}
        </h2>
      </div>
      <img src={getImageUrl(content.ImgHero?.url)} alt="AboutUsImg" />
    </div>
  );
};

export default AboutHero;
