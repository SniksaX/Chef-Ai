"use client";

import { fetchHistory } from "@/utils/UserData";
import { LoaderIcon } from "@/utils/animation";
import { useEffect, useState } from "react";

type HistoryDataType = {
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  macros: string[];
  createdAt: string;
};

export default function HistoryPage() {
  const [allHistoryData, setAllHistoryData] = useState<HistoryDataType[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<HistoryDataType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      const response = await fetchHistory();
      if (response.success) {
        setAllHistoryData(response.data.AllHistory);
        setIsLoading(false);
      }
    };
    getHistory();
  }, []);

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  return !isLoading ? (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <div className="flex">
          <aside className="w-1/4 pr-8">
            <div className="flex items-center space-x-2 mb-6">
              <span className="font-bold text-xl">Recipe Star</span>
            </div>
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-1">
                {allHistoryData.map((historyItem, index) => (
                  <li
                    key={index}
                    onClick={() => handleRecipeClick(historyItem)}
                    className="cursor-pointer"
                  >
                    <a className="block py-2 px-4 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded">
                      {historyItem.recipeName}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="w-3/4">
            {selectedRecipe && (
              <article className="bg-white shadow rounded-lg p-6">
                <header className="mb-4">
                  <h1 className="text-3xl font-bold mb-1">
                    {selectedRecipe.recipeName}
                  </h1>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>
                      Published on{" "}
                      {new Date(selectedRecipe.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </header>
                <section>
                  <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                  <ol className=" pl-5 space-y-1">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                  <h2 className="text-xl font-semibold mb-3">Macros</h2>
                  <ul>
                    {selectedRecipe.macros.map((macro, index) => (
                      <li key={index}>{macro}</li>
                    ))}
                  </ul>
                </section>
              </article>
            )}
          </main>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center  h-screen">
      <LoaderIcon className="text-gray-800 animate-spin" />
    </div>
  );
}

function ChefHatIcon(props) {
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
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  );
}

function ClockIcon(props) {
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
