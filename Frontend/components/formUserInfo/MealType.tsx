"use client";

import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { useState } from "react";

interface MealTypeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function MealTypeForm({ setAllData }: MealTypeFormProps) {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const handleMealSelect = (meal: string) => {
    setSelectedMeal(meal);
    setAllData((prevData) => ({
      ...prevData,
      MealTypeData: meal,
    }));
  };

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">
        2. What meal do you want to prepare?
      </h2>
      <Button
        variant="ghost"
        className={selectedMeal === "Breakfast" ? "selected" : ""}
        onClick={() => handleMealSelect("Breakfast")}
      >
        Breakfast
      </Button>
      <Button
        variant="ghost"
        className={selectedMeal === "Lunch" ? "selected" : ""}
        onClick={() => handleMealSelect("Lunch")}
      >
        Lunch
      </Button>
      <Button
        variant="ghost"
        className={selectedMeal === "Dinner" ? "selected" : ""}
        onClick={() => handleMealSelect("Dinner")}
      >
        Dinner
      </Button>
      <Button
        variant="ghost"
        className={selectedMeal === "Brunch" ? "selected" : ""}
        onClick={() => handleMealSelect("Brunch")}
      >
        Brunch
      </Button>
    </div>
  );
}
