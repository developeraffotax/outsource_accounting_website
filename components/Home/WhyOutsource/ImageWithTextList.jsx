import React from "react";
import homepageWhyOutsource1 from '@/public/homepageWhyOutsource1.png'
import homepageWhyOutsource2 from '@/public/homepageWhyOutsource2.png'
import homepageWhyOutsource3 from '@/public/homepageWhyOutsource3.png'
import ImageWithText from "./ImageWithText";
import { v4 as uuidv4 } from "uuid";


const ImageWithTextList = () => {



    const ImageWithTextArray = [
        {
            heading: 'One-on-One Expert Support',
            content: `You’ve got a team behind you! Our expert team of budget-friendly online accountants is set and raring to provide you with the one-on-one expert support your business deserves. Whether you’re just kicking off, running a tight ship, or a seasoned pro, we are locked and loaded to guide you through the complexities of UK accounting and tax filing. With our hands- on vibe, we make sure you’re savvy enough to make sound financial moves. Cheers to your success!`,
            imageSrc: homepageWhyOutsource1,
            imagePosition: 'Left',
            key: uuidv4()
        },

        {
            heading: 'Powerful Financial Reporting',
            content: `At Outsource Accounting, we don’t just dish out basic figures; we serve up insightful financial reports that’ll have you play your cards right. Our financial reporting comes with transparency that’s as clear as the King’s English, giving you the lowdown on your bread and honey. `,
            imageSrc: homepageWhyOutsource2,
            imagePosition: 'Right',
            key: uuidv4()

        },

        {
            heading: 'Affordable Flat-Rate Pricing',
            content: `Cheerio to those sneaky fees and surprise charges! Here at Outsource Accounting, we’re all about keeping it real with transparent and bang-on affordable flat-rate pricing. Whether you’re running a tiny mum-and-pop shop or a bloomin’ massive enterprise, our affordable accountants are a good samaritan for you. No monkey business, just straight-up fair deals, mate!`,
            imageSrc: homepageWhyOutsource3,
            imagePosition: 'Left',
            key: uuidv4()

        },
    ]














  return (
    <ul className='w-full '>
        {

            ImageWithTextArray.map((el) => {

                return <ImageWithText key={el.key} {...el} />



            })




        }
    </ul>
  )
};

export default ImageWithTextList;
