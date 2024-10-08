"use server";

import { getFormData } from "@/lib/getFormData";
import sendInstantQuoteMail from "@/lib/sendInstantQuoteMail";
import sendMail from "@/lib/sendMail";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";


//  SEND MESSAGE

export async function sendMessage(prevState, formData) {
	const { name, email, service, message } = getFormData( formData, "name", "email", "service", "message" );
	try {
		const res = await sendMail(name, email, service, message);

		if (res) {
                        return { success: true, message: `Your query is submitted | We'll get back to you soon`, };
                }

		
	} catch (error) {
		return { success: false, message: "Error occured while sending email | Please try again later", };
		//redirect('/contact-us?success=false')

	}
	//redirect('/contact-us?success=true')
}





