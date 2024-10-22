import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/corporationTax.png";

const Hero = () => {
  return (
    <section className="w-full px-20 max-lg:px-8 container mx-auto ">
      <div className="w-full flex flex-row max-lg:flex-col-reverse justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-lg:w-full max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Save more on corporation tax, spend less on accounting services!
          </h2>
          <p className=" font-Inter ">
            We make the corporation tax a doddle for you, with financial
            acrobatics, we turn the brainiac work into pounds saved for your
            business. We’re not just financial gurus, we’re your partners in
            your financial success. We specialise in made-to-order tax return
            services for companies, contractors, small businesses, and sole
            traders getting about the business wheeling and dealing in the UK.
          </p>
        </div>

        <div className="w-[50%] max-lg:w-full max-w-[400px]">
          <Image src={HeroImage} alt="corporation-tax--hero-image"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
