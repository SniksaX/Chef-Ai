"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";

interface LevelTypeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function LevelForm({ setAllData }: LevelTypeFormProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setAllData((prevData) => ({
      ...prevData,
      LevelData: level,
    }));
  };

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">4. Your Cooking Level</h2>
      <div className="mb-4">
        {["Beginner", "Intermediate", "Used to Cooking", "Pro", "Chef"].map(
          (level) => (
            <Button
              key={level}
              variant="ghost"
              className={selectedLevel === level ? "selected" : ""}
              onClick={() => handleLevelSelect(level)}
            >
              {level}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
