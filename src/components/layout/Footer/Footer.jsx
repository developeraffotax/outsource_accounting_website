import Services from "./components/Services.jsx";
import Comapany from "./components/Company.jsx";
import ContactUS from "./components/ContactUS.jsx";
import TwitterIcon from "@/assets/images/Footer/FooterIcons/TwitterIcon.svg";
import LinkdinIcon from "@/assets/images/Footer/FooterIcons/LinkdinIcon.svg";
import PintrestIcon from "@/assets/images/Footer/FooterIcons/PintrestIcon.svg";
import InstagramIcon from "@/assets/images/Footer/FooterIcons/InstagramIcon.svg";
import FacebookIcon from "@/assets/images/Footer/FooterIcons/FacebookIcon.svg";
import Container from "@/components/wraper/Container";

const Footer = () => {
  return (
    <footer className="bg-(--color-buttonBlue) text-amber-50 rounded-base border border-default shadow-xs">
      <Container
        withYPadding={false}
        className="py-5 md:py-8 md:px-8 lg:px-16 xl:px-24 2xl:px-32"
      >
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:gap-10 lg:gap-12">
          <div className="flex h-auto max-w-xl flex-col gap-6 lg:pr-4">
            <div>
              <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
                Outsource Accounting
              </span>
              <p className="wrap max-w-120 mt-6 font-light leading-relaxed md:mt-8">
                We at Outsource Accounting Ltd are a reliable UK-based
                Accounting firm that specialises in providing affordable
                accounting and tax filing services online for clients within the
                UK. 
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
                  <a
                    href="https://www.facebook.com/people/Outsource-Accounting/61561941800158/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={FacebookIcon.src}
                      alt="Facebook"
                      className="h-6 w-6 cursor-pointer"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="mt-2 mb-4 grid w-full grid-cols-1 gap-x-8 gap-y-5 text-sm font-medium text-body sm:grid-cols-2 md:mt-0 md:mb-0 lg:w-[52%] lg:grid-cols-3 lg:gap-x-8">
            <li className="min-w-0">
              Services
              <Services />
            </li>
            <li className="min-w-0">
              Company
              <Comapany />
            </li>
            <li className="min-w-0">
              Contact Us
              <ContactUS />
            </li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <div className="flex flex-col gap-3 text-sm text-body md:flex-row md:items-center md:justify-between md:gap-6">
          <span className="block items-start">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Outsource Accounting,
            </a>{" "}
            All rights reserved.
          </span>
          <span className="flex items-start gap-3 md:items-center">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </span>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
