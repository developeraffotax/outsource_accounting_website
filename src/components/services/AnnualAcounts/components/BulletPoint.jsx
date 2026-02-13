import React from "react";
import BulletPoints from "./BulletPoints";

const BulletPoint = ({ index, img, description, title }) => {
  return (
    <div className="flex items-center my-2">
      <img src={img} alt="tickCircle" className="w-6 h-6 mr-2" />
      <p className="items-center justify-center font-light">
        {" "}
        <span className="font-semibold">{title}</span> {description}
      </p>
    </div>
  );
};

export default BulletPoint;
