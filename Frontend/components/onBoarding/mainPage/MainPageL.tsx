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
import { useEffect, useState } from "react";
import { userDataForm } from "@/utils/MyTypes";
import MealTypeForm from "@/components/formUserInfo/MealType";
import ToolsForm from "@/components/formUserInfo/Tools";
import AllergiesForm from "@/components/formUserInfo/Allergies";
import CuisineTypeForm from "@/components/formUserInfo/CuisineType";
import EventForm from "@/components/formUserInfo/Eventmeals";
import LevelForm from "@/components/formUserInfo/Level";
import NumberOfPlatesForm from "@/components/formUserInfo/NumberOfPlates";
import RegimeForm from "@/components/formUserInfo/Regime";
import TimeForm from "@/components/formUserInfo/Time";
import IngredientsForm from "@/components/formUserInfo/Ingredients";
import { SetUserData, fetchHistory } from "@/utils/UserData";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingModal";
import { LoaderIcon } from "@/utils/animation";

export default function Component() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [historyData, setHistoryData] = useState<any>([]);

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

  useEffect(() => {
    const getHistory = async () => {
      const result = await fetchHistory();
      if (result.success) {
        setHistoryData(result.data.result);
      }
    };
    getHistory();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("recipes", JSON.stringify(historyData));
    }
  }, [historyData]);

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
