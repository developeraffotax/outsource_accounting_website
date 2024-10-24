"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";

import { usePathname } from "next/navigation";
import {
  ControlledMenu,
  useClick,
  useHover,
} from "@szhsin/react-menu";
import { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

import { IoMdMail } from "react-icons/io";







const Header = () => {
  const pathname = usePathname();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);


  const mobileRef = useRef(null);
  const [isOpenMobile, setOpenMobile] = useState(false);
  const anchorPropsMobile = useClick(isOpenMobile, setOpenMobile);

  const mobileNavRef = useRef();
  const backdropRef = useRef();


  const hamBurgerHandler = () => {
    mobileNavRef.current.classList.remove('-translate-x-[999px]')
    backdropRef.current.classList.remove('hidden')
  
    
    
    mobileNavRef.current.classList.add('translate-x-0')
    console.log(mobileNavRef.current.classList)
  }




  
  const hamBurgerHandlerClose = () => {
    mobileNavRef.current.classList.remove('translate-x-0')
    

    backdropRef.current.classList.add('hidden')
    mobileNavRef.current.classList.add('-translate-x-[999px]')
    
  }




  //fixed z-[9999]
  return (
    <>
      <section className="w-full bg-gray-50/50 backdrop-blur-md   shadow-md shadow-black/25 fixed z-[9999]">
        <div className="w-full h-24 flex justify-between items-center    px-20 max-xl:px-8 max-xl:text-sm text-nowrap   text-base  mx-auto container font-Mulish  font-semibold max-lg:hidden ">
          <div className="">
            <Link href={"/"}> <Image src={Logo} className="w-32 p-2" alt="header--logo-image" /> </Link>
          </div>

          <div className=" flex justify-end items-center gap-8 ">
            <div className="flex  ">
              <nav>
                <ul className="flex justify-center items-center gap-8 ">
                  <Link href={"/"} className={`hover:text-primary   border-b-2 border-transparent hover:border-primary py-2 ${ pathname === "/" ? "active" : "" }`} > Home </Link>

                  

                  <li ref={ref} {...anchorProps} className={`hover:text-primary cursor-pointer border-b-2 border-transparent hover:border-primary py-2 ${ pathname === "/services" ? "active" : "" }`} >
                    Services
                    <ControlledMenu {...hoverProps} state={isOpen ? "open" : "closed"} anchorRef={ref} onClose={() => setOpen(false)} >
                      <div className="flex flex-col ">
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b  " href={"/service/accounts"} > Accounts{" "} </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/bookkeeping"} > Bookkeeping </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/company-formation"} > Company Formation </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/corporation-tax"} > Corporation Tax </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/payroll"} > Payroll </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/self-assessment"} > Self Assessment </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/vat-return"} > VAT Return </Link>
                        <Link onClick={() => setOpen(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none" href={"/services"} > View All Services </Link>
                      </div>
                    </ControlledMenu>
                  </li>


                  <Link href={"/about-us"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${ pathname === "/about-us" ? "active" : "" }`} > About Us </Link>

                  {/* <Link href={"/news-and-articles"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${ pathname === "/news-and-articles" ? "active" : "" }`} > News & Articles </Link> */}
                  <Link href={"/faqs"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${ pathname === "/faqs" ? "active" : "" }`} > FAQs </Link>
                </ul>
              </nav>
            </div>

            {/* <div className="hover:cursor-pointer">
              <HiOutlineSearch className="text-xl " />
            </div> */}

            <div>
              <Link href={"/contact-us"}>
                <button className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/90 transition-all ">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Header */}

      <section className="w-full bg-gray-50/50 backdrop-blur-md   shadow-md shadow-black/25 fixed z-[6666] lg:hidden">
        <div className="w-full h-20 flex justify-between items-center    px-8 max-xl:text-sm text-nowrap   text-base  mx-auto container font-Mulish  font-semibold ">
          <div>
            <IoMenu className="text-3xl cursor-pointer mr-4" onClick={hamBurgerHandler}/>
          </div>

          <div className="">
            <Link href={"/"}> <Image src={Logo} className="w-24 p-2" alt="header--logo-image" /> </Link>
          </div>

          <div>
            <Link href={"/contact-us"}> <button className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/90 transition-all "> Contact Us </button> </Link>
          </div>
        </div>




        <div ref={mobileNavRef} className="w-[70%] h-[100vh] py-8 -translate-x-[999px] fixed z-[9999] bg-purple-50 top-0 left-0 transition-all ">
          <nav className="w-full flex flex-col justify-between items-start h-full ">
            <ul  className="w-full flex flex-col justify-center items-start gap-2 font-Inter relative  ">
              <button onClick={hamBurgerHandlerClose} className={`hover:text-primary  w-full   pl-10  py-1`}> <MdOutlineKeyboardBackspace className="text-2xl" /></button>
              <Link onClick={hamBurgerHandlerClose} href={"/"} className={`hover:text-primary  w-full   pl-10  py-1`} > Home </Link>

              








                



              <li ref={mobileRef} {...anchorPropsMobile} className={` hover:text-primary cursor-pointer  pl-10 py-1 ${ pathname === "/services" ? "active" : "" }`} >
                    Services <MdChevronRight className={`text-lg inline-block mb-1 mx-0 ${isOpenMobile ? 'rotate-0' : 'rotate-90'} transition-all`} />
                    <ControlledMenu direction="right"   className=' w-full' state={isOpenMobile ? "open" : "closed"} anchorRef={mobileRef} onClose={() => setOpenMobile(false)} >
                      <div className=" flex flex-col w-full ml-2 shadow-md " onClick={hamBurgerHandlerClose}>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center " href={"/service/accounts"} > Accounts{" "} <MdChevronRight className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/bookkeeping"} > Bookkeeping <MdChevronRight  className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/company-formation"} > Company Formation <MdChevronRight  className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/corporation-tax"} > Corporation Tax <MdChevronRight className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/payroll"} > Payroll <MdChevronRight className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/self-assessment"} > Self Assessment <MdChevronRight className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b flex justify-between items-center" href={"/service/vat-return"} > VAT Return <MdChevronRight className=""/> </Link>
                        <Link onClick={() => setOpenMobile(false)} className="text-xs text-black bg-white py-2 px-4 w-full font-Inter font-normal hover:text-white hover:bg-[#6C63FF] outline-none flex justify-between items-center text-center" href={"/services"} > View All Services <MdChevronRight className=""/> </Link>
                      </div>
                    </ControlledMenu>

                  </li>





                  <Link onClick={hamBurgerHandlerClose} href={"/about-us"} className={`hover:text-primary w-full   pl-10 py-1`} > About Us </Link>

                  






















              {/* <Link onClick={hamBurgerHandlerClose} href={"/news-and-articles"} className={`hover:text-primary w-full  pl-10  py-1`} > News & Articles </Link> */}
              <Link onClick={hamBurgerHandlerClose} href={"/faqs"} className={`hover:text-primary w-full  pl-10  py-1`} > FAQs </Link>


              
            </ul>


                    
          
            <ul className="flex flex-col justify-center items-start gap-2 pl-10">
            <Link href={"/contact-us"}> <button className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/90 transition-all "> Contact Us </button> </Link>
              <li className=" hover:text-primary text-sm  " ><a href="tel:+0208 144 6811"><FaPhone className="inline-block mr-2   "/><span>0208 144 6811</span> </a></li>
              <li className=" hover:text-primary text-sm" ><a href="mailto:admin@outsourceaccountings.co.uk" target="_blank"><IoMdMail  className="inline-block mr-2   "/><span>admin@outsourceaccountings.co.uk</span></a></li>
              

            </ul>
          

       



          </nav>
        </div>

        <div onClick={hamBurgerHandlerClose} ref={backdropRef} className="fixed w-[100vw] h-[100vh] bg-black/25 backdrop-blur-sm z-[7777] hidden top-0 left-0"></div>


      </section>
    </>
  );
};

export default Header;













































{/* <li ref={mobileRef} {...anchorPropsMobile} className={`hover:text-primary cursor-pointer border-b hover:border-primary pl-10 py-1 ${ pathname === "/services" ? "active" : "" }`} >
Services
<ControlledMenu direction="right" position="bottom" className=' w-full' state={isOpenMobile ? "open" : "closed"} anchorRef={mobileRef} onClose={() => setOpenMobile(false)} >
  <div className="flex flex-col w-full ml-4">
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b  " href={"/service/accounts"} > Accounts{" "} </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/bookkeeping"} > Bookkeeping </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/company-formation"} > Company Formation </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b " href={"/service/corporation-tax"} > Corporation Tax </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/payroll"} > Payroll </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/self-assessment"} > Self Assessment </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b" href={"/service/vat-return"} > VAT Return </Link>
    <Link onClick={() => setOpenMobile(false)} className="text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none" href={"/services"} > View All Services </Link>
  </div>
</ControlledMenu>
</li> */}