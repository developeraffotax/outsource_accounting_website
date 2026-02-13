"use client";
import { useState } from "react";
import { format } from "date-fns";
import DateTimePicker from "./components/DateTimePicker";
import Form from "./components/Form";
import { toast } from "react-toastify";
import axios from "axios";

const ContactForm = ({ onSuccess }) => {
  const [date, setDate] = useState();
  const [isSelected, setIsSelected] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [message, setMessage] = useState();
  const [isSending, setIsSending] = useState(false);

  const handleConfirm = () => {
    setIsConfirm(true);
  };

  const handledata = (data) => {
    setMessage(data);
  };

  const onSubmit = async () => {
    try {
      setIsSending(true);

      const meetingData = {
        date: date ? format(date, "PPP") : "Pick a Day",
        time: isSelected,
        Name: message.Name,
        email: message.email,
      };
      const res = await axios.post(`api/meeting`, meetingData);
      toast.success(res.data.message);

      // Wait for toast to be visible, then close modal
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (onSuccess) {
        onSuccess();
      }
      setIsSending(false);
    } catch (error) {
      console.log("error occued hero ", error);
      toast.error("failed to send message");
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto sm:max-h-9/10 lg:max-h-full lg:overflow-y-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <h2 className="text-2xl font-bold mb-6">
        Book a <span className="text-blue-600"> Meeting</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* left text  */}
        <div className="w-full  lg:w-2/5 ">
          <div className="hidden md:inline-block">
            <p className="text-sm md:text-base text-gray-600">
              Use this form to schedule a meeting with our team. Please select
              your preferred date and time and provide your contact details to
              confirm the appointment.
            </p>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col gap-2">
            <div className="my-3">
              <p className="text-blue-800 font-semibold">Day</p>
              {date ? format(date, "PPP") : "Pick a Day"}
            </div>
            <div className="my-3">
              <p className="text-blue-800 font-semibold">Time</p>
              {isSelected ? isSelected : "Select a Time"}
            </div>

            <div className="my-3">
              <p className="text-blue-800 font-semibold">Name</p>
              {message ? message.Name : "Enter Your Business Name"}
            </div>

            <div className="my-3">
              <p className="text-blue-800 font-semibold">Email</p>
              {message ? message.email : "Confirm Your Business Email"}
            </div>
          </div>

          {message && isSelected && date && (
            <button
              disabled={isSending}
              onClick={onSubmit}
              className={`flex self-end border rounded px-6 py-2 my-2 
                ${
                  isSending
                    ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                    : "bg-blue-800 border-blue-800 text-white"
                }`}
            >
              Send
            </button>
          )}
        </div>
        {/* Date and time picker */}
        <div className="w-full  lg:w-3/5 h-full lg:h-1/2 xl:h-8/9 flex flex-col justify-between">
          <DateTimePicker
            date={date}
            setDate={setDate}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />

          <Form formData={handledata} />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
