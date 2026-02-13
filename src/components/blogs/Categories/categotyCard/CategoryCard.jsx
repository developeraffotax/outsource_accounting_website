import Category from "../category/Categry";

const CategoryCard = ({ index, categoryName }) => {
  return (
    <div className="border border-solid  border-black shadow-2xs px-6 py-1 mr-6 my-2">
      {categoryName}
    </div>
  );
};

export default CategoryCard;
