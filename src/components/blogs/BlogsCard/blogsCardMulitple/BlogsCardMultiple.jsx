const BlogsCardMultiple = ({ img, title, description, isFullRow }) => {
  return (
    <div
      className={`bg-purple-50 box-border flex flex-col h-full w-full
        ${isFullRow ? "md:flex-row md:items-center" : "md:flex-col"}`}
    >
      <img
        src={img}
        alt="img"
        className={`rounded object-cover w-full p-4
          ${isFullRow ? "md:w-1/2 h-48 md:h-auto" : "h-48"}`}
      />

      <div
        className={`flex flex-col justify-between h-full mt-4 md:mt-0 p-4
        ${isFullRow ? "md:ml-6 lg:ml-12" : "md:mx-2"}`}
      >
        <div>
          <p className="inline-block px-2 py-1 text-xs border rounded">
            Business tips
          </p>
        </div>

        <div className={isFullRow ? "text-left" : "text-center md:text-left"}>
          <h2 className="text-xl font-bold mt-2">{title}</h2>
          <p className="mt-1 text-sm text-gray-700">{description}</p>
        </div>

        <div className="flex justify-end w-full mt-4">
          <p className="text-xs border-b pb-1">May 12, 2024 | 5 min read</p>
        </div>
      </div>
    </div>
  );
};
export default BlogsCardMultiple;
