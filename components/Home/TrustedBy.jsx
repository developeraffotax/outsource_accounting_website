import React from "react";
import Image from "next/image";

import Logo1 from "@/public/trustedLogos/1.png";
import Logo2 from "@/public/trustedLogos/2.png";
import Logo3 from "@/public/trustedLogos/3.png";
import Logo4 from "@/public/trustedLogos/4.png";
import Logo5 from "@/public/trustedLogos/5.png";
import Logo6 from "@/public/trustedLogos/6.png";

import Logo7 from "@/public/trustedLogos/7.png";
import Logo8 from "@/public/trustedLogos/8.png";
import Logo9 from "@/public/trustedLogos/9.png";
import Logo10 from "@/public/trustedLogos/10.png";

const TrustedBy = () => {
  return (
<>    <section className="w-full container mx-auto px-20 py-16 max-lg:hidden block">
      <h2 className="w-full text-center font-poppins text-3xl mb-12 ">
        Trusted by
      </h2>

      <ul className="w-full flex justify-center items-center gap-12">
        <li> <Image alt="codelab" src={Logo1} /> </li>
        <li> <Image alt="ztos" src={Logo2} /> </li>
        <li> <Image alt="utosia" src={Logo3} /> </li>
        <li> <Image alt="amara" src={Logo4} /> </li>
        <li> <Image alt="fossa" src={Logo5} /> </li>
        <li> <Image alt="hexlab" src={Logo6} /> </li>
      </ul>

      <ul className="w-full flex justify-center items-center gap-12">
        <li> <Image alt="lightai" src={Logo7} /> </li>
        <li> <Image alt="atica" src={Logo8} /> </li>
        <li> <Image alt="kyan" src={Logo9} /> </li>
        <li> <Image alt="travica" src={Logo10} /> </li>
      </ul>
    </section>








        {/* For Mobile */}
  <section className="w-full container mx-auto px-8 py-12 lg:hidden block">
      <h2 className="w-full text-center font-poppins text-3xl mb-12 ">
        Trusted by
      </h2>

      <ul className="w-full grid grid-cols-2   place-items-center  gap-8">
        <li className="border-b"> <Image alt="codelab" src={Logo1} /> </li>
        <li className="border-b"> <Image alt="ztos" src={Logo2} /> </li>
        <li className="border-b"> <Image alt="utosia" src={Logo3} /> </li>
        <li className="border-b"> <Image alt="amara" src={Logo4} /> </li>
        <li className="border-b"> <Image alt="fossa" src={Logo5} /> </li>
        <li className="border-b"> <Image alt="hexlab" src={Logo6} /> </li>
        <li className="border-b"> <Image alt="lightai" src={Logo7} /> </li>
        <li className="border-b"> <Image alt="atica" src={Logo8} /> </li>
        <li className="border-b"> <Image alt="kyan" src={Logo9} /> </li>
        <li className="border-b"> <Image alt="travica" src={Logo10} /> </li>
      </ul>


     



    
    </section>
    </>
  );
};

export default TrustedBy;
