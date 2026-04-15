const QuoteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-(--color-buttonBlue) cursor-pointer px-8 py-2 text-white font-normal border-2 rounded-sm border-transparent inline-flex transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:brightness-110 hover:shadow-lg hover:ring-3 hover:ring-(--color-buttonBlue)/20 active:scale-90 active:duration-50"
    >
      Get a Quote
    </button>
  );
};
export default QuoteButton;
