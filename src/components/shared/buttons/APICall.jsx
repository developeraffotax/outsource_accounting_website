import React from "react";
import buyService from "@/lib/data/buyService/buyService";
import BuyNowButton from "./buyNowBuutton";

const APICall = async ({ mobile = false }) => {
  const services = await buyService();

  return <BuyNowButton services={services} mobile={mobile} />;
};

export default APICall;
