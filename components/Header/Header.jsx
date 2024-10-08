'use client'

import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";

import { usePathname } from "next/navigation";










const Header = () => {


    

    const pathname = usePathname(); 


   



//fixed z-[9999]
  return (
    <section className="w-full bg-gray-50 shadow-md shadow-black/25 ">



<div className="w-full h-24 flex justify-between items-center    px-20 max-xl:px-8 max-xl:text-sm text-nowrap   text-base  mx-auto container font-Mulish  font-semibold max-lg:hidden ">
      <div className="">
        <Link href={'/'}><Image src={Logo} className="w-32 p-2" /></Link>
      </div>

      <div className=" flex justify-end items-center gap-8 ">

        <div className="flex  ">
          <nav>
            <ul className="flex justify-center items-center gap-8 ">
              <li className={`hover:text-primary   border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/' ? 'active' : ''}`}>
                <Link href={"/"}>Home</Link>
              </li>
              <li className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/about-us' ? 'active' : ''}`}>
                <Link href={"/about-us"}>About Us</Link>
              </li>
              <li className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/services' ? 'active' : ''}`}>
                <Link href={"/services"}>Services</Link>
              </li>
              <li className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/news-and-articles' ? 'active' : ''}`}>
                <Link href={"/news-and-articles"}>News & Articles</Link>
              </li>
              <li className={`hover:text-primary  border-b-2 border-transparent hover:border-primary py-2 ${pathname === '/faqs' ? 'active' : ''}`}>
                <Link href={"/faqs"}>FAQs</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
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
