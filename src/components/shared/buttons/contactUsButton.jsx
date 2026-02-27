import Link from "next/link";

const ContactUsButton = () => {
  return (
    <Link
      href="/contactUs"
      className="navbar-btn bg-(--color-buttonBlue) cursor-pointer px-8 py-2 text-white font-semibold border-2 rounded-sm border-transparent hidden md:flex"
    >
      Contact Us
    </Link>
  );
};
export default ContactUsButton;
