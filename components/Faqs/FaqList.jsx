'use client'


import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { IoIosAddCircleOutline } from "react-icons/io";







const FAQS = [
    {
        q: 'How do you select specialists according to the needs of the client?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'Do you do project-based work?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'Is it difficult to work with a remote accountant?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'How do you form your prices?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'Can I change my dedicated accountant?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'Can I have a discount?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'How can I contact Outsource Accounting?',
        a: 'I dont know right now!',
        key: uuidv4()
    },

    {
        q: 'What kind of services do you provide online?',
        a: 'I dont know right now!',
        key: uuidv4()
    },
]













































const FaqList = () => {


	const [active, setActive] = useState('')

	const accordionOnChangeHandler = (event) => {
		
		setActive(event[0])

	}
 

















	return (
		<section className="w-full px-80 max-2xl:px-40 max-xl:px-10 max-lg:p-8  mt-20 mb-20 max-lg:mt-4 max-lg:mb-4  ">
				
			<div className="container mx-auto    py-4 px-4 max-lg:px-0  rounded-3xl w-[70%] max-lg:w-full   mt-4">



					
<Accordion allowZeroExpanded onChange={accordionOnChangeHandler}>
    {FAQS.map((item) => (
        <AccordionItem key={item.key} uuid={item.key} className="mb-4 ">
            <AccordionItemHeading>
                <AccordionItemButton>
                   <div className={`flex justify-start  items-center max-lg:items-center      gap-2   font-Inter  text-lg max-lg:text-base  leading-relaxed border-b    w-full cursor-pointer select-none     px-4 py-4   transition-all duration-300  `}>
					
				   <IoIosAddCircleOutline className={`${item.key === active ? 'rotate-45  ' : ''} transition-all  duration-300 text-2xl text-[#8780FF] w-[5%] max-lg:w-[10%] `}/> <span className=" w-[90%]">{item.q}</span>
				   </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="    ">
             


				
			
                    <p className=" w-full font-Inter text-base  bg-gray-50   rounded-b-lg  px-8 py-4 text-slate-800    ">

                        {item.a}
                    </p>


				
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>


			</div>
		</section>
	);
};

export default FaqList;

















