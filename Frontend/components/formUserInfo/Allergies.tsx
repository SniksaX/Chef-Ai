"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface AllergiesFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function AllergiesForm({
  onNext,
  setAllData,
  onPrev,
}: AllergiesFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedAllergies, setCheckedAllergies] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    // Compile checked allergies into a string
    const allergiesArray = Object.entries(checkedAllergies)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) allergiesArray.push(othersText.trim());
    const allergiesString = allergiesArray.join(", ");

    // Update allData
    setAllData((prevData) => ({
      ...prevData,
      AllergiesData: allergiesString,
    }));

    onNext(); // Proceed to the next step
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedAllergies((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">You have any allergies ?</h2>
      <p className="text-sm mb-6">If no click Next.</p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="eggs"
              checked={checkedAllergies["eggs"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("eggs", checked)
              }
            />
            <span>Eggs</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="milk-dairy"
              checked={checkedAllergies["milk-dairy"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("milk-dairy", checked)
              }
            />
            <span>Milk and Dairy</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="peanuts"
              checked={checkedAllergies["peanuts"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("peanuts", checked)
              }
            />
            <span>Peanuts</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="tree-nuts"
              checked={checkedAllergies["tree-nuts"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("tree-nuts", checked)
              }
            />
            <span>Tree nuts</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="fish"
              checked={checkedAllergies["fish"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("fish", checked)
              }
            />
            <span>Fish</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="soy"
              checked={checkedAllergies["soy"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("soy", checked)
              }
            />
            <span>Soy</span>
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
              placeholder="Please specify your allergies"
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
