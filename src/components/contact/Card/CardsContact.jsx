const CardsContact = ({ img, title, description, details, href }) => {
  return (
    <div className="flex items-start gap-3 md:gap-4 border-b last:border-b-0 lg:border lg:last:border border-purple-200 lg:rounded-xl p-2 lg:p-4 px-6 my-1 lg:my-3 w-full">
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
        <p className="font-light md:font-normal wrap-break-word text-xs">
          {description}
        </p>
        <a
        href={`${href || "#"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal lg:font-semibold wrap-break-word hover:text-blue-800"
      >
        {details}
      </a>
      </div>
    </div>
  );
};
export default CardsContact;