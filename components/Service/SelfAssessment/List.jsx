import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const ListArr = [
  {
    title: "UK-based accredited accountants",
    content: `Our UK-based accredited accountants are your financial confidantes, available round the clock to provide unlimited help and advice. No more steering through the financial labyrinth alone – we've got your back and self-assessment tax return.`,
    key: uuidv4()
  },

  {
    title: "Claim expenses & tax reliefs",
    content: `Claiming expenses and snagging those sweet tax reliefs has never been as smooth as a buttered scone. We're well-versed in the language of HMRC, making sure you get exactly what you deserve without the headache of deciphering tax codes.`,
    key: uuidv4()
  },

  {
    title: "Accurate filing to HMRC",
    content: `Speaking of headaches, have you ever found yourself drowning in a sea of numbers, trying to calculate your self-assessment tax bill? We understand, so don't fret! Our experts will present a complete calculation of your tax bill on a silver platter. Review, approve, and let us handle the rest – your self assessment tax return will be filed promptly and accurately to HMRC.`,
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
