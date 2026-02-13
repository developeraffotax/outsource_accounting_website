import ContactUsButton from "@/components/shared/buttons/contactUsButton";

const JoinUs = ({ bgImg }) => {
  return (
    <div className="relative my-24">
      <img
        src={bgImg}
        alt="LinkdinIcon"
        className="h-auto w-full overlay-image bg-(--color-ImgOverlay) opacity-90"
      />
      <div
        className="overlay-text absolute inset-0 flex flex-col justify-center items-center
      bg-opacity-50 p-4"
      >
        <h2 className="text md:text-2xl lg:text-4xl mb-4 text-white text-center max-w-160">
          Join thousands of business owners who trust Outsource Accounting!
        </h2>
        <ContactUsButton />
      </div>
    </div>
  );
};

export default JoinUs;
