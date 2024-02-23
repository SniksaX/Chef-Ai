"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface ToolsFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function ToolsForm({
  onNext,
  setAllData,
  onPrev,
}: ToolsFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedTools, setCheckedTools] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    // Compile checked tools into a string
    const toolsArray = Object.entries(checkedTools)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) toolsArray.push(othersText.trim());
    const toolsString = toolsArray.join(", ");

    // Update allData
    setAllData((prevData) => ({
      ...prevData,
      ToolsData: toolsString,
    }));

    onNext(); // Proceed to the next step
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedTools((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">
        What tools you have at your disposal ?
      </h2>
      <p className="text-sm mb-6">
        {" "}
        If none is selected the recipe will be random.
      </p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="stove"
              checked={checkedTools["stove"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("stove", checked)
              }
            />
            <span>Stove</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="oven"
              checked={checkedTools["oven"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("oven", checked)
              }
            />
            <span>Oven</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="microwave"
              checked={checkedTools["microwave"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("microwave", checked)
              }
            />
            <span>microwave</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="airfryer"
              checked={checkedTools["airfryer"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("airfryer", checked)
              }
            />
            <span>Airfryer</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="blender"
              checked={checkedTools["blender"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("blender", checked)
              }
            />
            <span>Blender</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="bbq"
              checked={checkedTools["bbq"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("bbq", checked)
              }
            />
            <span>BBQ</span>
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
              placeholder="Please specify your tools"
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
