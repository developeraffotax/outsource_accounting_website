import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/selfAssessment.png";

const Hero = () => {
  return (
    <section className="w-full px-20 container mx-auto ">
      <div className="w-full flex flex-row justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            {" "}
            We&#39;re here to make self-assessment tax return a walk in the park for
            you.
          </h2>
          <p className=" font-Inter ">
            Welcome to the financial tranquillity of self-assessment tax return,
            where your financial worries take a back seat, and we handle your
            self-assessment tax return smoothly. At Outsource Accounting, we are
            not just regular bean counters; we sweep through the self-assessment
            process and make it a breeze for directors, contractors,
            freelancers, sole traders, etc.
          </p>
        </div>

        <div className="w-[50%] max-w-[400px]">
          <Image src={HeroImage} alt="self-assessment--hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
