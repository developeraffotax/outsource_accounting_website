const Card = ({ title, icon, gradient }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
      <div
        className={`w-20 h-20 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
      >
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
        {title}
      </h2>
    </div>
  );
};

export default Card;
