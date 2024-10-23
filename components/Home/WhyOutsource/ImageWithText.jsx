import Image from "next/image";
import React from "react";

const ImageWithText = ({imageSrc, imagePosition, heading, content}) => {

    

  return (
    <li className={`w-full flex ${imagePosition === 'Left' ? 'flex-row' : 'flex-row-reverse'} max-lg:flex-col  justify-center  items-start max-lg:items-center gap-16 max-lg:gap-4 py-12 max-lg:py-16 `}>
        
        <div className='w-[50%] max-w-[500px] max-lg:w-full '>
            <Image alt={heading + '-image'} src={imageSrc}    className='w-full'/>
        </div>


            <div className='  text-start  w-[50%] max-w-[500px] max-lg:w-full '>
                <h3  className='font-poppins font-semibold text-3xl mb-4 text-[#6C63FF]'>{heading}</h3>
                <p className='font-Inter text-lg'>{content}</p>
            </div>


    </li>
  )
};

export default ImageWithText;
