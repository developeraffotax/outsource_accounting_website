import { UTCDate } from "@date-fns/utc";
import { format, roundToNearestMinutes, startOfDay, setHours } from "date-fns";
import TimeSlotes from "../TimeSlotes";

export default function TimeTest() {
  let date = new UTCDate(new Date(Date.now())); //utc time
  console.log(date);

  let localTime = new Date(date.getTime()); //local time

  const utchour = format(roundToNearestMinutes(date, { nearestTo: 30 }), "HH"); //utc hour
  console.log(utchour);

  const localHour = format(
    roundToNearestMinutes(localTime, { nearestTo: 30 }),
    "HH"
  ); //local hour

  console.log(localHour);

  const currentHour = parseInt(localHour);

  const number = []; //hour static
  const utcToday = startOfDay(new UTCDate());

  console.log(`${utcToday}`);
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

  const target = [0, 1, 2, 3, 15, 16, 17, 18, 19, 20, 21, 22, 23]; //not available
  target.forEach((item) => {
    if (number[item]) {
      number[item].isAvailable = false;
    }
  });

  console.log(number);

  return (
    <div
      style={{ maxHeight: "400px" }}
      className="flex flex-col w-full gap-3 overflow-y-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <TimeSlotes
        isAvailable={number.isAvailable}
        utcHour={utchour}
        localHour={localHour}
      />
      {/* {number.map((item, index) => {
        const { isAvailable, utcHour, localHour } = item;
        const hour = parseInt(localHour);
        let displayHour = hour;
        let suffix = "AM";
        if (hour === 0) {
          displayHour = 12;
          suffix = "AM";
        } else if (hour < 12) {
          suffix = "AM";
        } else if (hour === 12) {
          suffix = "PM";
        } else {
          displayHour = hour - 12;
          suffix = "PM";
        }
        const formattedTime = `${displayHour}:00 ${suffix}`;
        return (
          <div>
            {/* <button
              key={item.key}
              variant="outline"
              disabled={!isAvailable}
              className="flex w-full h-12 gap-3 border-blue-800 hover:bg-blue-50 transition"
            >
              {formattedTime}
            </button> 
            
          </div>
        );
      })} */}
    </div>
  );
}

// print 24 hours in utc
// give each hour proporty isAvialable(BOOL)
