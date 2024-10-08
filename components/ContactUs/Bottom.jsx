import { useActionState  } from "react";

const Bottom = () => {





    // const [message, formAction] = useActionState(addToCart, null);



    
    






  return (
    <section className='w-full   py-20 bg-gradient-to-t from-[#8780FF]/40 to-[#ffffff]' >
         

        <div className='w-full mx-auto container flex flex-col justify-center items-center  px-20 '>
        <h2 className='font-poppins text-3xl text-center '>Have a question? <br/>
        Ask Outsource Accounting!</h2>


        <form className= 'w-full  max-w-[700px]  py-24 grid grid-cols-2 gap-6 text-center font-Inter ' >
            <div>
            <label htmlFor="your-name" className="block text-sm font-medium leading-6 text-gray-900 text-start ">
                Your Name
              </label>
              <input
                  id="your-name"
                  name="your-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 border-none outline-none focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2  sm:text-sm sm:leading-6"
                />
            </div>

            <div>
            <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900 text-start ">
                Phone Number
              </label>
              <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>

            <div>
            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 text-start ">
                Company
              </label>
              <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>

            <div className=''>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-start ">
                Email
              </label>
              <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>










            <div className='col-span-2'>
            <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900 text-start ">
                Your Question
              </label>
              <textarea
                  id="question"
                  name="question"
                  type="text"
                  rows='5'
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>




            <div className='col-span-2'>
           <button className='bg-[#6C63FF] font-poppins text-lg w-full py-2 text-white rounded-lg '>Send Message</button>
            </div>
        </form>




        <h4 className='font-Inter text-lg text-gray-600  '>
        Send us a message! Let’s get the show on the road!
        </h4>
        </div>
        
    </section>
  )
}

export default Bottom