//frontend/components/onboarding/shoppinglist/shoppinlsit.tsx

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
import { useEffect, useState } from "react";
import { fetchShopping, pushShopping, updateShopping } from "@/utils/UserData";

export default function AddShoping() {
  const [shoppingList, setShoppingList] = useState<any>([]);

  useEffect(() => {
    const getShopping = async () => {
      const response = await fetchShopping();
      console.log(response.data.result);
      if (response.success) {
        setShoppingList(response.data.result);
      } else {
        console.error("something went wrong");
      }
    };
    getShopping();
  }, []);

  const removeItem = (listIndex: number, itemIndex: number) => {
    const newShoppingList = shoppingList.map(
      (list: string[], index: number) => {
        if (index === listIndex) {
          return list.filter((_, i) => i !== itemIndex);
        }
        return list;
      }
    );
    setShoppingList(newShoppingList);
  };

  const sendShoppingList = async () => {
    const flattenedShoppingList = shoppingList.flat();

    const response = await updateShopping(flattenedShoppingList);
    if (response.success) {
      console.log("Shopping list updated successfully.");
    } else {
      console.error("Failed to update shopping list.");
    }
  };

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
              {shoppingList?.map((items: string[], listIndex: number) => (
                <div key={listIndex} className="mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[32px]" />
                        <TableHead>Item</TableHead>
                        <TableHead className="w-[32px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item: string, itemIndex: number) => (
                        <TableRow key={itemIndex}>
                          <TableCell>
                            <Checkbox
                              id={`checkbox-${listIndex}-${itemIndex}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              defaultValue={item}
                              id={`item-${listIndex}-${itemIndex}-name`}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeItem(listIndex, itemIndex)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
              <div className="flex justify-center space-x-5">
                <Button size="sm" onClick={() => sendShoppingList()}>
                  Done
                </Button>
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

function TrashIcon(props: any) {
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
