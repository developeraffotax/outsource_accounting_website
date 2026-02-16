const Card = ({ icon: Icon, title }) => {
  return (
    <div
      className="
      group
      bg-white
      rounded-2xl
      p-6
      flex flex-col items-center justify-center
      shadow-sm
      border border-gray-100
      hover:shadow-xl
      hover:-translate-y-2
      transition-all duration-300
      cursor-pointer
    "
    >
      {/* Icon Container */}
      <div
        className="
        w-14 h-14
        flex items-center justify-center
        rounded-xl
        bg-blue-100
        text-blue-600
        mb-4
        group-hover:bg-blue-600
        group-hover:text-white
        transition-all
      "
      >
        <Icon size={26} />
      </div>

      {/* Title */}
      <h3 className="text-gray-800 font-semibold text-center text-lg">
        {title}
      </h3>
    </div>
  );
};

export default Card;
