import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/bookkeeping.png";

const Hero = () => {
  return (
    <section className="w-full px-20 container mx-auto ">
      <div className="w-full flex flex-row justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Accurate bookkeeping is the heart & soul of a proper blooming
            business, and you are in the right place!
          </h2>
          <p className=" font-Inter ">
            Are you looking for an outstanding bookkeeper? Outsource Accounting
            is where bookkeeping services are as smooth as a buttered crumpet!
            Imagine having your own financial maestros and bookkeepers more
            reliable than the British weather. Whether you want bookkeeping for
            12 months or just a month, our expert bookkeepers are geared up and
            good to go.
          </p>
        </div>

        <div className="w-[50%] max-w-[400px]">
          <Image src={HeroImage} alt="bookkeeping--hero-image"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
