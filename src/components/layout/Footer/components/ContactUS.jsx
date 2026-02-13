import topBarQuery from "@/lib/data/topBarQuery";

const ContactUS = async () => {
  const res = await topBarQuery();
  const content = res.data.topBar;
  return (
    <ul className="font-light mt-4 lg:mt-8">
      <li className="mb-2 flex flex-nowrap items-center content-center">
        {" "}
        <img
          className="max-h-3 max-w-3 mr-2"
          src="/images/Footer/CallIcon.png"
          alt="CallIcon"
        />{" "}
        0208 144 6811
      </li>
      <li className="mb-2 flex flex-nowrap items-center content-center">
        {" "}
        <img
          src="/images/Footer/WhatsAppIcon.png"
          alt="WhatsAppIcon"
          className="max-h-3 max-w-3 mr-2"
        />{" "}
        <span className="flex-wrap"> {content.euNumber}</span>
      </li>
      <li className="mb-2 flex  items-center content-center">
        {" "}
        <img
          src="/images/Footer/MailIcon.png"
          alt="MailIcon"
          className="max-h-3 max-w-3 mr-2"
        />{" "}
        <span className="break-all"> {content.email}</span>
      </li>
      <li className="mb-2 flex items-center content-center max-w-48">
        {" "}
        <img
          src="/images/Footer/Location.png"
          alt="LocationIcon"
          className="max-h-3 max-w-3 mr-2"
        />
        61 Bridge Street, Kington, United Kingdom, HR5 3DJ
      </li>
    </ul>
  );
};
export default ContactUS;
