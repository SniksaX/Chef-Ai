"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { Input } from "../ui/input";

interface RegimeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function RegimeForm({ setAllData }: RegimeFormProps) {
  const [selectedRegime, setSelectedRegime] = useState<string[]>([]);
  const [otherAllergy, setOtherAllergy] = useState("");
  const [customRegime, setCustomRegime] = useState<string[]>([]);

  const handleAllergySelect = (regime: string) => {
    setSelectedRegime((prevSelectedRegime) => {
      return prevSelectedRegime.includes(regime)
        ? prevSelectedRegime.filter((a) => a !== regime)
        : [...prevSelectedRegime, regime];
    });
  };

  const handleOtherAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherAllergy(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otherAllergy.trim() !== "") {
      e.preventDefault();
      setCustomRegime((prev) => [...prev, otherAllergy]);
      handleAllergySelect(otherAllergy);
      setOtherAllergy("");
    }
  };

  useEffect(() => {
    setAllData((prevData: any) => ({
      ...prevData,
      RegimeData: selectedRegime,
    }));
  }, [selectedRegime, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">8. Any Regime?</h2>
      <div className="mb-4">
        {[
          "Gluten-free",
          "Salt-free",
          "Flexitarian",
          "Vegan",
          "Vegetarian",
          "Paleo",
          ...customRegime,
        ].map((regime) => (
          <Button
            key={regime}
            variant="ghost"
            className={selectedRegime.includes(regime) ? "selected" : ""}
            onClick={() => handleAllergySelect(regime)}
          >
            {regime}
          </Button>
        ))}
      </div>
      <Input
        placeholder="Other Regime"
        value={otherAllergy}
        onChange={handleOtherAllergyChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
