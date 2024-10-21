'use client'

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import { NextArrow } from "./NextArrow";
import { PrevArrow } from "./PrevArrow";

const Testimonials = () => {

    const  settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />

      };



  return (
    <section className="w-full container mx-auto px-20 py-16 ">

        <h2 className='w-full font-poppins text-3xl text-center mb-12'>Client Testimonials</h2>


        <div className='w-full '>

        <Slider {...settings} >
            <div className='w-full '>


                <div className='w-full flex justify-center items-center gap-4 ml-4'>
                    <div className='w-[55px]'>
                    <svg   viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.579987" y="0.210205" width="54" height="54" rx="6" fill="#6C63FF" fill-opacity="0.18"/> <path d="M18.83 37.7102C18.83 37.7102 17.08 37.7102 17.08 35.9602C17.08 34.2102 18.83 28.9602 27.58 28.9602C36.33 28.9602 38.08 34.2102 38.08 35.9602C38.08 37.7102 36.33 37.7102 36.33 37.7102H18.83ZM27.58 27.2102C28.9724 27.2102 30.3077 26.6571 31.2923 25.6725C32.2769 24.6879 32.83 23.3526 32.83 21.9602C32.83 20.5678 32.2769 19.2325 31.2923 18.2479C30.3077 17.2633 28.9724 16.7102 27.58 16.7102C26.1876 16.7102 24.8522 17.2633 23.8677 18.2479C22.8831 19.2325 22.33 20.5678 22.33 21.9602C22.33 23.3526 22.8831 24.6879 23.8677 25.6725C24.8522 26.6571 26.1876 27.2102 27.58 27.2102Z" fill="#6C63FF"/> </svg>
                    </div>
                    <div className=' flex flex-col justify-center items-start font-poppins'>
                        <h5 className='text-base '>Thompson Everdeen</h5>
                        <h6 className='text-sm text-[#6C63FF]' >Founder of Thompsons Boutique</h6>
                    </div>
                </div>



                <div className='w-full py-12 flex justify-center '>
                        <p className='w-full text-center  max-w-[700px] font-poppins text-gray-600 text-lg italic  '>Very professional and expert team. I am very satisfied with the exceptional service provided by Outsource Accounting. Would definitely purchase your services in the future.</p>
                </div>
            </div>





            <div className='w-full '>


                <div className='w-full flex justify-center items-center gap-4 ml-4'>
                    <div className='w-[55px]'>
                    <svg   viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.579987" y="0.210205" width="54" height="54" rx="6" fill="#6C63FF" fill-opacity="0.18"/> <path d="M18.83 37.7102C18.83 37.7102 17.08 37.7102 17.08 35.9602C17.08 34.2102 18.83 28.9602 27.58 28.9602C36.33 28.9602 38.08 34.2102 38.08 35.9602C38.08 37.7102 36.33 37.7102 36.33 37.7102H18.83ZM27.58 27.2102C28.9724 27.2102 30.3077 26.6571 31.2923 25.6725C32.2769 24.6879 32.83 23.3526 32.83 21.9602C32.83 20.5678 32.2769 19.2325 31.2923 18.2479C30.3077 17.2633 28.9724 16.7102 27.58 16.7102C26.1876 16.7102 24.8522 17.2633 23.8677 18.2479C22.8831 19.2325 22.33 20.5678 22.33 21.9602C22.33 23.3526 22.8831 24.6879 23.8677 25.6725C24.8522 26.6571 26.1876 27.2102 27.58 27.2102Z" fill="#6C63FF"/> </svg>
                    </div>
                    <div className=' flex flex-col justify-center items-start font-poppins'>
                        <h5 className='text-base '>Gemma Ros</h5>
                        <h6 className='text-sm text-[#6C63FF]' >GR H&S Consultants Ltd</h6>
                    </div>
                </div>



                <div className='w-full py-12 flex justify-center '>
                        <p className='w-full text-center  max-w-[700px] font-poppins text-gray-600 text-lg italic  '> I have never felt more confident about my finances than I do with outsource accounting services. Their personalized support is exceptional!
                        </p>
                </div>
            </div>







            <div className='w-full '>


                <div className='w-full flex justify-center items-center gap-4 ml-4'>
                    <div className='w-[55px]'>
                    <svg   viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.579987" y="0.210205" width="54" height="54" rx="6" fill="#6C63FF" fill-opacity="0.18"/> <path d="M18.83 37.7102C18.83 37.7102 17.08 37.7102 17.08 35.9602C17.08 34.2102 18.83 28.9602 27.58 28.9602C36.33 28.9602 38.08 34.2102 38.08 35.9602C38.08 37.7102 36.33 37.7102 36.33 37.7102H18.83ZM27.58 27.2102C28.9724 27.2102 30.3077 26.6571 31.2923 25.6725C32.2769 24.6879 32.83 23.3526 32.83 21.9602C32.83 20.5678 32.2769 19.2325 31.2923 18.2479C30.3077 17.2633 28.9724 16.7102 27.58 16.7102C26.1876 16.7102 24.8522 17.2633 23.8677 18.2479C22.8831 19.2325 22.33 20.5678 22.33 21.9602C22.33 23.3526 22.8831 24.6879 23.8677 25.6725C24.8522 26.6571 26.1876 27.2102 27.58 27.2102Z" fill="#6C63FF"/> </svg>
                    </div>
                    <div className=' flex flex-col justify-center items-start font-poppins'>
                        <h5 className='text-base '>John Scarman</h5>
                        <h6 className='text-sm text-[#6C63FF]' >Founder of Amazilla Solutions Ltd</h6>
                    </div>
                </div>



                <div className='w-full py-12 flex justify-center '>
                        <p className='w-full text-center  max-w-[700px] font-poppins text-gray-600 text-lg italic  '>Self-assessment services from outsource are efficient and stress-free. Thorough, accurate guidance every step of the way - highly recommended!</p>
                </div>
            </div>

      
    </Slider>










        </div>

    </section>
  )
};

export default Testimonials;
