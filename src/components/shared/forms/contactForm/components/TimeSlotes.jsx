"use client";
import { UTCDate } from "@date-fns/utc";
import { format, setHours, startOfDay } from "date-fns";
import TimeSlote from "./TimeSlote";

const TimeSlotes = ({ isSelected, setIsSelected }) => {
  const number = [];
  const utcToday = startOfDay(new UTCDate());

  for (let i = 0; i < 24; i++) {
    const utcDateForHours = format(setHours(utcToday, i), "HH");
    const localDateForHours = format(new Date(setHours(utcToday, i)), "HH");
    const obj = {
      key: i,
      isAvailable: true,
      utcHour: utcDateForHours,
      localHour: localDateForHours,
    };
    number.push(obj);
  }

  const target = [0, 1, 2, 3, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  target.forEach((item) => {
    if (number[item]) {
      number[item].isAvailable = false;
    }
  });

  const slots = number;

  return (
    <div className="flex flex-col w-full md:max-h-60  lg:max-h-75 2xl:max-h-100 gap-3 overflow-y-auto scrollbar-none  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {slots.map((item) => (
        <TimeSlote
          key={item.key}
          time={item.localHour}
          isAvailable={item.isAvailable}
          onSelect={() => setIsSelected(item.localHour)}
          isSelected={isSelected === item.localHour}
        />
      ))}
    </div>
  );
};

export default TimeSlotes;
