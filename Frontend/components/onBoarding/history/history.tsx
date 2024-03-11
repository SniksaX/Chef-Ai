"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const router = useRouter();
  const [historyData, setHistoryData] = useState<any>([]);
  const [editableStars, setEditableStars] = useState<any>({});

  useEffect(() => {
    const data = localStorage.getItem("recipes");
    if (data) {
      const details = JSON.parse(data);
      setHistoryData(Array.isArray(details) ? details : [details]);
    }
  }, []);

  const handleMore = async (index: number) => {
    localStorage.setItem("recipe-details", JSON.stringify(historyData[index]));
    router.push("/history/recipe-details");
  };

  const renderStars = (starCount: any, recipeIndex: any) => {
    const currentStarCount = editableStars[recipeIndex] || starCount;

    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`text-yellow-400 cursor-pointer ${
          i < currentStarCount ? "" : "text-gray-400 opacity-50"
        }`}
        onClick={() => handleStarClick(recipeIndex, i)}
      />
    ));
  };

  const handleStarClick = (recipeIndex: any, starIndex: any) => {
    setEditableStars((prevStars: any) => ({
      ...prevStars,
      [recipeIndex]: starIndex + 1,
    }));
  };

  const saveRating = async (recipeIndex: any) => {
    const newRating = editableStars[recipeIndex];
  };

  return (
    <div className="bg-white p-6 grid grid-cols-4 gap-6">
      {historyData.map((item: any, index: number) => (
        <div
          key={index}
          className="flex flex-col justify-between bg-gray-100 rounded-lg shadow-md p-4"
          style={{ height: "fit-content" }}
        >
          {/* Ensure there is an AiAnswers array and it has at least one item */}
          {item.AiAnswers && item.AiAnswers.length > 0 && (
            <>
              <img
                alt={item.AiAnswers[0].recipeName || "image"}
                className="rounded-lg"
                height="200"
                src={item.AiAnswers[0].imageUrl || ""}
                style={{
                  aspectRatio: "250/200",
                  objectFit: "cover",
                }}
                width="250"
              />
              <Badge className="absolute mt-2 ml-2" variant="secondary">
                Featured
              </Badge>
              <h3 className="mt-4 text-xl font-semibold">
                {item.AiAnswers[0].recipeName}
              </h3>
              <div className="flex items-center mt-1">
                {renderStars(item.AiAnswers[0].stars, index)}
                <span className="ml-2 text-lg font-semibold">
                  {(editableStars[index] || item.AiAnswers[0].stars).toFixed(1)}
                </span>
              </div>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => saveRating(index)}
              >
                Save Rating
              </Button>
            </>
          )}
          <span className="text-sm text-gray-500">
            Prep Time: {item.promptData.time} minutes
          </span>
          <div className="flex items-center mt-2">
            <MicrowaveIcon className="text-gray-500" />
            <span className="ml-1 text-sm text-gray-500">
              Tools specified: {item.promptData.tools.join(", ")}
            </span>
          </div>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => handleMore(index)}
          >
            More Details
          </Button>
        </div>
      ))}
    </div>
  );
}

function MicrowaveIcon(props: any) {
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
      <rect width="20" height="15" x="2" y="4" rx="2" />
      <rect width="8" height="7" x="6" y="8" rx="1" />
      <path d="M18 8v7" />
      <path d="M6 19v2" />
      <path d="M18 19v2" />
    </svg>
  );
}
function StarIcon(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
