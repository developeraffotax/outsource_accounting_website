export const metadata = {
  title: "Accounting & Tax Blog",
  description:
    "Stay informed with the latest accounting, tax, and finance insights from our expert team. Tips, guides, and updates for UK businesses and sole traders.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Accounting & Tax Blog | Outsource Accounting",
    description:
      "Stay informed with the latest accounting, tax, and finance insights from our expert team. Tips, guides, and updates for UK businesses and sole traders.",
    url: "/blogs",
  },
};

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
