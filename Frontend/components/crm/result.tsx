"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { aiResponseForm } from "@/utils/MyTypes";

export default function ResultPage() {
  const [responseAi, setResponseAi] = useState<aiResponseForm>({
    recipeName: null,
    ingredients: null,
    instructions: null,
    totalCalories: null,
  });

  useEffect(() => {
    const data = localStorage.getItem("recipe");
    if (data) {
      setResponseAi(JSON.parse(data));

      localStorage.removeItem("recipe");
    }
  }, []);

  const nutritionalInfo =
    responseAi.totalCalories?.filter((item, index) => index > 0) || [];

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
          <h2 className="text-xl font-semibold mb-3">
            Recipe Name: {responseAi.recipeName}
          </h2>
          <h3 className="text-lg font-semibold mt-4 mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5 mb-4">
            {responseAi.ingredients?.map((ing, index) => (
              <li key={index}>{ing}</li>
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
