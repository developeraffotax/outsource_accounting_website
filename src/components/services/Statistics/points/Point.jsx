const Point = ({ img, description, heading }) => {
  return (
    <li className="flex mb-3">
      <img src={img} alt="tickCircle" className="max-w-6 max-h-6 mr-2" />
      <h1 className="font-semi md:font-bold">
        {heading} <span className="font-normal">{description}</span>{" "}
      </h1>
    </li>
  );
};

export default Point;
