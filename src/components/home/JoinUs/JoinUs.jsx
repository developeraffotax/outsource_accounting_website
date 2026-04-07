import ContactUsButton from "@/components/shared/buttons/contactUsButton";
import Container from "@/components/wraper/Container";

const JoinUs = ({ bgImg }) => {
  return (
    <div className="relative mt-12 md:mt-24 h-64 md:h-96 lg:h-112 overflow-hidden">
      <img
        src={bgImg}
        alt="Join us background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-blue-600/30"
      />
      <Container
        withYPadding={false}
        className="overlay-text absolute inset-0 z-20 flex flex-col justify-center items-center"
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
