const BulletPoint = ({ img, description }) => {
  return (
    <div className="flex items-center my-2">
      <img src={img} alt="tickCircle" className="w-4 h-4 mr-2" />
      <p className="items-center justify-center font-light">{description}</p>
    </div>
  );
};

export default BulletPoint;
