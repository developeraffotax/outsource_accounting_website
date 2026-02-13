const Card = ({ index, img, title }) => {
  return (
    <div className="border border-gray-300 rounded-2xl px-6 py-2  flex flex-col w-full bg-linear-to-b from-blue-50 to-blue-200">
      <img src={img} alt="img" className="w-1/2 h-1/2 self-center" />
      <h1 className="text-center">{title}</h1>
    </div>
  );
};
export default Card;
