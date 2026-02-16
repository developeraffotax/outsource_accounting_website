import outStoryQuesry from "@/lib/data/aboutUS/ourStory.js";
import getImageUrl from "@/lib/utils/getImageUrl";

const OurStoryPg = async () => {
  const res = await outStoryQuesry();
  const content = res.data.ourstory;

  return (
    <div>
      <div className=" flex flex-col lg:flex-row justify-center items-center lg:justify-between mx-3 md:mx-8 lg:mx-44 2xl:mx-80 my-6 md:my-16 lg:my-24">
        <img
          src={getImageUrl(content.imgOurStory?.url)}
          alt="Our Story"
          className="hidden lg:block lg:w-auto lg:h-auto "
        />
        <div className="flex flex-col gap-3 lg:gap-6 lg:ml-12">
          <h1 className="text-center lg:text-start font-semibold lg:text-4xl md:text-3xl text-2xl my-3 md:my-0">
            {content.headingOurStory}
          </h1>
          <p className="font-light text-center md:text-start">
            {content.descriptionOurStory}
          </p>
          <p className="font-light mb-3 text-center md:text-start">
            {content.descriptiontwoOurStory}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OurStoryPg;
