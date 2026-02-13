const Card = ({ img, title, description }) => {
  return (
    <div className="border border-transparent w-full md:max-w-2/8 p-3 md:p-6 lg:p-8 ">
      <img src={img} alt="" className="mb-2" />
      <h1 className="text-wrap mb-2">{title}</h1>
      <p className="text-wrap mb-2">{description}</p>
    </div>
  );
};
export default Card;
