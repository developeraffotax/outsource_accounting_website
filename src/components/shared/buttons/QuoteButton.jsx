const QuoteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-(--color-buttonBlue) px-8 py-2 text-white font-normal border-2 rounded-sm border-transparent inline-flex"
    >
      Get a Quote
    </button>
  );
};
export default QuoteButton;
