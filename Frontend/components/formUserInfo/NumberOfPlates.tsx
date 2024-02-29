"use client";

import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { userDataForm } from "@/utils/MyTypes";

interface NumberOfPlatesTypeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function NumberOfPlatesForm({
  setAllData,
}: NumberOfPlatesTypeFormProps) {
  const [value, setValue] = useState([1]);

  const handleValueChange = (value: number[]) => {
    setValue(value);
    setAllData((prevData) => ({
      ...prevData,
      NumberOfPlatesData: value,
    }));
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2 className="text-lg font-semibold">
        9. For how many people are you cooking?
      </h2>
      <p id="NumberOfPlates">{value} Person(s)</p>
      <SliderPrimitive.Root
        defaultValue={[1]}
        min={1}
        max={10}
        step={1}
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
