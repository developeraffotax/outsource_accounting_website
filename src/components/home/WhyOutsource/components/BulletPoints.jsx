import BulletPoint from "./BulletPoint.jsx";

const BulletPoints = ({ points }) => {
  return (
    <div className="flex flex-col py-4">
      {points.map((point, index) => (
        <BulletPoint
          key={point.id || index}
          img={point.img}
          description={point.description}
        />
      ))}
    </div>
  );
};

export default BulletPoints;
