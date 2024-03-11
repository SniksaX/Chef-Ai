//frontend/components/Onboarding/history/historyDetails.tsx

"use client";

import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function HistoryDetails() {
  const [recipeDetails, setRecipeDetails] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("recipe-details");
    if (data) {
      const details = JSON.parse(data);
      setRecipeDetails(Array.isArray(details) ? details : [details]);
    }
  }, []);

  return (
    <>
      {recipeDetails &&
        recipeDetails.map((item: any, index: number) => (
          <div key={index} className="max-w-6xl mx-auto my-8 p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <img
                      alt={item.AiAnswers[0].recipeName || "Pizza"}
                      className="w-full h-auto rounded-lg"
                      height="300"
                      src={item.AiAnswers[0].imageUrl || ""}
                      style={{
                        aspectRatio: "768/300",
                        objectFit: "cover",
                      }}
                      width="768"
                    />
                    <button className="absolute top-2 left-2 bg-white p-1 rounded-full">
                      <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                      <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-yellow-400">★★★★☆</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        className="bg-yellow-400 text-white"
                        variant="secondary"
                      >
                        Add to Favorite
                      </Button>
                      <Button variant="outline">Print</Button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Recipe Overview</h2>
                    <div className="grid grid-cols-2 gap-4 my-2">
                      <div>
                        <div className="font-semibold">recipe Name: </div>
                        <div>{item.AiAnswers[0].recipeName}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Difficulty level</div>
                        <div>{item.promptData.level}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Allergens</div>
                        <div>{item.promptData.allergies}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Cuisines</div>
                        <div>{item.promptData.cuisineType}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Courses</div>
                        <div>{item.promptData.mealType}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Ingredients</div>
                        <div>{item.promptData.ingredients + ", "}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Recipe Instruction</h2>
                    <ul className="pl-5 my-2">
                      {item.AiAnswers[0].instructions.map(
                        (instruct: string[], index: number) => (
                          <li key={index}>{instruct}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Ingredients</h2>
                    <ul className="pl-5 my-2">
                      {item.AiAnswers[0].ingredients.map(
                        (ingred: string[], index: number) => (
                          <li key={index}>{ingred}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-6 w-6 text-gray-600" />
                    <div className="text-sm">Prep Time</div>
                    <div className="font-semibold">{item.promptData.time}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UsersIcon className="h-6 w-6 text-gray-600" />
                    <div className="text-sm">Yield</div>
                    <div className="font-semibold">
                      {item.promptData.persons}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FlameIcon className="h-6 w-6 text-gray-600" />
                    <div className="text-sm">Calorie</div>
                    <div className="font-semibold text-xs">
                      {/* {item.AiAnswers[0].macros} */}?
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HomeIcon className="h-6 w-6 text-gray-600" />
                    <div className="text-sm">For Family</div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Avatar>
                      <AvatarImage
                        alt="Mary Dark"
                        className="justify-center"
                        src="/placeholder.svg?height=100&width=100"
                      />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    {/* <div className="text-center">
                    <div className="font-semibold">Mary Dark</div>
                    <div className="text-sm text-gray-600">
                      info@example.com
                    </div>
                    <div className="text-sm text-gray-600">123 456 7890</div>
                  </div> */}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Categories</h3>
                    <ul className="space-y-1">
                      <li>Christmas slices</li>
                      <li>Easy finger food recipes</li>
                      <li>Quick & Easy</li>
                    </ul>
                  </div>
                  {/* <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Ask to chef</h3>
                  <form className="space-y-2">
                    <Input placeholder="Name" type="text" />
                    <Input placeholder="E-mail" type="email" />
                    <Input placeholder="Phone" type="tel" />
                    <Textarea placeholder="Message" />
                    <Button className="w-full">Send Message</Button>
                  </form>
                </div> */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Recipe Types</h3>
                    <ul className="space-y-1">
                      <li>Bakery</li>
                      <li>Budget</li>
                      <li>Cheese</li>
                      <li>Condiment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
//1FHO02

function ChevronLeftIcon(props: any) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon(props: any) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
