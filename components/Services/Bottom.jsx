import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const Bottom = () => {
  return (
    <section className="w-full  px-20 text-center flex flex-col justify-center items-center  bg-gradient-to-t  from-[#8780FF]/40 to-[#ffffff] relative  py-28 overflow-hidden ">
      <h2 className="w-full text-center text-3xl font-poppins py-8 z-50 relative max-w-[700px]">
        Looking For Online Accounting & Tax Filing Services in the UK?
      </h2>

      <p className="font-Inter text-lg text-black/75  text-center py-8  w-full z-50 relative max-w-[700px] leading-loose ">
        Give your finances a proper nudge in the right direction with our cheap
        online accounting and tax filing services. Get in touch today!
      </p>

      <div className="flex justify-center items-center w-full gap-8 py-8 z-20 relative">
        <Link href={"/contact-us"} className="px-6 py-3 rounded-md  bg-[#6C63FF] text-white font-poppins " > Request a call-back </Link>
        <Link href={"/contact-us"} className=" text-[#6C63FF] font-poppins border-b border-[#6C63FF]/50 py-1" > Contact us online <GoArrowRight className="inline-block ml-1 " /> </Link>
      </div>

      <div className="w-full  absolute  -top-6 left-0    ">
        <svg viewBox="0 0 1440 401" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.33" d="M603.325 270.03C-277.788 623.23 -533.609 134.03 -780.787 270.03C-1155.44 477.23 -1440.65 239.63 -1440.65 239.63V0.830078H2880.65V239.63C2880.65 239.63 2612.3 344.03 2470.56 356.83C2328.82 370.03 2199.18 307.63 2143 268.43C2042.32 199.23 1780.02 35.6301 1562.22 19.6301C1344.43 3.63008 687.158 236.83 603.325 270.03Z" fill="white" /> <path opacity="0.66" d="M1731.18 270.03C1534.57 270.03 1397.58 177.23 1173.3 113.63C1049.72 78.8301 523.813 73.2301 75.6942 270.03C-372.425 466.83 -320.569 132.43 -569.044 270.03C-940.676 474.03 -1440.65 160.03 -1440.65 160.03V0.830078H2880.65V146.83C2880.65 146.83 2758.79 72.8301 2482.66 72.8301C2060.47 73.2301 1911.38 270.03 1731.18 270.03Z" fill="white" /> <path d="M1869.9 116.43C1005.64 -113.57 720.432 378.43 162.552 194.43C-394.895 8.03009 -394.895 22.4301 -642.074 83.2301C-887.523 144.03 -868.942 180.43 -1052.17 210.83C-1317.06 255.63 -1440.65 0.830078 -1440.65 0.830078H2880.65C2880.65 0.830078 2837.87 164.43 2519.39 193.23C2200.91 222.03 2144.3 188.83 1869.9 116.43Z" fill="white" /> </svg>
      </div>
    </section>
  );
};

export default Bottom;
