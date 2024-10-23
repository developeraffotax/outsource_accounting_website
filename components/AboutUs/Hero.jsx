import HeroImg from "@/public/aboutHero.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex justify-between items-start gap-16 px-20 mx-auto container py-8 max-lg:flex-col max-lg:px-12 ">
      <div className=" w-[50%] flex flex-col items-start justify-start gap-16     max-w-[600px] max-lg:w-full ">
        <h2 className="text-[#6C63FF] font-poppins text-xl ">Our story</h2>
        <h2 className="text-[#6C63FF] font-poppins text-2xl ">
          Reliable & affordable accounting services for your business!
        </h2>
        <p className="text-black/85 font-Inter text-lg ">
          Hello and welcome to Outsource Accounting! We’re all about blending
          expertise with affordability, putting your financial success right at
          the top of our task list. Our journey started with a simple idea – to
          shake up the world of accounting services in the UK. Why? Because we
          believe every business, big or small, should have access to spot on
          accounting without draining the bank. So, let’s make your financial
          journey silky and more successful together!
          <br />
          <br />
          Starting from our small beginnings, we’ve grown into a reliable ally
          for loads of businesses right here in the UK. We at Outsource
          Accounting have expert accountants who are clocked on to the fact that
          accounting needs a breath of fresh air – something beyond just numbers
          and charts. We want a way to really get what businesses deserve in the
          lively UK market.
        </p>
      </div>

      <div className=" ">
        <Image src={HeroImg} width={500} height={500} />
      </div>
    </section>
  );
};

export default Hero;
