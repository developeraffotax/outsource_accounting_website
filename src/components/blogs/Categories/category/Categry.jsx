import CategoryCard from "../categotyCard/CategoryCard";

const data = [
  {
    id: 1,
    categoryName: "Business Tips",
  },
  {
    id: 2,
    categoryName: "Company Officers",
  },

  {
    id: 3,
    categoryName: "Company Records",
  },
  {
    id: 4,
    categoryName: "Business News",
  },
  {
    id: 5,
    categoryName: "Company Names",
  },
  {
    id: 6,
    categoryName: "General Interest",
  },
  {
    id: 7,
    categoryName: "Business Startup",
  },
  {
    id: 8,
    categoryName: "Compliance & Legal",
  },
  {
    id: 9,
    categoryName: "Business Tips & Advice",
  },
  {
    id: 10,
    categoryName: "Finance & Tax",
  },
  {
    id: 11,
    categoryName: "Companies House",
  },
  {
    id: 12,
    categoryName: "Company Filings",
  },
  {
    id: 13,
    categoryName: "Company Addresses",
  },
  {
    id: 14,
    categoryName: "Shares & Shareholders",
  },
  {
    id: 15,
    categoryName: "Significant Control",
  },
];

const Category = () => {
  return (
    <div className="flex flex-wrap relative w-full  mt-4 md:mt-0">
      {data.map((categories, index) => {
        const { id, categoryName } = categories;

        return <CategoryCard key={id} categoryName={categoryName} />;
      })}
    </div>
  );
};

export default Category;
