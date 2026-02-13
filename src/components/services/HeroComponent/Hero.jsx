import GetStartedButton from "@/components/shared/buttons/GetStartedButton";
import Cards from "./subComponents/Cards";
import getImageUrl from "@/lib/utils/getImageUrl";

const Hero = ({ data }) => {
  const bgImageUrl = data.bgImage?.url
    ? getImageUrl(data.bgImage?.url)
    : data.bgImage;
  const imageUrl = data.image?.url ? getImageUrl(data.image?.url) : data.image;

  return (
    <section className="relative mx-3 my-4 md:mx-8 lg:mx-44 2xl:mx-60 md:my-8 lg:my-12 rounded-2xl overflow-hidden border border-transparent shadow-sm">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src={bgImageUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-10 lg:p-12 xl:p-14 gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left items-center lg:items-start space-y-4 lg:space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black">
              {data.title}{" "}
              <span className="text-blue-800">{data.titleHighlight}</span>
            </h1>

            {data.subtitle && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black">
                {data.subtitle}
              </h2>
            )}
          </div>
          <div className="space-y-3 max-w-xl lg:max-w-2xl">
            {data.description?.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-800 text-sm md:text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-2">
            <GetStartedButton />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center lg:pr-8">
          <img
            src={imageUrl}
            alt={data.title}
            className="w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl hidden lg:inline-block"
          />
        </div>
      </div>
      <div className="pl-3 md:pl-10 lg:pl-12 2xl:pl-14 pr-3 md:pr-10 lg:pr-12 2xl:pr-0 flex justify-center lg:justify-start 2xl:w-1/2">
        <Cards />
      </div>
    </section>
  );
};

export default Hero;
