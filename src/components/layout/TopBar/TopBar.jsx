import topBarQuery from "@/lib/data/topBarQuery";

const TopBar = async () => {
  const res = await topBarQuery();
  const content = res.data.topBar;

  if (!content) return <p>their is no data to show</p>;
  return (
    <div className="w-full bg-(--color-veryLightBlue) text-gray-800 text-xs flex items-center px-3 sm:px-8 md:px-12 lg:px-25 z-1001 flex-wrap xl:px-44 py-2">
      <div className="flex items-center ml-auto pb-1 pt-1 flex-wrap justify-center">
        <div className="contact-item pt-1 pb-1 mr-4 flex items-center">
          <img
            src="/images/NavbarTopBar/TopBar/MailIcon.png"
            alt="mail"
            className="icon p-1"
          />
          <a
            className="value text-nowrap"
            href="mailto:admin@outsourceaccountings.co.uk"
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
          <a className="value text-nowrap" href="tel:+442081446811">
            {content.number}
          </a>
        </div>
        <div className="contact-item pt-1 pb-1 flex items-center ">
          <img
            src="/images/NavbarTopBar/TopBar/WhatsappIcon.png"
            alt="whatsapp"
            className="icon p-1"
          />
          <a className="value text-nowrap" href="https://wa.me/447723143223">
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
    </div>
  );
};

export default TopBar;
