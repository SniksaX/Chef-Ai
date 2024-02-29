import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { Input } from "../ui/input";

interface EventFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function EventForm({ setAllData }: EventFormProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [otherEvent, setOtherEvent] = useState("");

  const handleEventSelect = (event: string) => {
    setSelectedEvent(event);
  };

  const handleOtherEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherEvent(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otherEvent.trim() !== "") {
      e.preventDefault();
      setSelectedEvent(otherEvent);
      setOtherEvent("");
    }
  };

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      EventData: selectedEvent ? [selectedEvent] : [],
    }));
  }, [selectedEvent, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">6. Cooking for an Event?</h2>
      <div className="mb-4">
        {[
          "St Valentine's",
          "Christmas",
          "Anniversary",
          "Thanksgiving",
          "Ramadan",
          "Eid",
        ].map((event) => (
          <Button
            key={event}
            variant="ghost"
            className={selectedEvent === event ? "selected" : ""}
            onClick={() => handleEventSelect(event)}
          >
            {event}
          </Button>
        ))}
        {selectedEvent &&
          ![
            "St Valentine's",
            "Christmas",
            "Anniversary",
            "Thanksgiving",
            "Ramadan",
            "Eid",
          ].includes(selectedEvent) && (
            <Button variant="ghost" className="selected">
              {selectedEvent}
            </Button>
          )}
      </div>
      <Input
        placeholder="Other Event Type"
        value={otherEvent}
        onChange={handleOtherEventChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
