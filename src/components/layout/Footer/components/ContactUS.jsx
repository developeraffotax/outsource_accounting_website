import topBarQuery from "@/lib/data/topBarQuery";

const ContactUS = async () => {
  const fallbackContent = {
    email: "admin@outsourceaccountings.co.uk",
    euNumber: "+44 7802 611110",
  };

  let content = fallbackContent;

  try {
    const res = await topBarQuery();
    if (res?.data?.topBar) {
      content = {
        ...fallbackContent,
        ...res.data.topBar,
      };
    }
  } catch (error) {
    console.error("Failed to load footer contact data:", error);
  }

  return (
    <ul className="mt-4 space-y-2 font-light lg:mt-8">
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          className="mt-1 h-3 w-3 shrink-0"
          src="/images/Footer/CallIcon.png"
          alt="CallIcon"
        />
        <span className="whitespace-nowrap">0208 144 6811</span>
      </li>
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          src="/images/Footer/WhatsAppIcon.png"
          alt="WhatsAppIcon"
          className="mt-1 h-3 w-3 shrink-0"
        />
        <span className="whitespace-nowrap">{content.euNumber}</span>
      </li>
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          src="/images/Footer/MailIcon.png"
          alt="MailIcon"
          className="mt-1 h-3 w-3 shrink-0"
        />
        <span className="wrap-break-word">{content.email}</span>
      </li>
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          src="/images/Footer/Location.png"
          alt="LocationIcon"
          className="mt-1 h-3 w-3 shrink-0"
        />
        <span className="max-w-[20rem]">
          61 Bridge Street, Kington, United Kingdom, HR5 3DJ
        </span>
      </li>
    </ul>
  );
};
export default ContactUS;
