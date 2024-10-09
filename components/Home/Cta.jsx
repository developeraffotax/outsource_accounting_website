import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { FiPhoneIncoming } from "react-icons/fi";

const Cta = () => {
  return (
    <section className="w-full  px-20 text-center flex flex-col justify-center items-center  bg-gradient-to-t  from-[#8780FF]/40 to-[#ffffff] relative  py-32 overflow-hidden ">
    <h2 className="w-full text-center text-3xl font-poppins py-8 z-50 relative max-w-[600px]">
    Join thousands of business owners
    who trust Outsource Accounting!
    </h2>

    
    <div className="flex justify-center items-center w-full gap-8 py-8 z-20 relative">
      <Link href={"/contact-us"} className="px-6 py-3 rounded-md  bg-[#6C63FF] text-white font-poppins " ><FiPhoneIncoming className="inline-block mr-1 " />  Request a call-back </Link>
      <Link href={"/contact-us"} className=" text-[#6C63FF] font-poppins border-b border-[#6C63FF]/50 py-1" > Contact us online <GoArrowRight className="inline-block ml-1 " /> </Link>
    </div>

    <div className="w-full  absolute  -top-6 left-0    ">
      <svg className="w-full    " viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.33" d="M603.325 269.2C-277.788 622.4 -533.609 133.2 -780.787 269.2C-1155.44 476.4 -1440.65 238.8 -1440.65 238.8V0H2880.65V238.8C2880.65 238.8 2612.3 343.2 2470.56 356C2328.82 369.2 2199.18 306.8 2143 267.6C2042.32 198.4 1780.02 34.8 1562.22 18.8C1344.43 2.8 687.158 236 603.325 269.2Z" fill="white" /> <path opacity="0.66" d="M1731.18 269.2C1534.57 269.2 1397.58 176.4 1173.3 112.8C1049.72 78 523.813 72.4 75.6942 269.2C-372.425 466 -320.569 131.6 -569.044 269.2C-940.676 473.2 -1440.65 159.2 -1440.65 159.2V0H2880.65V146C2880.65 146 2758.79 72 2482.66 72C2060.47 72.4 1911.38 269.2 1731.18 269.2Z" fill="white" /> <path d="M1869.9 115.6C1005.64 -114.4 720.432 377.6 162.552 193.6C-394.895 7.20001 -394.895 21.6 -642.074 82.4C-887.523 143.2 -868.942 179.6 -1052.17 210C-1317.06 254.8 -1440.65 0 -1440.65 0H2880.65C2880.65 0 2837.87 163.6 2519.39 192.4C2200.91 221.2 2144.3 188 1869.9 115.6Z" fill="white" /> </svg>
    </div>
  </section>
  )
};

export default Cta;
