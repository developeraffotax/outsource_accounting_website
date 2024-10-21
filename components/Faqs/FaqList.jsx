'use client'


import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { IoIosAddCircleOutline } from "react-icons/io";







const FAQS = [
    {
        q: 'What services do you offer?',
        a: `We offer comprehensive accounting services, including financial statement preparation, tax planning, auditing, bookkeeping, business consulting, payroll processing and financial planning for individuals, businesses and non-profit organizations.`,
        key: uuidv4()
    },

    {
        q: 'How do you protect client confidentiality?',
        a: `We maintain strict confidentiality through secure data storage, encryption, limited access and adherence to industry standards, ensuring sensitive information remains protected and confidential.`,
        key: uuidv4()
    },

    {
        q: 'Can you assist with tax planning and compliance?',
        a: `Yes, our experts provide comprehensive tax services, including planning, preparation, compliance and controversy resolution, minimizing tax liabilities and ensuring timely filings for individuals and businesses.`,
        key: uuidv4()
    },

    {
        q: 'Can I schedule a consultation or meeting?',
        a: `Yes, schedule a consultation or meeting by contacting us via phone, email or online form, we'll accommodate your schedule to discuss your accounting needs.`,
        key: uuidv4()
    },

    {
        q: 'Do you provide cloud-based accounting solutions?',
        a: `Yes, we offer cloud-based accounting solutions, providing secure, scalable and remote access to financial data, streamlining operations and enhancing collaboration.`,
        key: uuidv4()
    },

    {
        q: 'Can you help with budgeting and financial forecasting?',
        a: `Yes, our experts provide comprehensive budgeting and financial forecasting services, helping businesses and individuals create realistic plans, manage expenses and achieve long-term financial goals.`,
        key: uuidv4()
    },

    {
        q: 'How do you handle complex accounting issues?',
        a: `Our experienced team collaborates with industry experts to analyze and resolve complex accounting issues efficiently, providing innovative solutions and ensuring compliance with regulatory standards.
`,
        key: uuidv4()
    },

    {
        q: 'Can you help with accounts payable and accounts receivable?',
        a: `Yes, our experts efficiently manage accounts payable and accounts receivable, ensuring timely payments, accurate invoicing and optimized cash flow to maintain healthy financial operations`,
        key: uuidv4()
    },

    {
        q: 'Can you help with grant writing and non-profit accounting?',
        a: `Yes, our team provides expert grant writing and non-profit accounting services, including financial reporting, budgeting and compliance, to support mission-driven organizations.
`,
        key: uuidv4()
    },

    {
        q: 'Do you provide bookkeeping and accounting system setup?',
        a: `Yes, our experts set up and maintain accurate bookkeeping and accounting systems, including QuickBooks, Xero and other software, tailored to meet your business needs.`,
        key: uuidv4()
    },
]













































const FaqList = () => {


	const [active, setActive] = useState('')

	const accordionOnChangeHandler = (event) => {
		
		setActive(event[0])

	}
 

















	return (
		<section className="w-full px-80 max-2xl:px-40 max-xl:px-10 max-lg:p-8   mb-20 max-lg:mt-4 max-lg:mb-4  ">
				
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

















