import React from "react";
import HeroCard from "./HeroCard.jsx";
import { useParams } from "react-router-dom";
import {
  HSIX,
  HTHREE,
  HTOO,
  HONE,
  HFOOR,
  HFIVE,
  HeroBackgroundImg,
} from "../../../../assets/images/serivePgsImg/Hero/HeroServicePgImg.js";

const data = [
  {
    key: 1,
    slug: "company-accounts",
    title: "Preparing Annual Accounts for Year-End",
    img: HONE,
    gbimg: HeroBackgroundImg,
    paragraphOne:
      "Preparing annual accounts can be time-consuming and complicated, but it doesn’t have to be. At online accountant, we provide annual accounts services designed to make the process seamless and stress-free. Our expert team ensures your year-end accounts are accurate, compliant, and submitted on time, helping you avoid penalties and maintain peace of mind.",
    paragraphTwo:
      "Whether you're a small business or a growing enterprise, we offer annual accounts service tailored to meet your unique needs. Let us handle your Ltd company accounts, so you can focus on running your business with confidence",
  },
  {
    key: 2,
    slug: "self-assessment",
    title: "File Self Assessment Tax Return Online",
    img: HTOO,
    gbimg: HeroBackgroundImg,
    paragraphOne:
      "Filing your Self Assessment tax return in the UK doesn’t have to be stressful. With us, we simplify the process of submitting your tax return online, ensuring accuracy, timeliness, and compliance with HMRC regulations. Whether you are self-employed, a freelancer, or an individual with additional income sources, our expert team is here to guide you through every step",
    paragraphTwo:
      "The online submission of self-assessment tax returns offers a secure, efficient way to meet your tax obligations, saving you from the complexities of manual filing. filing a self-assessment tax return online minimises the chance of errors and allows quicker processing. With us, you can leverage our user-friendly online tools and expert guidance to ensure a seamless process from start to finish.",
  },
  {
    key: 3,
    slug: "corporation-tax",
    title: "Reliable Bookkeeping Services",
    img: HTHREE,
    gbimg: HeroBackgroundImg,
    paragraphOne:
      "Managing your finances shouldn’t be stressful. At outsource, we specialize in offering bookkeeping UK services that simplify financial management for businesses of all sizes. Our expert team ensures your records are organized, compliant, and always up-to-date, allowing you to focus on the growth of your business while we handle the numbers.",
    paragraphTwo:
      "Whether you need expert help with online bookkeeping, are searching for bookkeepers near me, or need assistance with double entry bookkeeping, Outsource delivers customized solutions that fit your unique needs. Our aim is to provide businesses across the UK with accessible, efficient, and error-free financial management services.",
  },
  {
    key: 4,
    slug: "payroll",
    title: "Efficient Payroll Services",
    img: HFOOR,
    gbimg: HeroBackgroundImg,
    paragraphOne:
      "Small businesses spend roughly six hours per month sorting their own payroll, this is time you can’t afford to waste.",
    paragraphTwo:
      "Payroll outsourcing is the way forward.  Let the team of expert accountants at Online Accountant manage the process for you with our online payroll services. Payroll outsourcing eliminates costly mistakes as the whole process will be managed by a qualified accountant.",
  },
  {
    key: 5,
    slug: "vat-returns",
    title: "Expert VAT Services",
    img: HFIVE,
    gbimg: HeroBackgroundImg,
    paragraphOne:
      "Simplify your VAT registration process with Online accountant expert-driven VAT registration service. Whether you’re registering voluntarily or out of necessity, our streamlined process ensures compliance with HMRC VAT online registration requirements, saving you time and hassle",
    paragraphTwo:
      "VAT (Value Added Tax) is a tax on goods and services in the UK. Businesses must register for VAT if their annual turnover exceeds £85,000. Registering allows you to charge VAT on your sales and reclaim VAT on business purchases.",
  },
  {
    key: 6,
    slug: "company-formation",
    title: "Seamless Company Formation",
    gbimg: HeroBackgroundImg,
    img: HSIX,
    paragraphOne:
      "Setting up a UK company as a non-resident is simple and straightforward with outsource accounting. Whether you’re an entrepreneur expanding globally or seeking access to the thriving UK market, our hassle-free process ensures you can establish your presence with ease. Our service is designed to cater specifically to non-UK residents, offering you everything you need to start your business smoothly, including fast registration and a prestigious London office address.",
    paragraphTwo: "",
  },
];

const HeroDataProvider = () => {
  //destructuring
  const { slug } = useParams();
  // items.slug is from our data .find matching it with the url slug if matches out put given.
  const card = data.find((item) => item.slug === slug);

  if (!card) {
    return <div>Service not found</div>;
  }

  return (
    <HeroCard
      img={card.img}
      bgimg={card.gbimg}
      paragraphOne={card.paragraphOne}
      paragraphTwo={card.paragraphTwo}
      title={card.title}
    />
  );
};

export default HeroDataProvider;
