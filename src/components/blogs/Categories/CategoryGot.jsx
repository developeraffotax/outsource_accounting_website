import Category from "./category/Categry";

const CategoryGot = () => {
  return (
    <div className="mx-6 md:mx-12 my-6 md:my-12 lg:my-24">
      <h1 className="text-center lg:text-start font-semibold lg:text-4xl md:text-3xl text-2xl my-3 md:my-6 lg:my-12 lg:my-0">
        Categories
      </h1>
      <Category />
    </div>
  );
};

export default CategoryGot;
