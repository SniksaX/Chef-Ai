import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { userDataForm } from "@/utils/MyTypes";
import { Input } from "../ui/input";

interface CuisineTypeFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function CuisineTypeForm({ setAllData }: CuisineTypeFormProps) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [otherCuisine, setOtherCuisine] = useState("");

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  const handleOtherCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherCuisine(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otherCuisine.trim() !== "") {
      e.preventDefault();
      setSelectedCuisine(otherCuisine);
      setOtherCuisine("");
    }
  };

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      CuisineTypeData: selectedCuisine ? [selectedCuisine] : [],
    }));
  }, [selectedCuisine, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">5. Preferred Cuisine Type</h2>
      <div className="mb-4">
        {[
          "Indian",
          "North-African",
          "Korean",
          "French",
          "Chinese",
          "Italian",
        ].map((cuisine) => (
          <Button
            key={cuisine}
            variant="ghost"
            className={selectedCuisine === cuisine ? "selected" : ""}
            onClick={() => handleCuisineSelect(cuisine)}
          >
            {cuisine}
          </Button>
        ))}
        {selectedCuisine &&
          ![
            "Indian",
            "North-African",
            "Korean",
            "French",
            "Chinese",
            "Italian",
          ].includes(selectedCuisine) && (
            <Button variant="ghost" className="selected">
              {selectedCuisine}
            </Button>
          )}
      </div>
      <Input
        placeholder="Other Cuisine Type"
        value={otherCuisine}
        onChange={handleOtherCuisineChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
