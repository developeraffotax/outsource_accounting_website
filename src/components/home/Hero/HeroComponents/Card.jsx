const Card = ({ imgComponent, title, content }) => {
  return (
    <div className="grid grid-rows-[1fr_1fr_2fr] mt-2 gap-3   min-w-30  lg:max-w-md border border-gray-300 p-6 rounded-lg shadow-md bg-white">
      <img src={imgComponent} alt={title} className="w-8 h-8 object-contain" />

      <h2 className="text-sm font-semibold text-neutral-800 wrap-break-word w-full">
        {title}
      </h2>

      <p className="text-xs text-neutral-600 leading-relaxed wrap-break-word w-full">
        {content}
      </p>
    </div>
  );
};
export default Card;
