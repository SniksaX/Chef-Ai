"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface EventFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function EventForm({
  onNext,
  setAllData,
  onPrev,
}: EventFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedEvent, setCheckedEvent] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    // Compile checked event into a string
    const eventArray = Object.entries(checkedEvent)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) eventArray.push(othersText.trim());
    const eventString = eventArray.join(", ");

    // Update allData
    setAllData((prevData) => ({
      ...prevData,
      EventData: eventString,
    }));

    onNext(); // Proceed to the next step
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedEvent((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">
        Are you cooking for an even ?
      </h2>
      <p className="text-sm mb-6">If no click Next.</p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="stvalentain"
              checked={checkedEvent["stvalentain"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("stvalentain", checked)
              }
            />
            <span>stvalentain</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="noel"
              checked={checkedEvent["noel"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("noel", checked)
              }
            />
            <span>Noel</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="anniv"
              checked={checkedEvent["anniv"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("anniv", checked)
              }
            />
            <span>Anniv</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="thanksgiving"
              checked={checkedEvent["thanksgiving"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("thanksgiving", checked)
              }
            />
            <span>Thanksgiving</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="ramadan"
              checked={checkedEvent["ramadan"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("ramadan", checked)
              }
            />
            <span>Ramadan</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="aid"
              checked={checkedEvent["aid"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("aid", checked)
              }
            />
            <span>Aid</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="others"
              checked={isOthersChecked}
              onCheckedChange={handleOthersCheckboxChange}
            />
            <span>Others</span>
          </label>
          {isOthersChecked && (
            <input
              type="text"
              className="mt-2 p-2 border rounded"
              placeholder="Please specify your event"
              value={othersText}
              onChange={(e) => setOthersText(e.target.value)}
            />
          )}
        </div>
        <div className="flex-row">
          <Button className="w-1/2" onClick={onPrev}>
            Back
          </Button>
          <Button className="w-1/2" onClick={onNextAndSaveData}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
