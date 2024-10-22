import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/vatReturn.png";

const Hero = () => {
  return (
    <section className="w-full px-20 max-lg:px-8 container mx-auto ">
      <div className="w-full flex flex-row max-lg:flex-col-reverse justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-lg:w-full max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Nail your taxes with our Vat Returns Service!
          </h2>
          <p className=" font-Inter ">
            Alright, buckle up, mates! Our online VAT Return services in the UK
            are crafted with you in mind - yes, you savvy directors,
            contractors, freelancers, and sole traders running the show. We
            know, going through the mind-boggling UK VAT returns is a bit of a
            mare, that is why we hold your hand to stroll through it. We’re here
            to make those VAT headaches a thing of the past. No fuss, no bother,
            VAT returns solutions as bespoke as a Savile Row suit. Speak to one
            of our expert accountants, and let’s make those tax blues a distant
            memory!
          </p>
        </div>

        <div className="w-[50%] max-lg:w-full max-w-[400px]">
          <Image src={HeroImage} alt="vat-return--hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
