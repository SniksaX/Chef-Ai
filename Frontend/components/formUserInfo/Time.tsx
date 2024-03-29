"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { userDataForm } from "@/utils/MyTypes";

interface TimeTypeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function TimeForm({ setAllData }: TimeTypeFormProps) {
  const [value, setValue] = useState([20]);

  const handleValueChange = (value: number[]) => {
    setValue(value);
    setAllData((prevData) => ({
      ...prevData,
      TimeData: value,
    }));
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2 className="text-lg font-semibold">How much time you got?</h2>
      <p>If set to 0 it'll be random.</p>

      <p id="Time">{value} minutes</p>
      <SliderPrimitive.Root
        defaultValue={[25]}
        min={0}
        max={180}
        step={20}
        onValueChange={handleValueChange}
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
              backgroundColor: "green",
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
    </div>
  );
}
