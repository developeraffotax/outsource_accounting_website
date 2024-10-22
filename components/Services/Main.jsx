import CompanyFormation from "@/public/companyFormation.png";
import Bookkeeping from "@/public/bookkeeping.png";
import Accounts from "@/public/accounts.png";
import CorporationTax from "@/public/corporationTax.png";
import SelfAssessment from "@/public/selfAssessment.png";
import PayrollServices from "@/public/payrollServices.png";
import Vat from "@/public/vat.png";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";



const servicesArr = [
    {
      logo: CompanyFormation,
      title: "Company Formation",
      key: "services-page" + uuidv4(),
      link: "/service/company-formation",
    },
    {
      logo: Bookkeeping,
      title: "Bookkeeping",
      key: "services-page" + uuidv4(),
      link: "/service/bookkeeping",
    },
    {
      logo: Accounts,
      title: "Accounts",
      key: "services-page" + uuidv4(),
      link: "/service/accounts",
    },
    {
      logo: CorporationTax,
      title: "Corporation Tax",
      key: "services-page" + uuidv4(),
      link: "/service/corporation-tax",
    },
    {
      logo: SelfAssessment,
      title: "Self Assessment",
      key: "services-page" + uuidv4(),
      link: "/service/self-assessment",
    },
    {
      logo: PayrollServices,
      title: "Payroll services",
      key: "services-page" + uuidv4(),
      link: "/service/payroll",
    },
    {
      logo: Vat,
      title: "VAT",
      key: "services-page" + uuidv4(),
      link: "/service/vat-return",
    },
  ];


  
const Main = () => {


  return (
    <section className="px-20 max-lg:px-8 mx-auto container ">
      <ul className="grid grid-cols-2 p-4 gap-16 max-lg:grid-cols-1   ">
        {servicesArr.map((el) => {
          return (
            <Link
              href={el.link}
              key={el.key}
              className="flex justify-start items-center max-xl:flex-col max-xl:p-4 max-xl:justify-center max-xl:gap-4 max-xl:rounded-2xl gap-12 px-16 max-w-[600px] min-w-[200px] h-[300px] shadow-[rgba(0,0,15,0.15)_2px_2px_15px_0px] rounded-md cursor-pointer hover:scale-105 transition-all duration-500   group "
            >
              <Image src={el.logo} alt={"services-page" + el.title} />
              <h2 className="font-poppins   text-2xl group-hover:text-[#8780FF] transition-all duration-500 ">
                {el.title}
              </h2>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Main;
