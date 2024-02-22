"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/components/MultiStepForm";

interface CuisineTypeFormProps {
  onNext: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function CuisineTypeForm({
  onNext,
  setAllData,
}: CuisineTypeFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedCuisineType, setCheckedCuisineType] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    const cuisineTypeArray = Object.entries(checkedCuisineType)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) cuisineTypeArray.push(othersText.trim());
    const cuisineTypeString = cuisineTypeArray.join(", ");

    setAllData((prevData) => ({
      ...prevData,
      CuisineTypeData: cuisineTypeString,
    }));

    onNext();
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedCuisineType((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">
        What type of food you want to try
      </h2>
      <p className="text-sm mb-6">
        If none is selected the recipe will be random.
      </p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="indian"
              checked={checkedCuisineType["indian"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("indian", checked)
              }
            />
            <span>Indian</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="north-african"
              checked={checkedCuisineType["north-african"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("north-african", checked)
              }
            />
            <span>North African</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="corean"
              checked={checkedCuisineType["corean"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("corean", checked)
              }
            />
            <span>Corean</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="french"
              checked={checkedCuisineType["french"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("french", checked)
              }
            />
            <span>French</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="chinese"
              checked={checkedCuisineType["chinese"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("chinese", checked)
              }
            />
            <span>Chinese</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="italian"
              checked={checkedCuisineType["italian"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("italian", checked)
              }
            />
            <span>Italian</span>
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
              placeholder="Please specify your cuisineType"
              value={othersText}
              onChange={(e) => setOthersText(e.target.value)}
            />
          )}
        </div>
        <Button className="w-full" onClick={onNextAndSaveData}>
          Next
        </Button>
      </form>
    </div>
  );
}
