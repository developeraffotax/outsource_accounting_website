import Image from "next/image";
import React from "react";

const ImageWithText = ({imageSrc, imagePosition, heading, content}) => {

    

  return (
    <li className={`w-full flex ${imagePosition === 'Left' ? 'flex-row' : 'flex-row-reverse'}  justify-center  items-start gap-16 py-12`}>
        
        <div className='w-[50%] max-w-[500px]'>
            <Image alt={heading + '-image'} src={imageSrc}    className='w-full'/>
        </div>


            <div className='  text-start  w-[50%] max-w-[500px]'>
                <h3  className='font-poppins text-2xl mb-4'>{heading}</h3>
                <p className='font-Inter'>{content}</p>
            </div>


    </li>
  )
};

export default ImageWithText;
