"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Input } from "../ui/input";
import Modal from "../Modal";
import UploadWindow from "../crm/uploadfile";
import { userDataForm } from "@/utils/MyTypes";
import LoadingModal from "../LoadingModal";

interface IngredientsFormProps {
  onNext: () => void;
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
}

export default function IngredientsForm({
  onNext,
  setAllData,
}: IngredientsFormProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [othersText, setOthersText] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addDetectedIngredients = (detectedIngredients: string[]) => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      ...detectedIngredients,
    ]);
  };

  const onNextAndSaveData = () => {
    setAllData((prevData) => ({
      ...prevData,
      IngredientsData: ingredients.join(", "), // Assuming you want to save all ingredients as a string
    }));

    onNext(); // Proceed to the next step
  };

  const addIngredient = (ingredient: string) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOthersText(event.target.value);
  };

  const handleAddIngredient = (event: React.FormEvent) => {
    event.preventDefault();
    if (!othersText.trim()) return;
    addIngredient(othersText);
    setOthersText("");
  };

  return (
    <div key="1" className="max-w-xs mx-auto my-8" style={{ padding: 5 }}>
      <h2 className="text-lg font-semibold mb-4">
        What Ingredients are at your disposal?
      </h2>
      <p className="text-sm mb-6">If none, click Next.</p>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center">
            {ingredient}
            <Button className="ml-2" onClick={() => removeIngredient(index)}>
              -
            </Button>
          </li>
        ))}
      </ol>
      <form
        onSubmit={handleAddIngredient}
        className="flex items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Potato, Milk, ..."
          value={othersText}
          onChange={handleInputChange}
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="mt-4 flex justify-center">
        <Camera
          className="text-gray-600 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <Button className="w-full mt-4" onClick={onNextAndSaveData}>
        Next
      </Button>
      <LoadingModal isvisible={showModal} onClose={() => setShowModal(false)}>
        <UploadWindow
          onDetectionComplete={addDetectedIngredients}
          setShowModal={setShowModal}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </LoadingModal>
    </div>
  );
}
