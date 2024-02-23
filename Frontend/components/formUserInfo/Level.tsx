"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { userDataForm } from "@/utils/MyTypes";

const levelDescriptions = {
  1: "Beginner",
  2: "Intermediate",
  3: "Used to Cooking",
  4: "Pro",
  5: "Chef",
};

interface LevelTypeFormProps {
  onNext: () => void;
  onPrev: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function LevelForm({
  onNext,
  setAllData,
  onPrev,
}: LevelTypeFormProps) {
  const [value, setValue] = useState([1]);

  const onNextAndSaveData = () => {
    const levelString = levelDescriptions[value[0]];

    setAllData((prevData) => ({
      ...prevData,
      LevelData: levelString,
    }));

    onNext();
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>For how many people are you cooking?</h2>
      <p id="Level">I am a : {levelDescriptions[value[0]]}</p>{" "}
      <SliderPrimitive.Root
        defaultValue={[1]}
        min={1}
        max={5}
        step={1}
        onValueChange={setValue}
        className="slider"
        orientation="horizontal"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          touchAction: "none",
          width: "100%",
          height: 50,
        }}
      >
        <SliderPrimitive.Track
          className="track"
          style={{
            backgroundColor: "silver",
            position: "relative",
            flexGrow: 1,
            borderRadius: "9999px",
            height: 5,
          }}
        >
          <SliderPrimitive.Range
            className="range"
            style={{
              position: "absolute",
              backgroundColor: "dodgerblue",
              borderRadius: "9999px",
              height: "100%",
            }}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="thumb"
          style={{
            display: "block",
            width: 20,
            height: 20,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 10px black",
          }}
        />
      </SliderPrimitive.Root>
      <div className="flex-row">
        <Button className="w-1/2" onClick={onPrev}>
          Back
        </Button>
        <Button className="w-1/2" onClick={onNextAndSaveData}>
          Next
        </Button>
      </div>
    </div>
  );
}
