import BookACall from "../../../assets/images/serivePgsImg/BookACall/BookACall.png";
import contactperson from "../../../assets/images/serivePgsImg/BookACall/contactperson.svg";
import emailtyper from "../../../assets/images/serivePgsImg/BookACall/emailtyper.svg";
import phone from "../../../assets/images/serivePgsImg/BookACall/phone.svg";
import email from "../../../assets/images/serivePgsImg/BookACall/email.svg";
import topBarQuery from "@/lib/data/topBarQuery";

const FASolutions = async () => {
  const res = await topBarQuery();
  const content = res.data.topBar;

  return (
    <div className="relative flex flex-col items-center justify-center my-6 lg:my-12 overflow-hidden min-h-75">
      <img
        src={BookACall.src}
        alt="Book a call background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 p-6 md:p-12 lg:p-16 w-full lg:w-4/5 xl:w-3/4 mx-auto">
        <div className="flex-1 flex items-center gap-4 border border-transparent p-6 md:p-8 bg-white rounded-3xl shadow-lg">
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex shrink-0 items-center justify-center">
            <img
              src={contactperson.src}
              alt="contact"
              className="absolute h-12 w-12 md:h-16 md:w-16"
            />
            <img
              src={phone.src}
              alt="phone"
              className="absolute right-1 max-w-6 max-h-6 md:max-w-8 md:max-h-8"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">Feel free to contact</h1>
            <p className="text-gray-600">{content.euNumber}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 border border-transparent p-6 md:p-8 bg-white rounded-3xl shadow-lg">
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex shrink-0 items-center justify-center">
            <img
              src={emailtyper.src}
              alt="emailtyper"
              className="absolute h-12 w-12 md:h-16 md:w-16"
            />
            <img
              src={email.src}
              alt="email"
              className="absolute right-1 max-w-6 max-h-6 md:max-w-8 md:max-h-8"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">Email Us</h1>
            <p className="text-gray-600 break-all lg:break-normal">
              {content.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FASolutions;
