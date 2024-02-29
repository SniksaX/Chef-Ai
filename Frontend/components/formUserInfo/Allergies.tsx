"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { Input } from "../ui/input";

interface AllergiesFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function AllergiesForm({ setAllData }: AllergiesFormProps) {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [otherAllergy, setOtherAllergy] = useState("");
  const [customAllergies, setCustomAllergies] = useState<string[]>([]);

  const handleAllergySelect = (allergy: string) => {
    setSelectedAllergies((prevSelectedAllergies) => {
      return prevSelectedAllergies.includes(allergy)
        ? prevSelectedAllergies.filter((a) => a !== allergy)
        : [...prevSelectedAllergies, allergy];
    });
  };

  const handleOtherAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherAllergy(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otherAllergy.trim() !== "") {
      e.preventDefault();
      setCustomAllergies((prev) => [...prev, otherAllergy]);
      handleAllergySelect(otherAllergy);
      setOtherAllergy("");
    }
  };

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      AllergiesData: selectedAllergies,
    }));
  }, [selectedAllergies, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">7. Any Allergies?</h2>
      <div className="mb-4">
        {[
          "Eggs",
          "Milk-dairy",
          "Peanuts",
          "Tree-nuts",
          "Fish",
          "Soy",
          ...customAllergies,
        ].map((allergy) => (
          <Button
            key={allergy}
            variant="ghost"
            className={selectedAllergies.includes(allergy) ? "selected" : ""}
            onClick={() => handleAllergySelect(allergy)}
          >
            {allergy}
          </Button>
        ))}
      </div>
      <Input
        placeholder="Other Allergies"
        value={otherAllergy}
        onChange={handleOtherAllergyChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
