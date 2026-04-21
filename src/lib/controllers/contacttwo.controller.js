import { sendAutoMailTwo } from "@/lib/services/emailTwo.services.js";

const validateContactTwoPayload = (val) => {
  const { fullname, companyName, email, serviceType, message } = val;
  return (
    typeof val.fullname === "string" &&
    fullname.trim() !== "" &&
    typeof val.companyName === "string" &&
    companyName.trim() !== "" &&
    typeof val.email === "string" &&
    email.trim() !== "" &&
    typeof val.serviceType === "string" &&
    serviceType.trim() !== "" &&
    typeof val.message === "string" &&
    message.trim() !== ""
  );
};

const processContactTwoRequest = async (val) => {
  if (!validateContactTwoPayload(val)) {
    return { status: 400, body: { error: "All Fields are required" } };
  }

  await sendAutoMailTwo(val);
  return { status: 200, body: { message: "Success" } };
};

const contacttwo = async (req, res) => {
  const result = await processContactTwoRequest(req.body);
  return res.status(result.status).json(result.body);
};

export { contacttwo, processContactTwoRequest };
