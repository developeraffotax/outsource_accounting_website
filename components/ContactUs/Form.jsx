'use client'

import { useFormState } from 'react-dom'
import FormBtn from './FormBtn';
import { sendMessage } from '@/actions/contact';
import { useRef, useState } from 'react';
import { getFormData } from '@/lib/getFormData';

const Form = () => {





    // const [message, formAction] = useActionState(addToCart, null);

      const formRef = useRef();


    const [state, action] = useFormState(sendMessage, {
			success: false,
			
			message: ``,
		  });
    

      const [inValidArray, setInValidArray] = useState([]);

       
      const formActionHandler = async (formData) => {

        const { company, email} = getFormData( formData, "company", "email");

        const invalidArr = [];

        if(company.length === 0) {
          invalidArr.push('company')
        }
      
        if(email.length === 0) {
          invalidArr.push('email')
        }
      
        if(invalidArr.length > 0) {

          return setInValidArray(invalidArr);


        }
      
        setInValidArray([]);
        await action(formData);
        formRef.current.reset();


        
        return;

    }




  return (
    <section className='w-full   py-20 bg-gradient-to-t from-[#8780FF]/40 to-[#ffffff]' >
         

        <div className='w-full mx-auto container flex flex-col justify-center items-center  px-20 max-lg:px-12'>
        <h2 className='font-poppins text-3xl text-center '>Have a question? <br/>
        Ask Outsource Accounting!</h2>


        <form className= 'w-full   max-w-[700px]  py-24 max-lg:py-12 grid grid-cols-2 max-lg:grid-cols-1 gap-6 max-lg:gap-2 text-center font-Inter ' action={formActionHandler} ref={formRef}>
            <div className='w-full'>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-start w-full">
                Your Name
              </label>
              <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 border-none outline-none focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2  sm:text-sm sm:leading-6"
                />
            </div>

            <div className='w-full'>
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900 text-start w-full ">
                Phone Number
              </label>
              <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>

            <div>
            
            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 text-start w-full">
                Company {inValidArray.includes('company') && <span className='text-red-500 animate-pulse ml-2'> Required</span>}
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
                Email {inValidArray.includes('email') && <span className='text-red-500 animate-pulse ml-2'> Required</span>}
              </label>
              <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6C63FF] px-2 sm:text-sm sm:leading-6 border-none outline-none"
                />
            </div>










            <div className='col-span-2 max-lg:col-span-1'>
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




            <div className='col-span-2 max-lg:col-span-1 max-lg:mt-2'>
           <FormBtn />
           

            </div>


            <div className='col-span-2 max-lg:col-span-1'>
          
           {state.success && <span className='font-Inter text-green-500 text-center py-8 mt-8  w-full'>{state.message}</span>}

            </div>
        </form>




        <h4 className='font-Inter text-lg text-gray-600 max-lg:text-base max-lg:text-center '>
        Send us a message! Let’s get the show on the road!
        </h4>
        </div>
        
    </section>
  )
}

export default Form;