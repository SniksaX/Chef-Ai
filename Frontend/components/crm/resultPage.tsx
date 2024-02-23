"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import MultiStepForm from "../MultiStepForm";
import { userDataForm } from "@/utils/MyTypes";

interface AiResponse {
  recipeName: string | null;
  ingredients: string[];
  instruction: string[];
  totalCalories: string[];
}

export default function ResultPage() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [allData, setAllData] = useState<userDataForm>({
    IngredientsData: null,
    AllergiesData: null,
    CuisineTypeData: null,
    RegimeData: null,
    ToolsData: null,
    TimeData: null,
    LevelData: null,
    NumberOfPlatesData: null,
    MealTypeData: null,
  });
  const [aiResponse, setAiResponse] = useState<AiResponse>({
    recipeName: null,
    ingredients: [],
    instruction: [],
    totalCalories: [],
  });
  const [isLoading, setIsloading] = useState<boolean>();

  useEffect(() => {
    console.log(aiResponse);
  }, [aiResponse]);

  return (
    <div>
      <div className="max-w-xl mx-auto my-8 p-6 bg-white shadow-md">
        <div className="flex justify-between mb-4">
          <Button className="bg-blue-500 text-white" variant="default">
            Buy on Instacart
          </Button>
          <Button className="bg-green-500 text-white" variant="default">
            Buy on Amazon Fresh
          </Button>
        </div>
        <div className="flex justify-between mb-4">
          <Button
            className="border border-gray-300 text-gray-700"
            variant="outline"
          >
            Add to Shopping List
          </Button>
          <Button
            className="border border-gray-300 text-gray-700"
            variant="outline"
          >
            Add to Cookbook
          </Button>
          <ShareIcon className="text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Spiced Barley Bean Bowl
        </h1>
        <div className="mb-6 p-4 border rounded-lg">
          <div className="flex justify-center items-center mb-2">
            <LoaderIcon className="text-gray-300 animate-spin" />
          </div>
          <p className="text-center text-gray-500">
            Generating Recipe Image...
          </p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Recipe name:</h2>
          <p>{aiResponse.recipeName}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Preparation Time:</h2>
          <p>{allData.TimeData} minutes</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Difficulty:</h2>
          <p>{allData.LevelData}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Ingredients:</h2>
          <ul className="list-disc pl-5">
            {aiResponse.ingredients &&
              aiResponse.ingredients.map((ingredients, index) => (
                <li key={index}>{ingredients}</li>
              ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Kitchen Tools:</h2>
          <ul className="list-disc pl-5">
            {allData.ToolsData &&
              allData.ToolsData.split(", ").map((tools, index) => (
                <li key={index}>{tools}</li>
              ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Instructions:</h2>
          <ol className="list-decimal pl-5">
            <ul className="list-disc pl-5">
              {aiResponse.instruction &&
                aiResponse.instruction.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
            </ul>
          </ol>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Macros:</h2>
          <ol className="list-decimal pl-5">
            <ul className="list-disc pl-5">
              {aiResponse.totalCalories &&
                aiResponse.totalCalories.map((totalCalories, index) => (
                  <li key={index}>{totalCalories}</li>
                ))}
            </ul>
          </ol>
        </div>
      </div>
      <Modal isvisible={isLoading} onClose={() => setIsloading(false)}>
        <LoaderIcon className="text-gray-600 animate-spin"></LoaderIcon>
      </Modal>
      <Modal isvisible={showModal} onClose={() => setShowModal(false)}>
        <MultiStepForm
          setAllData={setAllData}
          allData={allData}
          aiResponse={aiResponse}
          setAiResponse={setAiResponse}
          setIsLoading={setIsloading}
        />
      </Modal>
    </div>
  );
}

function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
