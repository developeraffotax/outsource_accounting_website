import Services from "./components/Services.jsx";
import Comapany from "./components/Company.jsx";
import ContactUS from "./components/ContactUS.jsx";
import TwitterIcon from "@/assets/images/Footer/FooterIcons/TwitterIcon.svg";
import LinkdinIcon from "@/assets/images/Footer/FooterIcons/LinkdinIcon.svg";
import PintrestIcon from "@/assets/images/Footer/FooterIcons/PintrestIcon.svg";
import InstagramIcon from "@/assets/images/Footer/FooterIcons/InstagramIcon.svg";
import FacebookIcon from "@/assets/images/Footer/FooterIcons/FacebookIcon.svg";

const Footer = () => {
  return (
    <footer className=" bg-(--color-buttonBlue) text-amber-50 rounded-base shadow-xs border border-default py-3 md:py-8 px-3 md:px-8 lg:px-44 2xl:px-80">
      <div className="flex flex-col md:flex-row items-start justify-between w-full ">
        <div className="flex flex-col gap-6 h-auto">
          <div>
            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
              Outsource Accounting
            </span>
            <p className="wrap max-w-120 mt-8 font-light">
              We at Outsource Accounting Ltd are a reliable UK-based Accounting
              firm that specialises in providing affordable accounting and tax
              filing services online for clients within the UK. 
            </p>
          </div>
          <div className="mt-auto">
            <p className="font-light">Follow us for more updates:</p>
            <ul className="flex gap-6 mt-3 items-center">
              <li>
                <img
                  src={LinkdinIcon.src}
                  alt="LinkdinIcon"
                  className="h-5 w-5 cursor-pointer"
                />
              </li>
              <li>
                <img
                  src={TwitterIcon.src}
                  alt="TwitterIcon"
                  className="h-6 w-6 cursor-pointer"
                />
              </li>
              <li>
                <img
                  src={PintrestIcon.src}
                  alt="PintrestIcon"
                  className="h-6 w-6 cursor-pointer"
                />
              </li>
              <li>
                <img
                  src={InstagramIcon.src}
                  alt="InstagramIcon"
                  className="h-6 w-6 cursor-pointer"
                />
              </li>
              <li>
                <img
                  src={FacebookIcon.src}
                  alt="FacebookIcon"
                  className="h-6 w-6 cursor-pointer"
                />
              </li>
            </ul>
          </div>
        </div>
        <ul className="grid grid-rows-[2fr_1fr_2fr] grid-flow-col md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 lg:grid-rows-none lg:w-1/2 mb-6 mt-4 md:mt-0 text-sm font-medium text-body sm:mb-0 gap-4 lg:gap-12 ">
          <li className="me-4 md:me-6">
            Services
            <Services />
          </li>
          <li className="me-4 md:me-6">
            Company
            <Comapany />
          </li>
          <li className="me-4 md:me-6">
            Contact Us
            <ContactUS />
          </li>
        </ul>
      </div>
      <hr className="my-6 border-default sm:mx-auto lg:my-8" />
      <div className="flex justify-between">
        <span className="block text-sm text-body items-start">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Outsource Accounting
          </a>
          Outsource Accounting. All rights reserved.
        </span>
        <span className=" flex text-sm text-body items-end gap-3">
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </span>
      </div>
    </footer>
  );
};
export default Footer;
