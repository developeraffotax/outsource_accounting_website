import React from "react";
import Hero from "./Hero";
import HowCanWe from "./HowCanWe";
import WhyOutsource from "./WhyOutsource/WhyOutsource";
import Cta from "./Cta";
import TrustedBy from "./TrustedBy";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <>
        <Hero />
        <HowCanWe />
        <WhyOutsource />
        <Cta />
        <TrustedBy />
        <Testimonials />
    </>
  )
};

export default Home;
