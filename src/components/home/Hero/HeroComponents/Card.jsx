const Card = ({ imgComponent, title, content }) => {
  return (
    <div className="flex flex-col justify-start items-center  gap-2   min-w-30  lg:max-w-md border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <div
        className="w-8 h-8 bg-blue-500"
        style={{
          WebkitMask: `url(${imgComponent}) no-repeat center`,
          mask: `url(${imgComponent}) no-repeat center`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />

      <h2 className="text-sm font-semibold text-center not-last-of-type: text-neutral-800 wrap-break-word w-full">
        {title}
      </h2>

      <p className="text-xs text-neutral-600 text-center    wrap-break-word w-full">
        {content}
      </p>
    </div>
  );
};
export default Card;
