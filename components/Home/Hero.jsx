import Image from "next/image";
import React from "react";
import homeHero from "@/public/homeHero.png";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const Hero = () => {
  return (
    <section className="w-full  bg-gradient-to-b from-[#8780FF]/40 to-[#ffffff] py-12 relative">
      <div className="w-full flex justify-between items-center gap-16  container mx-auto px-20 max-lg:px-12 z-50 relative" >


        <div className=" flex flex-col justify-center items-start gap-12 max-w-[500px]" >
          <h2 className="font-poppins text-xl text-[#6C63FF]"> Welcome to Outsource Accounting </h2>
          <h1 className="font-poppins text-4xl   "> Cheap Online Accounting & Tax Filing Services in the UK </h1>
          <p className="font-Inter text-lg text-gray-700 "> Outsource Accounting is your trusted, reliable, and cheap online accounting and tax services partner. Chin up, we are dedicated to handling your Companies House and HM Revenue & Customs (HMRC) filings, starting from only £75 per year. <br /> <br /> Time to give your business a proper leg up! Fancy a chat with our expert UK accountants? Lets turn your business into an absolute cracker – reach out today! </p>

          <div className='flex justify-start items-center gap-8 text-nowrap max-lg:text-wrap'>
            <Link href='/contact-us'><button className='py-3 px-6    bg-[#6C63FF] text-white font-poppins rounded-md text-sm font-normal'>Get Free Consultation</button></Link>
            <Link href='/services' className='text-[#6C63FF] font-poppins text-sm border-b border-[#6C63FF]/50 py-1 text-nowrap'>Our Services <GoArrowRight className="inline-block ml-1 " /></Link>
          </div>
        </div>

        <div className="min-w-[400px] max-lg:hidden" >
          <Image src={homeHero} alt="homepage-hero-image"  width={500} className=' ' />
        </div>



      </div>
















      <div className="w-full  absolute -bottom-6 z-40">
      <svg   viewBox="0 0 1440 401" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.33" d="M836.675 131.13C1717.79 -222.07 1973.61 267.13 2220.79 131.13C2595.44 -76.07 2880.65 161.53 2880.65 161.53V400.33H-1440.65V161.53C-1440.65 161.53 -1172.3 57.13 -1030.56 44.33C-888.82 31.13 -759.181 93.53 -703.004 132.73C-602.318 201.93 -340.015 365.53 -122.222 381.53C95.572 397.53 752.842 164.33 836.675 131.13Z" fill="white"/>
<path opacity="0.66" d="M-291.184 131.13C-94.5652 131.13 42.4199 223.93 266.695 287.53C390.285 322.33 916.187 327.93 1364.31 131.13C1812.42 -65.67 1760.57 268.73 2009.04 131.13C2380.68 -72.87 2880.65 241.13 2880.65 241.13V400.33H-1440.65V254.33C-1440.65 254.33 -1318.79 328.33 -1042.66 328.33C-620.468 327.93 -471.383 131.13 -291.184 131.13Z" fill="white"/>
<path d="M-429.898 284.73C434.362 514.73 719.568 22.73 1277.45 206.73C1834.9 393.13 1834.9 378.73 2082.07 317.93C2327.52 257.13 2308.94 220.73 2492.17 190.33C2757.06 145.53 2880.65 400.33 2880.65 400.33H-1440.65C-1440.65 400.33 -1397.87 236.73 -1079.39 207.93C-760.91 179.13 -704.301 212.33 -429.898 284.73Z" fill="white"/>
</svg>

      </div>






    </section>
  );
};

export default Hero;
