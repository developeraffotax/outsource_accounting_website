import Image from "next/image"
import Logo from "@/public/logo.png";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



const Footer = () => {
  return (
    <footer className="w-full  h-[600px]  pt-32  bg-black text-white font-Montserrat">


      <div className="w-full flex justify-around items-start px-20 mx-auto container">

        <div> <Link href={'/'}><Image src={Logo} alt="footer--logo-image" className="w-40 " /></Link></div>


        <div className="flex flex-col justify-center items-start gap-4 ">
          <h4 className="text-purple-400    text-xl   ">Services</h4>
          <nav>
            <ul >
              <li className="mb-2 hover:text-purple-400 " ><Link href={'/service/accounts'}>Accounts</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/vat-return'}>VAT Return</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/bookkeeping'}>Bookkeeping</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/payroll'}>Payroll services</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/corporation-tax'}>Corporation Tax</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/self-assessment'}>Self Assessment</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/service/company-formation'}>Company Formation</Link></li>
            </ul>
          </nav>

        </div>


        <div className="flex flex-col justify-center items-start gap-4 ">
          <h4 className="text-purple-400    text-xl   ">Company</h4>
          <nav>
            <ul >
              <li className="mb-2 hover:text-purple-400" ><Link href={'/about-us'}>About us</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/news-and-articles'}>News & articles</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/faqs'}>FAQs</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/contact-us'}>Contact Us</Link></li>
              <li className="mb-2 hover:text-purple-400" ><Link href={'/'}>Terms and Conditions</Link></li>

            </ul>
          </nav>

        </div>



        <div className="flex flex-col justify-center items-start gap-4 ">
          <h4 className="text-purple-400    text-xl   ">Connect</h4>
          <nav>
            <ul >
              <li className="mb-2 hover:text-purple-400   " ><a href="tel:+0208 144 6811"><FaPhone className="inline-block mr-2   "/><span>0208 144 6811</span> </a></li>
              <li className="mb-2 hover:text-purple-400" ><a href="mailto:admin@outsourceaccountings.co.uk" target="_blank"><IoMdMail  className="inline-block mr-2   "/><span>admin@outsourceaccountings.co.uk</span></a></li>
              

            </ul>
          </nav>

        </div>


      </div>

      <div className="mt-36 text-center text-gray-300 ">
        <p>
        © 2024 Outsource Accounting. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer