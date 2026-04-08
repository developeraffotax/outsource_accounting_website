const Card = ({ imgComponent, title, content }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-md">
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
