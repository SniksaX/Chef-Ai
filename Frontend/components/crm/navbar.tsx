import React from "react";
import { Button } from "../ui/button";

const NavBarOB = () => {
  return (
    <aside className="w-64 bg-green-100 p-6">
      <div className="flex items-center space-x-2">
        <ChefHatIcon className="h-6 w-6 text-green-600" />
        <span className="text-xl font-bold">CookAI</span>
      </div>
      <nav className="mt-6">
        <ul>
          {/* <li className="flex items-center space-x-2 rounded-md bg-green-200 p-2">
          <RefrigeratorIcon className="h-5 w-5 text-green-600" />
          <span>PantryAI</span>
        </li>
        <li className="mt-2 flex items-center space-x-2 p-2">
          <ChefHatIcon className="h-5 w-5" />
          <span>EliteChef</span>
        </li>
        <li className="mt-2 flex items-center space-x-2 p-2">
          <AppleIcon className="h-5 w-5" />
          <span>NutriChef</span>
        </li>
        <li className="mt-2 flex items-center space-x-2 p-2">
          <CalendarIcon className="h-5 w-5" />
          <span>DietPlanAI</span>
        </li>
        <li className="mt-2 flex items-center space-x-2 p-2">
          <ParenthesesIcon className="h-5 w-5" />
          <span>FoodMatch</span>
        </li>
        <li className="mt-2 flex items-center space-x-2 p-2">
          <MartiniIcon className="h-5 w-5" />
          <span>BeverageBoss</span>
        </li> */}
          <li className="mt-2 flex items-center space-x-2 p-2">
            <BookIcon className="h-5 w-5" />
            <span>RecipeBook</span>
          </li>
          <li className="mt-2 flex items-center space-x-2 p-2">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>GroceryList</span>
          </li>
        </ul>
      </nav>
      <Button className="mt-4 flex items-center space-x-2 rounded-md bg-green-300 p-2 text-green-700">
        <ExpandIcon className="h-4 w-4" />
        <span>Collapse Menu</span>
      </Button>
    </aside>
  );
};

export default NavBarOB;

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
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

function ExpandIcon(props) {
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
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
}

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
