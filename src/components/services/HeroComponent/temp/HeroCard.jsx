import HeroDataProvider from "./HeroDataProvider.jsx";

const HeroCard = ({ title, img, paragraphOne, paragraphTwo, bgimg }) => {
  return (
    <div
      className="relative flex flex-row  md:justify-evenly
    border border-transparent rounded-2xl 
    mx-3 md:mx-8 lg:mx-44 2xl:mx-80 my-3 md:my-6 lg:my-12
    px-3 md:px-8 lg:px-8 py-2 md:py-6 lg:py-12"
    >
      {
        <img
          src={bgimg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover  -z-10"
        />
      }
      <div className="w-full md:w-1/2  text-black flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-snug md:max-w-120">
          {title}
        </h1>
        <div>
          <p className="hidden md:block mb-4 max-w-3/4">{paragraphOne}</p>
          <p className="hidden md:block mb-4 max-w-3/4"> {paragraphTwo} </p>
        </div>
        <div>
          <button>connect with us</button>
        </div>
      </div>
      <div>
        <img src={img} alt="" className="w-100 h-100" />
      </div>
    </div>
  );
};
export default HeroCard;
