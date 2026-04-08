import GetStartedButton from "@/components/shared/buttons/GetStartedButton";
import Cards from "./subComponents/Cards";
import getImageUrl from "@/lib/utils/getImageUrl";
import Container from "@/components/wraper/Container";

const Hero = ({ data }) => {
  const imageUrl = data.image?.url ? getImageUrl(data.image?.url) : data.image;
  const descriptionParagraphs = Array.isArray(data.description)
    ? data.description
    : [data.description, data.descriptiontwo].filter(
        (paragraph) =>
          typeof paragraph === "string" && paragraph.trim().length > 0,
      );

  return (
    <Container withYPadding={false} className="px-0 py-8 md:py-12">
      <section className="rounded-2xl bg-blue-50 border border-transparent shadow-sm py-6 md:py-8 lg:py-10 px-3 md:pl-8 md:pr-8 lg:pl-44 lg:pr-44 2xl:pl-80 2xl:pr-80">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {data.title}{" "}
              <span className="text-blue-800">{data.titleHighlight}</span>
            </h1>

            {data.subtitle && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {data.subtitle}
              </h2>
            )}

            <div className="flex flex-col gap-3">
              {descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-light text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start pt-1">
              <GetStartedButton />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
              <img
                src={imageUrl}
                alt={data.title}
                className="w-full h-auto aspect-video 2xl:aspect-4/3 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 mb-2">
          <Cards />
        </div>
      </section>
    </Container>
  );
};

export default Hero;
