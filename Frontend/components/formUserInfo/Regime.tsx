"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface RegimeFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function RegimeForm({
  onNext,
  setAllData,
  onPrev,
}: RegimeFormProps) {
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [checkedRegime, setCheckedRegime] = useState({});
  const [othersText, setOthersText] = useState("");

  const handleOthersCheckboxChange = (checked: boolean) => {
    setIsOthersChecked(checked);
  };

  const onNextAndSaveData = () => {
    const regimeArray = Object.entries(checkedRegime)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    if (othersText.trim()) regimeArray.push(othersText.trim());
    const regimeString = regimeArray.join(", ");

    setAllData((prevData) => ({
      ...prevData,
      RegimeData: regimeString,
    }));

    onNext();
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedRegime((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8">
      <h2 className="text-lg font-semibold mb-4">
        What regimes are you following ?
      </h2>
      <p className="text-sm mb-6">If none click Next.</p>
      <form>
        <div className="flex flex-col space-y-3 mb-8">
          <label className="flex items-center space-x-2">
            <Checkbox
              id="gluten-free"
              checked={checkedRegime["gluten-free"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("gluten-free", checked)
              }
            />
            <span>Gluten-Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="salt"
              checked={checkedRegime["salt"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("salt", checked)
              }
            />
            <span>Low-Sodium or Salt-Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="flexitarian"
              checked={checkedRegime["flexitarian"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("flexitarian", checked)
              }
            />
            <span>Flexitarian</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="vegan"
              checked={checkedRegime["vegan"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("vegan", checked)
              }
            />
            <span>Vegan</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="vegetarian"
              checked={checkedRegime["vegetarian"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("vegetarian", checked)
              }
            />
            <span>Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              id="paleo"
              checked={checkedRegime["paleo"]}
              onCheckedChange={(checked) =>
                handleCheckboxChange("paleo", checked)
              }
            />
            <span>Paleo</span>
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
              placeholder="Please specify your regime"
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
