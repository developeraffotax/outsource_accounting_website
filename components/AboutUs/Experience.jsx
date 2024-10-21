import AboutUsIcon1 from "@/public/aboutUsIcon1.png";
import AboutUsIcon2 from "@/public/aboutUsIcon2.png";
import AboutUsIcon3 from "@/public/aboutUsIcon3.png";
import Image from "next/image";

const Experience = () => {
  const boxArr = [
    {
      icon: AboutUsIcon1,
      heading: "Our experience",
      text: "20+ Years",
    },
    {
      icon: AboutUsIcon2,
      heading: "We operate in",
      text: "United Kingdom",
    },
    {
      icon: AboutUsIcon3,
      heading: "We currently serve to",
      text: "1000+ clients",
    },
  ];

  return (
    <section className="w-full px-20 mx-auto container py-8 max-lg:py-16">
      <ul className="w-full flex items-center justify-between gap-8 max-lg:flex-col">
        {boxArr.map((el) => {

          return (
            <li key={el.heading + "about-us-page"} className="h-[300px] w-[400px] min-w-[200px] max-xl:px-8 max-xl:py-8 -right-8 inset-20 flex flex-col items-center justify-center gap-4 px-28 py-20 shadow-[rgba(0,0,15,0.15)_2px_2px_15px_0px] rounded-md max-lg:rounded-2xl " >
              <Image src={el.icon} />
              <h5 className="font-inter text-black/75">{el.heading}</h5>
              <h6 className="font-poppins text-xl ">{el.text}</h6>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Experience;
