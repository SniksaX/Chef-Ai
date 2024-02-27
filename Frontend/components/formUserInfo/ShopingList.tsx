"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddShoping() {
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5">
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed">My Shopping List</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[32px]" />
                    <TableHead>Item</TableHead>
                    <TableHead className="w-[32px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Checkbox id="item1" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="Milk" id="item1-name" />
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox id="item2" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="Bread" id="item2-name" />
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="outline">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox id="item3" />
                    </TableCell>
                    <TableCell>
                      <Input
                        defaultValue=""
                        id="item3-name"
                        placeholder="Enter your item"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="outline">
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex justify-center space-x-5">
                <Button size="sm">Done</Button>
                <Button size="sm" variant="outline">
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { pushShopping } from "@/utils/UserData";

// type AddShopingType = {
//   ingredients: string[];
// };

// export function AddShoping({ ingredients }: AddShopingType) {
//   const [shoppingList, setShoppingList] = useState<string[]>([]);

//   function removeQuantities(ingredient) {
//     // This regex will match numbers, fractions, and units like g, kg, tbsp, tsp, cup, cups, handful, ml, l, and standalone numbers
//     const quantityRegex =
//       /\b\d+\s*\/\s*\d+\s*(g|kg|tbsp|tsp|cup|cups|handful|ml|l)?\b|\b\d+(\.\d+)?\s*(g|kg|tbsp|tsp|cup|cups|handful|ml|l)?\b/gi;
//     // This regex will remove any parenthetical statements including the parentheses
//     const parenthesesRegex = /\s*\([^)]*\)/g;
//     // This regex will remove hyphens that may be left over after removing numbers
//     const hyphenRegex = /-\s*$/g;

//     // Apply all removals
//     return ingredient
//       .replace(quantityRegex, "")
//       .replace(parenthesesRegex, "")
//       .replace(hyphenRegex, "")
//       .trim();
//   }

//   useEffect(() => {
//     const ingredientsWithoutQuantities = ingredients.map((ingredient) =>
//       removeQuantities(ingredient)
//     );
//     setShoppingList(ingredientsWithoutQuantities);
//   }, [ingredients]);

//   const removeIngredient = (index: number) => {
//     setShoppingList((prevIngredients) =>
//       prevIngredients.filter((_, i) => i !== index)
//     );
//   };

//   const hadleNext = async () => {
//     const response = await pushShopping(shoppingList);
//     if (response.success) {
//     }
//   };

//   return (
//     <div className="max-w-xs mx-auto my-8 bg-slate-100 rounded">
//       <div key="1" className="max-w-xs mx-auto my-8" style={{ padding: 5 }}>
//         <h2 className="text-lg font-semibold mb-4">Add to shopping list</h2>
//         <p className="text-sm mb-6">Manage you shopping list</p>
//         <ol>
//           {shoppingList.map((ingredient, index) => (
//             <li key={index} className="flex justify-between items-center">
//               {ingredient}
//               <Button className="ml-2" onClick={() => removeIngredient(index)}>
//                 -
//               </Button>
//             </li>
//           ))}
//         </ol>
//         <form
//           // onSubmit={handleAddIngredient}
//           className="flex items-center space-x-2"
//         >
//           <Input
//             type="text"
//             placeholder="Potato, Milk, ..."
//             //   value={othersText}
//             //   onChange={handleInputChange}
//           />
//           <Button type="submit">Add</Button>
//         </form>

//         <Button
//           className="w-full mt-4"
//           //   onClick={onNextAndSaveData}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
