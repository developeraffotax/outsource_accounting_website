import Link from "next/link";

const Comapany = () => {
  return (
    <ul className="font-light mt-4 lg:mt-8">
      <li className="mb-2">
        <Link href="/aboutus" className="font-light inline-block">
          About Us
        </Link>
      </li>
      <li className="mb-2">
        <Link href="/faqs" className="font-light inline-block">
          FAQS
        </Link>
      </li>
      {/* <li>
        <Link href="/blogs" className="font-light inline-block">
          Blogs
        </Link>
      </li> */}
      <li className="mb-2">
        <Link href="/contactUs" className="font-light inline-block">
          Contact Us
        </Link>
      </li>
    </ul>
  );
};
export default Comapany;
