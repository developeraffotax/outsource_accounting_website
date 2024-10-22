import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/accounts.png";

const Hero = () => {
  return (
    <section className="w-full px-20 container mx-auto ">
      <div className="w-full flex flex-row justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Your Annual Accounts Handled in a Jiffy!{" "}
          </h2>
          <p className=" font-Inter ">
            Welcome to Outsource Accounting, where your business accounts get
            the royal treatment, making you a financial king. Our dedicated team
            of online UK accountants is here to make your financial management a
            breeze, offering Monthly, quarterly, or annual accounts services
            with a touch of class for{" "}
            <b>
              companies, contractors, small businesses, and sole traders across
              the UK.
            </b>
          </p>
        </div>

        <div className="w-[50%] max-w-[400px]">
          <Image src={HeroImage} alt="accounts--hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
