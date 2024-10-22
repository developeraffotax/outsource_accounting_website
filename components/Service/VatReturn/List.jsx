import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const ListArr = [
  {
    title: "Quarterly Returns with a Personal Touch",
    content: `Let's talk Quarterly Returns without the snooze fest, shall we? We, at Outsource Accounting, are here to jazz up your financial game. Imagine having your own money maestro, your personal accountant, giving your quarterly returns the VIP treatment – accuracy, caring, and deadline-proof. No more compliance headaches; we've got your back and your Value Added Tax return. `,
    key: uuidv4()
  },

  {
    title: "Fully Making Tax Digital (MTD) Compliant",
    content: `Our VAT Returns service is spot on  – fully MTD compliant and ready to roll. We take care of the technical nitty-gritty, using an advanced functional compatible software, freeing you up to be the captain of your business ship. Here's to smooth sailing through the ocean of business, minus the tax headaches! `,
    key: uuidv4()
  },

  {
    title: "Pay Less VAT with Regular Reviews",
    content: `Paying extra VAT? No one's up for that, right? We've got an outstanding team on it, making sure you're only forking out the absolute minimum. We're not just talking numbers here – we're in the trenches, cooking up smart plans to keep more of your cash where it should be: in your pocket. No more unnecessary tax kerfuffle – more quid in your wallet! `,
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


             <h3 className="font-semibold text-lg font-poppins max-w-80 group-hover:text-[#6C63FF]">
                {el.title}
              </h3>
              <p className="text-xs font-Inter max-w-80 text-start text-gray-500">{el.content}</p>


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
