import Image from "next/image";
import React from "react";
import HeroImage from "@/public/assets/companyFormation.png";

const Hero = () => {
  return (
    <section className="w-full px-20 max-lg:px-8 container mx-auto ">
      <div className="w-full flex flex-row max-lg:flex-col-reverse justify-center items-center gap-12 py-12">
        <div className="w-[50%] max-lg:w-full max-w-[500px]">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Outsource Accounting – your reliable partner in a flawless Company
            Formation!
          </h2>
          <p className=" font-Inter ">
            Kudos to you for deciding to start a new venture in the UK! You are
            in the perfect place for it, we&#39;re here to make the whole shebang a
            piece of cake, so you can crack on with your dream business without
            a hitch. Whether you are a UK resident or a non-UK resident from
            anywhere in the world, we&#39;re here to help you register a UK limited
            company. Cheers to making it happen, the British way!
          </p>
        </div>

        <div className="w-[50%] max-lg:w-full max-w-[400px]">
          <Image src={HeroImage} alt="company-formation--hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
