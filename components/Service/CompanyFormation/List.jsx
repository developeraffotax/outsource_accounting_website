import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const ListArr = [
  {
    title: "Registered LTD company",
    content: `Your business, all sorted and officially on the map! Recognized by Companies House and geared up to make some serious waves in the UK business market. `,
    key: uuidv4()
  },

  {
    title: "Digital & printed company documents",
    content: `You will get to bag some digital and printed company documents – a proper tangible nod to your success.`,
    key: uuidv4()
  },

  {
    title: "London Registered Office & Service Address",
    content: `Nail your business presence with a London Registered Office & Service Address – right in the heart of the Big Smoke! `,
    key: uuidv4()
  },

  {
    title: "Confirmation Statement",
    content: `Keep the taxman off your back without breaking a sweat. No need to worry about the deets, mate! We help you stay compliant and make your business shine bright and proper!`,
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
              <p className="text-sm font-Inter  max-w-80 text-start text-gray-500">{el.content}</p>


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
