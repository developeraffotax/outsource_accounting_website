import React from "react";
import buyService from "@/lib/data/buyService/buyService";
import BuyNowButton from "./buyNowBuutton";

const APICall = async ({ mobile = false }) => {
  const res = await buyService();

  // map Strapi response → frontend format
  const services =
    res?.data?.nameNprize?.map((item) => ({
      id: item.id,
      name: item.Name,
      price: item.Prize,
    })) || [];

  return <BuyNowButton services={services} mobile={mobile} />;
};

export default APICall;
