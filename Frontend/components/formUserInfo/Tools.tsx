"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { Input } from "../ui/input";

interface ToolsFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function ToolsForm({ setAllData }: ToolsFormProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [otherAllergy, setOtherAllergy] = useState("");
  const [customTools, setCustomTools] = useState<string[]>([]);

  const handleAllergySelect = (allergy: string) => {
    setSelectedTools((prevSelectedTools) => {
      return prevSelectedTools.includes(allergy)
        ? prevSelectedTools.filter((a) => a !== allergy)
        : [...prevSelectedTools, allergy];
    });
  };

  const handleOtherAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherAllergy(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otherAllergy.trim() !== "") {
      e.preventDefault();
      setCustomTools((prev) => [...prev, otherAllergy]);
      handleAllergySelect(otherAllergy);
      setOtherAllergy("");
    }
  };

  useEffect(() => {
    setAllData((prevData: any) => ({
      ...prevData,
      ToolsData: selectedTools,
    }));
  }, [selectedTools, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">3. Tools Available</h2>
      <div className="mb-4">
        {[
          "Stove",
          "Oven",
          "Microwave",
          "Airfryer",
          "Blender",
          "BBQ",
          ...customTools,
        ].map((allergy) => (
          <Button
            key={allergy}
            variant="ghost"
            className={selectedTools.includes(allergy) ? "selected" : ""}
            onClick={() => handleAllergySelect(allergy)}
          >
            {allergy}
          </Button>
        ))}
      </div>
      <Input
        placeholder="Other Tools"
        value={otherAllergy}
        onChange={handleOtherAllergyChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
