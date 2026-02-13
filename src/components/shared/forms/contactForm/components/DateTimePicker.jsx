"use client";
import { Calendar } from "@/components/ui/calendar";
import TimeSlotes from "./TimeSlotes";
import { isWeekend, startOfDay, isPast } from "date-fns";

const DateTimePicker = ({ date, setDate, isSelected, setIsSelected }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full lg:h-full 2xl:h-100">
      {/* date picker */}
      <div className="flex-1 lg:max-h-75">
        <h1 className="font-bold mb-4">Select Date & Time</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => {
            return isWeekend(date) || isPast(startOfDay(date));
          }}
          className="rounded-lg border max-w-7/9 2xl:max-w-9/10 w-full [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
        />
      </div>
      {/* time picker */}

      <div className="flex-1">
        <TimeSlotes isSelected={isSelected} setIsSelected={setIsSelected} />
      </div>
    </div>
  );
};

export default DateTimePicker;
