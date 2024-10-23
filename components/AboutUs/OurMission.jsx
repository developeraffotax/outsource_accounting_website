import Image from "next/image";
import AboutUsOurMission from "@/public/aboutUsOurMission.png";
import { BsCheckCircle } from "react-icons/bs";

const OurMission = () => {
  return (
    <section className="w-full flex justify-between items-start gap-8 px-20 mx-auto container py-8 max-lg:flex-col-reverse max-lg:px-12 ">
      <div className=" ">
        <Image src={AboutUsOurMission} width={500} height={500} className="" />
      </div>

      <div className="w-[50%]  max-w-[600px] max-lg:w-full  ">
        <div className="mb-16">
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Our mission
          </h2>

          <p className="font-Inter text-black/75 text-lg">
            At Outsource Accounting, we’ve got a straightforward mission – we’re
            here to hook you up with outstanding accounting services that fit
            your needs like a glove. And guess what? We’re doing it all while
            keeping things cheaper for you. We understand that juggling finances
            can be a bit of a head-scratcher, so our goal is to make it as easy
            as a pie, super efficient, and light on the wallet.
            <br />
            <br />
            Think of us not only as your average accountants, but as your
            reliable and trustworthy financial allies, prepared to sail you
            through all the twists and turns of the financial ocean. Our goal is
            very clear: whether you’re starting a new business, steering a
            growing business, or captaining an established business, we’re here
            to give you the expertise and assistance you need to succeed in the
            very competitive UK business market.
          </p>
        </div>

        <div>
          <h2 className="text-[#6C63FF] font-poppins text-2xl mb-8">
            Our values
          </h2>

          <ul className="">
            <li className="mb-4"> {" "} <BsCheckCircle className="text-[#6C63FF] inline text-xl mr-2  " />{" "} <h4 className="inline font-Inter font-[500]"> Customer success is our priority </h4>{" "} </li>
            <li className="mb-4"> {" "} <BsCheckCircle className="text-[#6C63FF] inline text-xl mr-2 " />{" "} <h4 className="inline font-Inter font-[500]"> Top quality & constant growth </h4>{" "} </li>
            <li className="mb-4"> {" "} <BsCheckCircle className="text-[#6C63FF] inline text-xl mr-2  " />{" "} <h4 className="inline font-Inter font-[500]"> New technologies </h4>{" "} </li>
            <li className="mb-4"> {" "} <BsCheckCircle className="text-[#6C63FF] inline text-xl mr-2 " />{" "} <h4 className="inline font-Inter font-[500]"> Ecological materials & production </h4>{" "} </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
