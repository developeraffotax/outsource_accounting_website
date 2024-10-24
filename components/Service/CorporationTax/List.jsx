
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';




const ListArr = [
  {
    title: "Tax Efficiency Reviews that Speak Pounds",
    content: `Picture this – an annual tax efficiency review, where we delve deep into the fiscal nitty-gritty of your business, making sure you're not leaving any pounds on the table. We're not here to play hide and seek with cost-cutting opportunities; we're here to uncover them.`,
    key: uuidv4()
  },

  {
    title: "HMRC Investigations? We've Got Your Back",
    content: `Ever feel like the taxman is breathing down your neck? Fear not! Our battle-tested team will stand by you in the face of any HMRC investigation. We speak the language of compliance fluently, ensuring you can focus on your business while we handle your corporation tax in the UK and the taxman’s queries. It's like having a financial superhero on speed dial.`,
    key: uuidv4()
  },

  {
    title: "Tax Efficiency in Every Pound",
    content: `We understand that every quid matters. Our expert team of accountants is all about boosting your tax game, sniffing out every legit expense to make your business wallet sing. Let's wend our way through the UK corporation tax maze together and make sure your business is cruising down the tax-efficiency lane. Time to save those pounds, savvy business owner! `,
    key: uuidv4()
  },
];

const List = () => {
  return (
    <section className="w-full px-20 max-lg:px-4 container mx-auto py-12 ">
      <h2 className="font-poppins text-3xl text-center ">
        Why Choose Us?
      </h2>

      <ul className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-8 mt-12">
        {ListArr.map((el) => {
          return (
            <li
              key={el.key}
              className="w-full flex  flex-row justify-between max-lg:justify-between  p-8   items-center gap-8 shadow-[rgba(0,0,15,0.07)_1px_1px_12px_0px] rounded-xl   hover:cursor-pointer hover:scale-105 transition-all group"
            >
              

             <div className="flex flex-col justify-start items-start  gap-2">


             <h3 className="font-semibold text-xl font-poppins max-w-80 group-hover:text-[#6C63FF]">
                {el.title}
              </h3>
              <p className="text-sm font-Inter max-w-80 text-start text-gray-500">{el.content}</p>


             </div>

              <div className="mt-6 max-lg:mt-0 rounded-full bg-slate-200 group-hover:bg-[#6C63FF]/10 relative drop-shadow-none bottom-3 right-3 z-10 w-24    aspect-square flex justify-center items-center text-4xl font-oswald font-semibold text-white">
                <div className=" border-[0.25rem] bg-transparent  absolute border-[#6C63FF] drop-shadow-md  w-full h-full  rounded-full  top-2 left-3 z-10 flex justify-center items-center">
                  <FaCheck className="text-[#6C63FF] scale-125" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default List;
