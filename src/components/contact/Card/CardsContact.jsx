const CardsContact = ({ img, title, description, details }) => {
  return (
    <div className="flex items-start gap-3 md:gap-4 border border-purple-200 rounded-2xl p-3 md:p-6 lg:p-8 my-2 md:my-4 w-full">
      <div className="shrink-0">
        <img
          src={img}
          alt=""
          className="h-8 w-8 md:w-12 md:h-12 mb-2 md:mb-0"
        />
      </div>
      <div className="min-w-0">
        <h1 className="font-normal md:font-semibold wrap-break-word">
          {title}
        </h1>
        <p className="font-light md:font-normal wrap-break-word">
          {description}
        </p>
        <p className="font-normal lg:font-semibold wrap-break-word">
          {details}
        </p>
      </div>
    </div>
  );
};
export default CardsContact;
