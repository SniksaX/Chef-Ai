"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/components/MultiStepForm";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface TimeTypeFormProps {
  onNext: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function TimeForm({ onNext, setAllData }: TimeTypeFormProps) {
  const [value, setValue] = useState([20]);
  const onNextAndSaveData = () => {
    setAllData((prevData) => ({
      ...prevData,
      TimeData: value,
    }));

    onNext();
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>How much time you got?</h2>
      <p>If set to 0 it'll be random.</p>

      <p id="Time">{value} minutes</p>
      <SliderPrimitive.Root
        defaultValue={[25]}
        min={0}
        max={180}
        step={20}
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
      <Button className="w-full p-4" onClick={onNextAndSaveData}>
        Next
      </Button>
    </div>
  );
}
