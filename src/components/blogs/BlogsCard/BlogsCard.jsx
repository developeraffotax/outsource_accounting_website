import BlogsCardSingle from "./blogsCardSingle/BlogsCardSingle";

const BlogsCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center content-center lg:justify-between my-6 md:my-12 lg:my-20">
      <BlogsCardSingle />
    </div>
  );
};
export default BlogsCard;
