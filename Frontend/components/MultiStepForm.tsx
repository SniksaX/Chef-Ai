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
import { useRouter } from "next/navigation";
import { SetUserData } from "@/utils/UserData";
import IngerdiantsForm from "./formUserInfo/Ingredients";

export type userDataForm = {
  AllergiesData: string | null;
  CuisineTypeData: string | null;
  RegimeData: string | null;
  IngredientsData: string | null;
  ToolsData: string | null;
  TimeData: number[] | null;
  LevelData: string | null;
  NumberOfPlatesData: number[] | null;
  MealTypeData: string | null;
  // EnergyData: string | null;
};

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [allData, setAllData] = useState<userDataForm>({
    AllergiesData: null,
    CuisineTypeData: null,
    RegimeData: null,
    IngredientsData: null,
    ToolsData: null,
    TimeData: null,
    LevelData: null,
    NumberOfPlatesData: null,
    MealTypeData: null,
    // EnergyData: null,
  });

  const nextStep = () => setCurrentStep(currentStep + 1);

  useEffect(() => {
    const fetchData = async () => {
      if (currentStep > 9) {
        const response = await SetUserData(allData);
        if (response === true) {
          router.push("/");
        }
      }
    };
    fetchData();
  });

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <IngerdiantsForm onNext={nextStep} setAllData={setAllData} />;
      case 2:
        return <CuisineTypeForm onNext={nextStep} setAllData={setAllData} />;
      case 3:
        return <ToolsForm onNext={nextStep} setAllData={setAllData} />;
      case 4:
        return <RegimeForm onNext={nextStep} setAllData={setAllData} />;
      case 5:
        return <MealTypeForm onNext={nextStep} setAllData={setAllData} />;
      case 5:
        return <EventForm onNext={nextStep} setAllData={setAllData} />;
      case 6:
        return <TimeForm onNext={nextStep} setAllData={setAllData} />;
      case 7:
        return <NumberOfPlatesForm onNext={nextStep} setAllData={setAllData} />;
      case 8:
        return <LevelForm onNext={nextStep} setAllData={setAllData} />;
      case 9:
        return <AllergiesForm onNext={nextStep} setAllData={setAllData} />;

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
