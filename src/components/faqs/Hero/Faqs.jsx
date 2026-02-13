import Link from "next/link";
import faqHeroQuery from "@/lib/data/faq/faqHeroQuery";

const Faqs = async () => {
  const res = await faqHeroQuery();
  const content = res?.data?.hero;

  if (!content) return null;

  return (
    <div className="flex flex-col items-center md:items-start rounded-2xl w-11/12 md:w-2/3 bg-linear-to-r from-gray-50 to-blue-300 my-6 lg:my-12 mx-auto py-6 lg:py-12 px-3 md:px-8">
      <h1 className="text-transparent bg-clip-text bg-linear-to-r from-blue-800 to-gray-600 font-semibold text-2xl md:text-3xl lg:text-4xl my-2 md:my-3 text-center md:text-start">
        {content.heading}
      </h1>

      <p className="font-light max-w-140 text-center md:text-start">
        {content.description}{" "}
        {content.link && (
          <Link href="#" className="text-blue-600">
            {content.link}
          </Link>
        )}
      </p>
    </div>
  );
};

export default Faqs;
