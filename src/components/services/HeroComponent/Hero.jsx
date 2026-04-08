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
      <section className="rounded-2xl border border-transparent bg-blue-50 px-3 py-6 shadow-sm md:px-8 md:py-8 ">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {data.title}{" "}
              <span className="text-blue-800">{data.titleHighlight} </span>
              {data.subtitle && (
                <span className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {" "}
                  {data.subtitle}
                </span>
              )}
            </h1>

            <div className="mx-auto flex max-w-3xl flex-col gap-3 lg:mx-0">
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
                className="h-auto w-full aspect-video object-cover lg:aspect-4/3"
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
