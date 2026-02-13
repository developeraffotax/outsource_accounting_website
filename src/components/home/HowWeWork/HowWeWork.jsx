const HowWeWork = ({
  heading,
  one,
  oneIcon,
  description,
  lineOne,
  two,
  twoIcon,
  titletwo,
  descriptiontwo,
  lineTwo,
  three,
  threeIcon,
  threeTitle,
  threeDescription,
}) => {
  return (
    <div className="px-3 md:px-8 lg:px-44 2xl:px-70 py-12 w-full">
      <h1 className="text-center font-bold text-3xl mb-16 text-gray-800">
        {heading}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-2 mx-auto w-full lg:w-5xl font-light items-start">
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <p
            alt="Submission Icon"
            className="absolute w-8 h-8 border rounded-full border-gray-300 bg-gray-200 text-center items-center justify-center font-light  object-contain"
          >
            {one}
          </p>
          <img
            src={oneIcon}
            alt="Service Icon"
            className="w-2/3 aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-8 mb-6 object-contain self-center"
          />

          <h2 className="font-semibold mb-3 text-lg ">Choose Your Service</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <img src={lineOne} alt="" className="my-8 hidden md:inline-block" />
        {/* Card 2 */}
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <p
            alt="Submission Icon"
            className="absolute w-8 h-8 border rounded-full border-gray-300 bg-gray-200 text-center items-center justify-center font-light  object-contain"
          >
            {two}
          </p>
          <img
            src={twoIcon}
            alt="Info Icon"
            className="w-2/3 aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-8 mb-6 object-contain self-center"
          />
          <h2 className="font-semibold mb-3 text-lg ">{titletwo}</h2>
          <p className="text-gray-600">{descriptiontwo}</p>
        </div>
        <img src={lineTwo} alt="" className="my-12 hidden md:inline-block" />
        {/* Card 3 */}
        <div className="relative flex flex-col text-center bg-white rounded-2xl h-full ">
          <p
            alt="Submission Icon"
            className="absolute w-8 h-8 border rounded-full border-gray-300 bg-gray-200 text-center items-center justify-center font-light  object-contain"
          >
            {three}
          </p>
          <img
            src={threeIcon}
            alt="Submission Icon"
            className="w-2/3 aspect-square max-w-50 border rounded-full border-gray-600 shadow-2xl p-8 mb-6 object-contain self-center"
          />
          <h2 className="font-semibold mb-3 text-lg ">{threeTitle}</h2>
          <p className="text-gray-600">{threeDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
