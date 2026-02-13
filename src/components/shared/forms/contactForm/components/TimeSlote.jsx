import { Button } from "@/components/ui/button";

const TimeSlote = ({ time, isAvailable, isSelected, onSelect }) => {
  return (
    <Button
      onClick={onSelect}
      variant="outline"
      disabled={!isAvailable}
      className={`flex flex-row mr-2 w-full h-12 border-blue-800 hover:bg-blue-50 transition${
        !isAvailable ? " opacity-50" : " cursor-pointer"
      } ${isSelected ? "bg-blue-800 text-white" : ""}`}
    >
      {time}
      {/* {suffix} */}
    </Button>
  );
};

export default TimeSlote;
