const Modeltwo = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-101 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 w-full"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl relative overflow-hidden w-3/4 h-4/5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-3 shrink-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="px-6 pb-6 flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
};

export default Modeltwo;
