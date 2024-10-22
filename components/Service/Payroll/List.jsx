import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const ListArr = [
  {
    title: "Dedicated Payroll Support!",
    content: `No more payroll quandary! With our finest payroll services, you’ll have round-the-clock support from our PAYE online clerk. No more faffing about with tangled tasks – concentrate on your forte while we sort out the nuts and bolts of your payroll rigmarole. It's like having a trusted sidekick to make payroll easier, so you can focus on your business. Let's toast to easygoing paydays!`,
    key: uuidv4()
  },

  {
    title: "Seamless Payroll Documentation Production",
    content: `We get it, mate – nailing down precise and on-the-dot payroll paperwork is key. Our outstanding  team makes sure all the payroll docs for your crew are tip-top, leaving zero space for any mishaps. Count on us to have your records spick and span, ticking all the boxes when it comes to following every single regulation. Your payroll's in safe hands, you can bet your boots on it! `,
    key: uuidv4()
  },

  {
    title: "HMRC Hassle? Not Anymore!",
    content: `Give the HMRC headache a proper send-off! Our crack team dives headfirst into the HMRC ocean, handling all your Real-Time Information (RTI) returns without skipping a beat. Say goodbye to those restless nights stressing over compliance – we've got you sorted. No more bother, just smooth sailing with us at the helm!`,
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
