import Image from 'next/image'
import HeroImg from '@/public/contactUsHero.png'

import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";

const Main = () => {


    const contactArr = [
        {
            title: '0208 144 6811',
            content: 'Mon - Fri 10am - 8pm',
            logo: <FaPhone />,
            href:"tel:+0208 144 6811"
        },
        {
            title: '+44 7723 143223',
            content: 'Available 24/7',
            logo: <FaWhatsapp />,
            href:"https://wa.me/+447723143223"
        },
        {
            title: 'admin@outsourceaccountings.co.uk',
            content: 'Support & information',
            logo: <LuMail />,
            href:"mailto:admin@outsourceaccountings.co.uk"
        },
        {
            title: '61 Bridge Street, Kington, United Kingdom, HR5 3DJ',
            content: 'Office location',
            logo: <BsBuildings />,
            href:"https://maps.app.goo.gl/wvDhD8K4xEesUNqJ8"
        },
    ]



  return (
    <section className='flex justify-center items-end gap-16 px-20 mx-auto container '  >


        <div className=' max-w-[600px]  '>
            <h2 className='font-poppins text-2xl mb-16'>Professional accounting services are right here around the corner.</h2>
            <ul className=''>

                {
                   contactArr.map((el) => {

                    return <li key={el.title + 'contact-us-main'} className='flex justify-start items-center gap-6 mb-8'>

                        <div className='text-4xl text-[#8780FF] '>{el.logo}</div>
                        <div>
                            <a href={el.href} target='_blank'><h3 className='text-xl font-poppins hover:scale-[1.03] active:scale-[0.97] hover:text-[#8780FF] transition-all  '>{el.title}</h3></a>
                            <p className='text-sm text-gray-700 font-Inter '>{el.content}</p>
                        </div>
                    </li>
                   }) 
                }


            </ul>
        </div>
        <div className='mb-8'>
            <Image src={HeroImg} width={500}/>
        </div>

    </section>
  )
}

export default Main