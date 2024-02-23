"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface MealTypeFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function MealTypeForm({
  onNext,
  setAllData,
  onPrev,
}: MealTypeFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedMealType, setCheckedMealType] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    // Compile checked mealType into a string
    const mealTypeArray = Object.entries(checkedMealType)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) mealTypeArray.push(othersText.trim());
    const mealTypeString = mealTypeArray.join(", ");

    // Update allData
    setAllData((prevData) => ({
      ...prevData,
      MealTypeData: mealTypeString,
    }));

    onNext(); // Proceed to the next step
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedMealType((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">
        What mealType you have at your disposal ?
      </h2>
      <p className="text-sm mb-6">
        If none is selected the recipe will be random.
      </p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="breakfast"
              checked={checkedMealType["breakfast"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("breakfast", checked)
              }
            />
            <span>Breakfast</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="lunch"
              checked={checkedMealType["lunch"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("lunch", checked)
              }
            />
            <span>Lunch</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="dinner"
              checked={checkedMealType["dinner"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("dinner", checked)
              }
            />
            <span>Dinner</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="brunch"
              checked={checkedMealType["brunch"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("brunch", checked)
              }
            />
            <span>Brunch</span>
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
              placeholder="Please specify your mealType"
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
