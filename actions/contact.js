"use server";

import { getFormData } from "@/lib/getFormData";
import sendMail from "@/lib/sendMail";


//  SEND MESSAGE
export async function sendMessage(prevState, formData) {
  const { name, phoneNumber, company, email, question } = getFormData( formData, "name", "phoneNumber", "company", "email", "question" );


  try {
    const res = await sendMail(name, phoneNumber, company, email, question);

    if (res) {
		
      return { success: true, message: `Your query is submitted | We'll get back to you soon`, }
    }
  } catch (error) {
    return { success: false, message: "Error occured while sending email | Please try again later", }
  }
}
