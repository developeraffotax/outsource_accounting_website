import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/payroll.png";

const Hero = () => {
  return (
    <section className="w-full px-20 max-lg:px-8 container mx-auto ">
      <div className="w-full flex flex-row max-lg:flex-col-reverse justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-lg:w-full max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            We make payroll a piece of cake!
          </h2>
          <p className=" font-Inter ">
            Sick of swimming in the payroll paperwork ocean? We understand, and
            that is why we are here. Our splendid PAYE online services are the
            bee{"'"}s knees, designed to handle the nitty-gritty of payroll
            management with the finesse of a skilled chess player. We help
            directors, contractors, freelancers, or sole traders, covering your
            payroll like a trusty umbrella in a British downpour. Let us take
            the fuss out of payroll, leaving you more time to enjoy a cuppa and
            maybe even a cheeky biscuit. Cheers to laid-back financial juggling,
            old sport!
          </p>
        </div>

        <div className="w-[50%] max-lg:w-full max-w-[400px]">
          <Image src={HeroImage} alt="payroll--hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
