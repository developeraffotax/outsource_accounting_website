import Link from "next/link";

const ContactUsButton = ({ className = "", onClick }) => {
  return (
    <Link
      href="/contactUs"
      onClick={onClick}
      className={`items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-(--color-buttonBlue) border border-transparent rounded-md shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap inline-flex ${className}`}
    >
      Contact Us
    </Link>
  );
};
export default ContactUsButton;
