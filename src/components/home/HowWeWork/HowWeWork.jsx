const HowWeWork = ({
  heading,
  oneIcon,
  description,
  lineOne,
  twoIcon,
  titletwo,
  descriptiontwo,
  lineTwo,
  threeIcon,
  threeTitle,
  threeDescription,
}) => {
  return (
    <div className="px-3 md:px-8 lg:px-44 2xl:px-80 py-12 w-full">
      <h1 className="text-center font-bold text-3xl mb-16 text-gray-800">
        {heading}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_.5fr_1fr_.5fr_1fr] gap-x-0 gap-y-2 mx-auto w-full xl:w-5/6 2xl:w-4/5 font-light items-start">
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <img
            src={oneIcon}
            alt="Service Icon"
            className="w-1/3 md:w-2/3 aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-10 mb-6 object-contain self-center"
          />

          <h2 className="font-semibold mb-3 text-lg ">Choose Your Service</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <img
          src={lineOne}
          alt=""
          className="hidden md:block self-start justify-self-center mt-20 -translate-y-1/2 relative z-20"
        />
        {/* Card 2 */}
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <img
            src={twoIcon}
            alt="Info Icon"
            className="w-1/3 md:w-2/3  aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-10 mb-6 object-contain self-center"
          />
          <h2 className="font-semibold mb-3 text-lg ">{titletwo}</h2>
          <p className="text-gray-600">{descriptiontwo}</p>
        </div>
        <img
          src={lineTwo}
          alt=""
          className="hidden md:block self-start justify-self-center mt-20 -translate-y-1/2 relative z-20"
        />
        {/* Card 3 */}
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <img
            src={threeIcon}
            alt="Submission Icon"
            className="w-1/3 md:w-2/3  aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-10 mb-6 object-contain self-center"
          />
          <h2 className="font-semibold mb-3 text-lg ">{threeTitle}</h2>
          <p className="text-gray-600">{threeDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
