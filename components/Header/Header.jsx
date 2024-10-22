'use client'

import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";

import { usePathname } from "next/navigation";
import { ControlledMenu, MenuItem, useHover, useMenuState } from "@szhsin/react-menu";
import { useRef, useState } from "react";










const Header = () => {


    

    const pathname = usePathname(); 







    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);


   



//fixed z-[9999]
  return (
    <section className="w-full bg-gray-50 shadow-md shadow-black/25 fixed z-[9999]">



<div className="w-full h-24 flex justify-between items-center    px-20 max-xl:px-8 max-xl:text-sm text-nowrap   text-base  mx-auto container font-Mulish  font-semibold max-lg:hidden ">
      <div className="">
        <Link href={'/'}><Image src={Logo} className="w-32 p-2" alt="header--logo-image"/></Link>
      </div>

      <div className=" flex justify-end items-center gap-8 ">

        <div className="flex  ">
          <nav>
            <ul className="flex justify-center items-center gap-8 ">
              <Link  href={"/"} className={`hover:text-primary   border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/' ? 'active' : ''}`}>
                Home
                
              </Link>
              
              <Link href={"/about-us"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/about-us' ? 'active' : ''}`}>
                About Us
              </Link>




              <li  ref={ref} {...anchorProps} className={`hover:text-primary cursor-pointer border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/services' ? 'active' : ''}`}>
                Services

                <ControlledMenu
                {...hoverProps}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
              >
                <div className="flex flex-col ">


                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b  ' href={'/service/accounts'}>Accounts </Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b ' href={'/service/bookkeeping'}>Bookkeeping</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b ' href={'/service/company-formation'}>Company Formation</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b ' href={'/service/corporation-tax'}>Corporation Tax</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b' href={'/service/payroll'}>Payroll</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b' href={'/service/self-assessment'}>Self Assessment</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none border-b' href={'/service/vat-return'}>VAT Return</Link>
                <Link onClick={() => setOpen(false)} className='text-black bg-white py-3 px-8 font-poppins font-normal hover:text-white hover:bg-[#6C63FF] outline-none'  href={'/services'}>View All Services</Link>
                


                </div>
              </ControlledMenu>
              </li>




              <Link href={"/news-and-articles"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/news-and-articles' ? 'active' : ''}`}>
                News & Articles
              </Link>
              <Link href={"/faqs"} className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/faqs' ? 'active' : ''}`}>
               FAQs
              </Link>
            </ul>
          </nav>
        </div>

        <div className="hover:cursor-pointer">
          <HiOutlineSearch className="text-xl "/>
        </div>

        <div>
          <Link href={"/contact-us"}>
            <button className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/90 transition-all ">Contact Us</button>
          </Link>
        </div>

      </div>

    </div>



    </section>
  );
};

export default Header;
