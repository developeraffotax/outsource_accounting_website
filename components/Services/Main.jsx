import CompanyFormation from '@/public/companyFormation.png'
import Bookkeeping from '@/public/bookkeeping.png'
import Accounts from '@/public/accounts.png'
import CorporationTax from '@/public/corporationTax.png'
import SelfAssessment from '@/public/selfAssessment.png'
import PayrollServices from '@/public/payrollServices.png'
import Vat from '@/public/vat.png'
import Image from 'next/image'

const Main = () => {


    const servicesArr = [
        {
            logo: CompanyFormation,
            title: 'Company Formation'
        },
        {
            logo: Bookkeeping,
            title: 'Bookkeeping'
        },
        {
            logo: Accounts,
            title: 'Accounts'
        },
        {
            logo: CorporationTax,
            title: 'Corporation Tax'
        },
        {
            logo: SelfAssessment,
            title: 'Self Assessment'
        },
        {
            logo: PayrollServices,
            title: 'Payroll services'
        },
        {
            logo: Vat,
            title: 'VAT'
        },
    ]




  return (
    <section className='px-20 mx-auto container '>

        <ul className='grid grid-cols-2 p-4 gap-16    '>

            {servicesArr.map((el) => {

                return <li key={el.title + 'services-main'} className='flex justify-start items-center gap-12 px-16 max-w-[600px] h-[300px] shadow-[rgba(0,0,15,0.15)_2px_2px_15px_0px] rounded-md cursor-pointer hover:scale-105 transition-all duration-500   group '>
                    
                    <Image src={el.logo} />
                    <h2 className='font-poppins   text-2xl group-hover:text-[#8780FF] transition-all duration-500 '>{el.title}</h2>

                </li>
            })}
            

        </ul>


    </section>
  )
}

export default Main