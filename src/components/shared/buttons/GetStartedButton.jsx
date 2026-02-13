import Link from "next/link";

const GetStartedButton = () => {
  return (
    <Link
      href="/contactUs"
      className="bg-(--color-buttonBlue) px-8 py-2 my-2 text-white font-normal border-2 rounded-sm border-transparent inline-flex"
    >
      Get Started Now
    </Link>
  );
};
export default GetStartedButton;
