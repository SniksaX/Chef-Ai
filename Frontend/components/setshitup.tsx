"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dataUser } from "@/utils/MyTypes";
import SetUserData from "@/utils/UserData";

export default function SetShitUp({
  setShowSetup,
}: {
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dataUser, setDataUser] = useState<dataUser>({
    Allergies: null,
    CuisineType: null,
    Regime: null,
  });

  const [n, nSet] = useState<number>(0);
  const [showContent1, setShowContent1] = useState<boolean>(false);
  const [showContent2, setShowContent2] = useState<boolean>(false);
  const [showContent3, setShowContent3] = useState<boolean>(false);

  const handleSubmission = () => {
    if (!showContent1) {
      setShowContent1(true);
    } else if (!showContent2) {
      setShowContent2(true);
    } else if (!showContent3) {
      setShowContent3(true);
    }
    nSet(n + 32);
  };

  const handleuserData = async () => {
    const response = await SetUserData(dataUser);
  };

  useEffect(() => {
    if (n > 99) {
      console.log(dataUser);
      handleuserData();
      setShowSetup(false);
    }
  }, [n]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="text-white">
          Before we start we need some informations
        </div>
      </CardHeader>
      {showContent1 && (
        <CardContent>
          <div className="grid w-full gap-2 text-sm">
            <div className="grid gap-2">
              <Label htmlFor="allergy-name" className="text-white">
                Allergies
              </Label>
              <Input
                id="allergy-name"
                placeholder="E.g. Peanuts..."
                onChange={(e) =>
                  setDataUser((prevData) => {
                    return { ...prevData, Allergies: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      )}
      {showContent2 && (
        <CardContent>
          <div className="grid w-full gap-2 text-sm">
            <div className="grid gap-2">
              <Label htmlFor="Cuisine " className="text-white">
                What Type of Cuisine you want to eat ?
              </Label>
              <Input
                id="allergy-name"
                placeholder="E.g. Mexican, Corean..."
                onChange={(e) =>
                  setDataUser((prevData) => {
                    return { ...prevData, CuisineType: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      )}
      {showContent3 && (
        <CardContent>
          <div className="grid w-full gap-2 text-sm">
            <div className="grid gap-2">
              <Label htmlFor="allergy-name" className="text-white">
                What regime are you following ?
              </Label>
              <Input
                id="allergy-name"
                placeholder="E.g. without gluten, vegan, without salt..."
                onChange={(e) =>
                  setDataUser((prevData) => {
                    return { ...prevData, Regime: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="flex">
        <Button size="sm" onClick={handleSubmission}>
          Next
        </Button>
      </CardFooter>
      <Progress value={n} />
    </Card>
  );
}
