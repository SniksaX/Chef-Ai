"use client";

//frontend/components/crm/resultPage.tsx

import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { useState } from "react";
import { userDataForm } from "@/utils/MyTypes";
import MealTypeForm from "../formUserInfo/MealType";
import ToolsForm from "../formUserInfo/Tools";
import AllergiesForm from "../formUserInfo/Allergies";
import CuisineTypeForm from "../formUserInfo/CuisineType";
import EventForm from "../formUserInfo/Eventmeals";
import LevelForm from "../formUserInfo/Level";
import NumberOfPlatesForm from "../formUserInfo/NumberOfPlates";
import RegimeForm from "../formUserInfo/Regime";
import TimeForm from "../formUserInfo/Time";
import IngredientsForm from "../formUserInfo/Ingredients";
import { SetUserData } from "@/utils/UserData";
import { useRouter } from "next/navigation";
import LoadingModal from "../LoadingModal";
import { LoaderIcon } from "@/utils/animation";

export default function Component() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await SetUserData(allData);
    console.log(allData);
    if (response?.success) {
      localStorage.setItem("recipe", JSON.stringify(response.data));
      router.push("/result");
    }
  };
  return (
    <main className="flex-1 p-8">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Chef AI</h1>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger id="language">
              <SelectValue placeholder="EN" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
            </SelectContent>
          </Select>
          <Avatar>
            <AvatarImage
              alt="User Avatar"
              src="/placeholder.svg?height=32&width=32"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="mt-6 flex justify-between">
        <div className="">
          {/* <div className="rounded-md bg-yellow-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold">
                    Your Trial Plan is almost over!
                  </span>
                </div>
                <Progress className="w-40" value={80} />
              </div>
              <p className="mt-2 text-sm">
                You have used 80% of your Trial Plan this month. Subscribe to
                the Premium Plan for more features!
              </p>
            </div> */}
          <div className="mt-6 space-y-4 w-full overflow-auto h-[calc(110vh-16rem)]">
            <IngredientsForm setAllData={setAllData} />
            <MealTypeForm setAllData={setAllData} />
            <ToolsForm setAllData={setAllData} />
            <LevelForm setAllData={setAllData} />
            <CuisineTypeForm setAllData={setAllData} />
            <EventForm setAllData={setAllData} />
            <AllergiesForm setAllData={setAllData} />
            <RegimeForm setAllData={setAllData} />
            <div className="rounded-md bg-green-100 p-4">
              <NumberOfPlatesForm setAllData={setAllData} />
            </div>
            <div className="rounded-md bg-green-100 p-4">
              <TimeForm setAllData={setAllData} />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-green-400"
            variant="secondary"
            onClick={() => handleGenerate()}
          >
            Generate !
          </Button>
        </div>
        <LoadingModal isvisible={isLoading} onClose={() => setIsLoading(false)}>
          <div className="flex justify-center items-center mb-2">
            <LoaderIcon className=" text-gray-600 animate-spin" />
          </div>
        </LoadingModal>
        <div className="w-64">
          <Card className="h-full w-full bg-green-300">
            <CardHeader>
              <CardTitle>Recipe of the Day</CardTitle>
              <CardDescription>
                Discover daily culinary inspirations!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                alt="Recipe of the Day"
                className="aspect-video"
                height="200"
                src="/placeholder.svg"
                width="256"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Learn More</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}

function AlertCircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function AppleIcon(props) {
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
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MartiniIcon(props) {
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
      <path d="M8 22h8" />
      <path d="M12 11v11" />
      <path d="m19 3-7 8-7-8Z" />
    </svg>
  );
}

function ParenthesesIcon(props) {
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
      <path d="M8 21s-4-3-4-9 4-9 4-9" />
      <path d="M16 3s4 3 4 9-4 9-4 9" />
    </svg>
  );
}

function RefrigeratorIcon(props) {
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
      <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
      <path d="M5 10h14" />
      <path d="M15 7v6" />
    </svg>
  );
}
