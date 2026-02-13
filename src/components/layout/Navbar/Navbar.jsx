"use client";
import { useState } from "react";
import { HamburgerMenu } from "../../../assets/images/NavbarTopBar/NavbarImg.js";
import closeMenu from "../../../assets/images/NavbarTopBar/CrossIcon.png";
import ContactUsButton from "@/components/shared/buttons/contactUsButton.jsx";
import CompanyLogo from "../../../assets/images/NavbarTopBar/CompanyLogo.svg";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClick = () => {
    console.log("clicked");
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="w-full px-8 lg:px-44 2xl:px-70 z-50 py-2 bg-white items-center justify-between hidden md:flex sticky top-0">
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
      </nav>

      <nav className="md:hidden w-full bg-white/98 border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="relative w-full px-4 p-8 flex justify-between items-center">
          {/* Logo - Absolute Left */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <img
              src="/images/NavbarTopBar/CompanyLogo.png"
              alt="Company Logo"
              className="w-20 h-auto"
            />
          </div>

          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={onClick}
          >
            <img
              src={menuOpen ? closeMenu.src : HamburgerMenu.src}
              alt={menuOpen ? "Close Menu" : "Menu"}
              className="w-6 h-auto block"
            />
          </div>

          {menuOpen && (
            <ul className="flex flex-col items-center bg-[#ecf6fe] absolute top-full left-0 w-full h-screen py-4 shadow-md z-999">
              <li className="w-full">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2 px-4 border-b border-(--color-buttonBlue) text-base text-gray-800 hover:text-gray-600 no-underline"
                >
                  Home
                </Link>
              </li>

              <li className="w-full">
                <Link
                  href="/services"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2 px-4 border-b border-(--color-buttonBlue) text-base text-gray-800 hover:text-gray-600 no-underline"
                >
                  Services
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/aboutus"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2 px-4 border-b border-(--color-buttonBlue) text-base text-gray-800 hover:text-gray-600 no-underline"
                >
                  About Us
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/blogs"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2 px-4 border-b border-(--color-buttonBlue) text-base text-gray-800 hover:text-gray-600 no-underline"
                >
                  Blogs
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/faqs"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2 px-4 border-b border-(--color-buttonBlue) text-base text-gray-800 hover:text-gray-600 no-underline"
                >
                  FAQs
                </Link>
              </li>
              <li className="mt-auto mb-8">
                <ContactUsButton />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
