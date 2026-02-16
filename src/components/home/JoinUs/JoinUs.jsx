import ContactUsButton from "@/components/shared/buttons/contactUsButton";
import Container from "@/components/wraper/Container";

const JoinUs = ({ bgImg }) => {
  return (
    <div className="relative mt-12 md:mt-24 h-64 md:h-auto overflow-hidden">
      <img
        src={bgImg}
        alt="LinkdinIcon"
        className="absolute inset-0 md:relative w-full h-full md:h-auto object-cover overlay-image bg-(--color-ImgOverlay) opacity-90"
      />
      <Container
        withYPadding={false}
        className="overlay-text absolute inset-0 flex flex-col justify-center items-center
      bg-opacity-50 "
      >
        <h2 className="text-xl md:text-2xl lg:text-4xl mb-4 text-white text-center max-w-160">
          Join thousands of business owners who trust Outsource Accounting!
        </h2>
        <ContactUsButton />
      </Container>
    </div>
  );
};

export default JoinUs;
