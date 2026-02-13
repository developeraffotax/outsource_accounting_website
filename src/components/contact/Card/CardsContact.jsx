const CardsContact = ({ img, title, description, details }) => {
  return (
    <div className="flex flex-col md:flex-row border border-purple-200 rounded-2xl p-3 md:p-6 lg:p-8 my-2 md:my-4 w-full">
      <div className="mr-4">
        <img
          src={img}
          alt=""
          className="h-8 w-8 md:w-12 md:h-12 mb-2 md:mb-0"
        />
      </div>
      <div>
        <h1 className=" font-normal md:font-semibold ">{title}</h1>
        <p className="font-light md:font-normal">{description}</p>
        <p className="font-normal lg:font-semibold whitespace-normal wrap-break-word overflow-wrap-anywhere">
          {details}
        </p>
      </div>
    </div>
  );
};
export default CardsContact;
