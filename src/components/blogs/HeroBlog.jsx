import Container from "@/components/wraper/Container";

const HeroBlogs = () => {
  return (
    <Container
      withYPadding={false}
      className="flex flex-col justify-center items-center my-6 lg:my-12"
    >
      <div className="flex flex-col justify-center items-center content-center ">
        <h1 className="font-semibold text-3xl md:text-4xl">Our Blogs News</h1>
        <h2 className="my-3 md:my-6 font-serif text-2xl lg:text-3xl">
          Stay Update With the latest insights, trends, & experts tips in our
          recent blog posts, from industry news to practical guides
        </h2>
      </div>
    </Container>
  );
};
export default HeroBlogs;
