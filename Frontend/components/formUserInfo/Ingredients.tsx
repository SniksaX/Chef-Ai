//Frontend/components/formUserInfo/Ingredients.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { userDataForm } from "@/utils/MyTypes";
import { useEffect, useState } from "react";
import UploadWindow from "../crm/uploadfile";
import LoadingModal from "../LoadingModal";

interface IngredientsFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function IngredientsForm({ setAllData }: IngredientsFormProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [otherIngredients, setOtherIngredients] = useState("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);

  const handleIngredientsSelect = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        const newSelected = prevSelected.filter((item) => item !== ingredient);
        setCustomIngredients((prevCustom) =>
          prevCustom.filter((item) => item !== ingredient)
        );
        return newSelected;
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const handleOtherIngredientsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherIngredients(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const ingredientsArray = otherIngredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== "");

      setCustomIngredients((prev) => [
        ...new Set([...prev, ...ingredientsArray]),
      ]);

      setSelectedIngredients((prevSelected) => [
        ...new Set([...prevSelected, ...ingredientsArray]),
      ]);

      setOtherIngredients("");
    }
  };

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      IngredientsData: selectedIngredients,
    }));
  }, [selectedIngredients, setAllData]);

  return (
    <div className="rounded-md bg-green-100 p-4">
      <h2 className="text-lg font-semibold">
        1. What ingredients do you have?
      </h2>
      <p className="mt-1 text-sm">
        Select from the list or type any ingredients to add them. You can add
        any ingredient not listed by typing it in the search box. You can also
        add them by taking a pic of all ingredients you have
      </p>
      <p className="mt-1 text-sm text-red-600">
        Please not : the picture has to be as clear as possible with the all the
        ingredients displayed properly.
      </p>
      <div className="mb-4">
        {customIngredients.map((ingredient) => (
          <Button
            key={ingredient}
            variant="ghost"
            className={
              selectedIngredients.includes(ingredient) ? "selected" : ""
            }
            onClick={() => handleIngredientsSelect(ingredient)}
          >
            {ingredient}
          </Button>
        ))}
      </div>
      <Input
        placeholder="Potato, Milk, Beef, etc..."
        value={otherIngredients}
        onChange={handleOtherIngredientsChange}
        onKeyPress={handleKeyPress}
      />
      <Button
        className="mt-2"
        variant="outline"
        onClick={() => setShowModal(true)}
      >
        Upload Ingredient Image
      </Button>
      <LoadingModal isvisible={showModal} onClose={() => setShowModal(false)}>
        <UploadWindow
          setShowModal={setShowModal}
          setCustomIngredients={(ingredients) => {
            setCustomIngredients(ingredients); // Existing logic to add to customIngredients
            setSelectedIngredients((prev) => [
              ...new Set([...prev, ...ingredients]),
            ]); // Additional logic to also select these ingredients
          }}
        />
      </LoadingModal>
    </div>
  );
}
