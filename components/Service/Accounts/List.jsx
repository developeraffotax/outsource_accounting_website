import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const ListArr = [
  {
    title: "Bespoke Accounts",
    content: `Our dedicated UK accountants craft comprehensive full accounts according to your business needs. Ta-ta one-size-fits-all accounting – hello to bespoke accounting!`,
    key: uuidv4()
  },

  {
    title: "Flexible Reporting",
    content: `Monthly, quarterly, or annual accounts reporting, we’ve got all of it down to a fine art. Choose a reporting standard that suits you best, and we'll have you keep a finger on the pulse.`,
    key: uuidv4()
  },

  {
    title: "Seamless Compliance",
    content: `Don’t let the complex world of HMRC and Companies House ruffle your feathers. We compile and submit your accounts with precision, getting all your ducks in a row. `,
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


             <h3 className="font-semibold text-lg font-poppins max-w-52 group-hover:text-[#6C63FF]">
                {el.title}
              </h3>
              <p className="text-xs font-Inter max-w-52 text-start text-gray-500">{el.content}</p>


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
