//frontend/compoinents/onboarding/result/resultpage.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiResponseForm } from "@/utils/MyTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { pushShopping } from "@/utils/UserData";

export default function ResultPage() {
  const [responseAi, setResponseAi] = useState<aiResponseForm>({
    recipeName: null,
    ingredients: null,
    instructions: null,
    totalCalories: null,
    image: null,
  });
  const [checkedItems, setCheckedItems] = useState<any>({});

  useEffect(() => {
    const data = localStorage.getItem("recipe");
    if (data) {
      setResponseAi(JSON.parse(data));
      localStorage.removeItem("recipe");
    }
  }, []);
  console.log(responseAi);

  const nutritionalInfo =
    responseAi.totalCalories?.filter((item, index) => index > 0) || [];

  const handleCheckboxChange = (ingredient: any, isChecked: any) => {
    setCheckedItems((prev: any) => ({ ...prev, [ingredient]: isChecked }));
  };

  const pushSelectedItemsToBackend = async () => {
    const selectedIngredients = Object.entries(checkedItems)
      .filter(([_, isChecked]) => isChecked)
      .map(([ingredient, _]) => ingredient);

    const response = await pushShopping(selectedIngredients);
    if (response.success) {
      console.log("Pushed :)");
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
        <div className="mt-6 space-y-4 w-full overflow-auto h-[calc(117vh-16rem)]">
          <img
            alt="Pizza"
            className="w-full h-auto rounded-lg"
            height="300"
            src={responseAi.image || ""}
            style={{
              aspectRatio: "768/300",
              objectFit: "cover",
            }}
            width="768"
          />
          <h2 className="text-xl font-semibold mb-3">
            Recipe Name: {responseAi.recipeName}
          </h2>
          <h3 className="text-lg font-semibold mt-4 mb-2">
            Ingredients: {"------------"}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="justify-center text-blue-500 text-lg">
                  add
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={pushSelectedItemsToBackend}>
                  {" "}
                  Add selected to shopping list{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>Add selected to Amazon</DropdownMenuItem>
                {/* <DropdownMenuItem>Add all to shopping list</DropdownMenuItem>
                <DropdownMenuItem>Add all to Amazon</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          <ul className="list-disc pl-5 mb-4">
            {responseAi.ingredients?.map((ing, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={checkedItems[ing] || false}
                  onCheckedChange={(isChecked) =>
                    handleCheckboxChange(ing, isChecked)
                  }
                />
                <label htmlFor={`checkbox-${index}`} className="flex-1">
                  {ing}
                </label>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Instructions:</h3>
          <ol className=" pl-5 mb-4">
            {responseAi.instructions?.map((instruct, index) => (
              <li key={index}>{instruct}</li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold mt-4 mb-2">Total Calories:</h3>
          <p className="mb-2">{responseAi.totalCalories?.[0]}</p>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Nutrient</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nutritionalInfo.map((calo) => {
                const parts = calo?.trim().split(":");
                const nutrient = parts[0]?.replace("-", "").trim();
                const amount = parts[1]?.trim();
                return (
                  <tr key={nutrient}>
                    <td className="border px-4 py-2">{nutrient}</td>
                    <td className="border px-4 py-2">{amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <aside className="w-64 bg-gray-300 p-5">
          <div className="rounded-lg bg-gray-400 p-4 text-center">
            <h2 className="text-lg font-semibold mb-3">Recipe of the Day</h2>
            <p className="mb-4">Discover daily culinary inspirations!</p>
            <Button className="mb-2">Learn More</Button>
            <Button variant="secondary">Save</Button>
          </div>
        </aside>
      </div>
    </main>
  );
}

{
  /* <DropdownMenu>
<DropdownMenuTrigger asChild>
  <button className="justify-center text-blue-500 text-lg">
    ...
  </button>
</DropdownMenuTrigger>
<DropdownMenuContent>
  <DropdownMenuItem onClick={() => console.log("test")}>
    Add to shopping list
  </DropdownMenuItem>
  <DropdownMenuItem>Add to Amazon</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu> */
}
