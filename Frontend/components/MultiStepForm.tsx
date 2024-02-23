//frotend//components//MultiStepForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import AllergiesForm from "./formUserInfo/Allergies";
import CuisineTypeForm from "./formUserInfo/CuisineType";
import EventForm from "./formUserInfo/Eventmeals";
import RegimeForm from "./formUserInfo/Regime";
import ToolsForm from "./formUserInfo/Tools";
import MealTypeForm from "./formUserInfo/MealType";
import TimeForm from "./formUserInfo/Time";
import NumberOfPlatesForm from "./formUserInfo/NumberOfPlates";
import LevelForm from "./formUserInfo/Level";
import { SetUserData } from "@/utils/UserData";
import IngerdiantsForm from "./formUserInfo/Ingredients";
import { userDataForm } from "@/utils/MyTypes";

interface AiResponse {
  ingredients: string[];
  instruction: string[];
  totalCalories: string[];
}

interface MultiStepFormProps {
  setAllData: React.Dispatch<React.SetStateAction<userDataForm>>;
  setAiResponse: React.Dispatch<React.SetStateAction<AiResponse>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  aiResponse: AiResponse;
  allData: userDataForm;
}

export default function MultiStepForm({
  setAllData,
  setAiResponse,
  allData,
  setIsLoading,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const extractSection = (text: any, startMarker: any, endMarker: any) => {
    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);
    return text.substring(startIndex, endIndex).trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (currentStep > 9) {
        const response = await SetUserData(allData);
        if (response?.success) {
          const recipeName = extractSection(
            response.data.recipe,
            "**Recipe Name**:",
            "**Ingredients**:"
          );
          const ingredients = extractSection(
            response.data.recipe,
            "**Ingredients**:",
            "**Instructions**:"
          ).split("\n");
          const instructions = extractSection(
            response.data.recipe,
            "**Instructions**:",
            "**Total Calories**:"
          ).split("\n");
          const totalCalories = extractSection(
            response.data.recipe,
            "**Total Calories**:",
            "**End Recipe**"
          ).split("\n");

          setAiResponse((prevAiResponse) => ({
            recipeName: recipeName,
            ingredients: [...prevAiResponse.ingredients, ...ingredients],
            instruction: [...prevAiResponse.instruction, ...instructions],
            totalCalories: [...prevAiResponse.totalCalories, totalCalories], // Adjust this if totalCalories should be handled differently
          }));
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentStep]);

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <IngerdiantsForm onNext={nextStep} setAllData={setAllData} />;
      case 2:
        return (
          <AllergiesForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 3:
        return (
          <ToolsForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 4:
        return (
          <RegimeForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 5:
        return (
          <MealTypeForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 5:
        return (
          <EventForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 6:
        return (
          <CuisineTypeForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 7:
        return (
          <NumberOfPlatesForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 8:
        return (
          <LevelForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );
      case 9:
        return (
          <TimeForm
            onNext={nextStep}
            onPrev={prevStep}
            setAllData={setAllData}
          />
        );

      default:
        return <div>Form Completed</div>;
    }
  };

  return (
    <div className="max-w-xs mx-auto my-8 bg-slate-100 rounded">
      {renderForm()}
    </div>
  );
}
