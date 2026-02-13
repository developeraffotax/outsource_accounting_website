import QuoteForm from "@/components/shared/forms/QuoteForm";
import cardsApiCall from "./HeroComponents/apiCall";

const Hero = async ({
  img,
  title,
  headingFirstText,
  headingMiddleText,
  headingEndText,
  descriptionHeroHomepage,
  descriptionHeroHomePageTwo,
  freeConsultationImg,
  freeConsultation,
  ukFlagImg,
}) => {
  const Cards = await cardsApiCall();

  return (
    <section className="w-full ">
      <div className="relative h-[95vh] lg:h-[90vh] w-full flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden ">
        {/* Background Image */}
        <img
          src={img}
          alt={"Background"}
          className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
        />

        {/* LEFT TEXT SECTION */}
        <div className="w-full  md:w-2/4 px-6  md:pl-16 lg:pl-36 2xl:pl-62 text-white flex flex-col justify-center my-6 lg:my-12 mx-6 md:mx-8 ">
          <p className="inline-block mb-4 bg-linear-to-r from-[#c0b2ff] to-white text-[#333] px-4 py-2 rounded-xl text-sm font-medium w-fit">
            {title}
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
            {headingFirstText}{" "}
            <span className="text-(--color-veryLightBlue)">
              {headingMiddleText}
            </span>{" "}
            {headingEndText}{" "}
            <img
              src={ukFlagImg}
              alt="uk flag"
              className="inline-block w-8 h-8 ml-2"
            />
          </h1>

          {/* Hidden on small screens */}
          <p className="hidden md:block mb-4">{descriptionHeroHomepage}</p>

          <p className="hidden md:block mb-8">{descriptionHeroHomePageTwo}</p>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-indigo-600 to-indigo-400 text-white shadow-lg hover:opacity-90 transition w-max">
            <img src={freeConsultationImg} alt="contact" className="w-4 h-4" />
            {freeConsultation}
          </button>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-8/9 md:w-2/7 md:mr-25 lg:mr-44 2xl:mr-70 bg-white/40 backdrop-blur-md p-3 py-4 md:p-12 rounded-xl shadow-lg mt-10 md:mt-0 my-6 lg:my-12 ">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-gray-800">
            Quick <span className="text-(--color-buttonBlue)">Quote</span>
          </h2>
          <QuoteForm />
        </div>
      </div>

      {Cards}
    </section>
  );
};
export default Hero;
