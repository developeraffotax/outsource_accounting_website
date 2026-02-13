import HeroBlogs from "@/components/blogs/HeroBlog";
import CategoryGot from "@/components/blogs/Categories/CategoryGot";
import BlogsCard from "@/components/blogs/BlogsCard/BlogsCard";

export default function blogs() {
  return (
    <>
      <HeroBlogs />
      <CategoryGot />
      <BlogsCard />
    </>
  );
}
