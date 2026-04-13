import outStoryQuesry from "@/lib/data/aboutUS/ourStory.js";
import getImageUrl from "@/lib/utils/getImageUrl";
import Container from "@/components/wraper/Container";

const OurStoryPg = async () => {
  const res = await outStoryQuesry();
  const content = res.data.ourstory;

  return (
    <Container withYPadding={false} className="py-8 md:py-12">
      <section className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex justify-center lg:justify-start lg:w-1/2">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
            <img
              src={getImageUrl(content.imgOurStory?.url)}
              alt="Our Story"
              className="w-full h-auto aspect-video lg:aspect-4/3 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {content.headingOurStory}
          </h1>
          <p className="font-light text-gray-700">
            {content.descriptionOurStory}
          </p>
          <p className="font-light text-gray-700">
            {content.descriptiontwoOurStory}
          </p>
        </div>
      </section>
    </Container>
  );
};
export default OurStoryPg;
