import { getContactInfo } from "@/lib/services/contactInfo.service";

const ContactUS = async () => {
  const content = await getContactInfo();

  return (
    <ul className="mt-4 space-y-2 font-light lg:mt-8">
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          className="mt-1 h-3 w-3 shrink-0"
          src="/images/Footer/CallIcon.png"
          alt="CallIcon"
        />
        <a className="whitespace-nowrap" href={content.telHref || "#"}>
          {content.number}
        </a>
      </li>
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          src="/images/Footer/WhatsAppIcon.png"
          alt="WhatsAppIcon"
          className="mt-1 h-3 w-3 shrink-0"
        />
        <a
          className="whitespace-nowrap"
          href={content.whatsappHref || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {content.euNumber}
        </a>
      </li>
      <li className="flex items-start gap-2 leading-relaxed">
        <img
          src="/images/Footer/MailIcon.png"
          alt="MailIcon"
          className="mt-1 h-3 w-3 shrink-0"
        />
        <a className="wrap-break-word" href={content.mailtoHref}>
          {content.email}
        </a>
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
