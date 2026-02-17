"use client";
import { useState } from "react";
import { HamburgerMenu } from "../../../assets/images/NavbarTopBar/NavbarImg.js";
import closeMenu from "../../../assets/images/NavbarTopBar/CrossIcon.png";
import ContactUsButton from "@/components/shared/buttons/contactUsButton.jsx";
import CompanyLogo from "../../../assets/images/NavbarTopBar/CompanyLogo.svg";
import Link from "next/link";
import Container from "@/components/wraper/Container.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Container
        withYPadding={false}
        className="w-full z-999 shadow py-2 bg-white items-center justify-between hidden md:flex sticky top-0"
      >
        <div className="flex items-center justify-between w-full py-3">
          <Link href="/" className="navbar-logo cursor-pointer">
            <img src={CompanyLogo.src} alt="Company Logo" />
          </Link>

          {
            <ul className="navbar-link hidden md:flex items-center justify-between gap-6 px-3">
              <li>
                <Link href="/" className="p-1 inline-block">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/services" className="p-1 inline-block">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/aboutus" className="p-1 inline-block">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/faqs" className="p-1 inline-block">
                  FAQs
                </Link>
              </li>
            </ul>
          }

          <ContactUsButton />
        </div>
      </Container>
      <Container
        withYPadding={false}
        className="md:hidden w-full bg-white shadow-sm sticky top-0 z-999"
      >
        <nav>
          <div className="relative w-full px-4 py-3 flex justify-between items-center">
            <Link href="/" className="navbar-logo cursor-pointer">
              <img src={CompanyLogo.src} alt="Company Logo" />
            </Link>

            <div
              className="h-10 w-10 rounded-md border border-gray-200 flex items-center justify-center cursor-pointer"
              onClick={onClick}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <img
                src={menuOpen ? closeMenu.src : HamburgerMenu.src}
                alt={menuOpen ? "Close Menu" : "Menu"}
                className="w-5 h-5 block"
              />
            </div>

            {menuOpen && (
              <ul className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md z-50 py-3 px-4 flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 text-base text-gray-800 hover:text-gray-600 no-underline"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/services"
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 text-base text-gray-800 hover:text-gray-600 no-underline"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aboutus"
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 text-base text-gray-800 hover:text-gray-600 no-underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 text-base text-gray-800 hover:text-gray-600 no-underline"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 text-base text-gray-800 hover:text-gray-600 no-underline"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="pt-2">
                  <ContactUsButton />
                </li>
              </ul>
            )}
          </div>
        </nav>
      </Container>
    </>
  );
};

export default Navbar;
