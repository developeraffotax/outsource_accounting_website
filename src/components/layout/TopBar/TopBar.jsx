import Container from "@/components/wraper/Container";
import { getContactInfo } from "@/lib/services/contactInfo.service";

const TopBar = async () => {
  const content = await getContactInfo();
  return (
    <Container
      withYPadding={false}
      className="w-full bg-(--color-veryLightBlue) text-gray-800 text-xs flex items-center  z-1001 flex-wrap py-2"
    >
      <div className="flex items-center ml-auto pb-1 pt-1 flex-wrap justify-center">
        <div className="contact-item pt-1 pb-1 mr-4 flex items-center">
          <img
            src="/images/NavbarTopBar/TopBar/MailIcon.png"
            alt="mail"
            className="icon p-1"
          />
          <a
            className="value text-nowrap"
            href={content.mailtoHref}
          >
            {content.email}
          </a>
        </div>
        <div className="contact-item pt-1 pb-1 mr-4 flex items-center ">
          <img
            src="/images/NavbarTopBar/TopBar/CallIcon.png"
            alt="phone"
            className="icon p-1"
          />
          <a className="value text-nowrap" href={content.telHref || "#"}>
            {content.number}
          </a>
        </div>
        <div className="contact-item pt-1 pb-1 flex items-center ">
          <img
            src="/images/NavbarTopBar/TopBar/WhatsappIcon.png"
            alt="whatsapp"
            className="icon p-1"
          />
          <a
            className="value text-nowrap  font-medium transition-colors"
            href={content.whatsappHref || "#"}
            target="_blank"
            rel="noreferrer"
          >
            {content.euNumber}
          </a>
        </div>
      </div>
      {/*
      <div className=" lg:w-auto flex justify-center lg:justify-end mt-2 lg:mt-0">
        <a href="#" aria-label="Facebook" className="p-1 ">
          <img src={FacebookIcon} alt="Facebook" className="social" />
        </a>
        <a href="#" aria-label="Instagram" className="p-1 ">
          <img src={InstagramIcon} alt="Instagram" className="social" />
        </a>
        <a href="#" aria-label="Pinterest" className="p-1 ">
          <img src={PinterestIcon} alt="Pintest" className="social" />
        </a>
        <a href="#" aria-label="Twitter" className="p-1 ">
          <img src={PrimeTwitter} alt="Twitter" className="social" />
        </a>
        <a href="#" aria-label="LinkedIn" className="p-1 pr-0">
          <img src={LinkedInIcon} alt="LinkedIn" className="social" />
        </a>
      </div> */}
    </Container>
  );
};

export default TopBar;
