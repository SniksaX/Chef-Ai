"use client ";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { userDataRegisterType } from "@/utils/MyTypes";
import { SignIn } from "@/utils/authLogic";

const SigninPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<userDataRegisterType>({
    firstName: null,
    lastName: null,
    password: null,
    email: null,
    phone: null,
    age: null,
  });

  const handleOnclick = async () => {
    const response = await SignIn(userData);
    if (response?.success) {
      router.push("/");
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white bg-transparent">
          Sign-in
        </CardTitle>
        <CardDescription className="text-white bg-transparent">
          Enter your info below to sign-in
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"></div>
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="firstName ">First Name</Label>
          <Input
            className="text-black"
            id="firstName"
            type="text"
            placeholder="Jhon"
            onChange={(e) =>
              setUserData({
                ...userData,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            className="text-black"
            id="lastName"
            type="text"
            placeholder="Doe"
            onChange={(e) =>
              setUserData({
                ...userData,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="email ">Email</Label>
          <Input
            className="text-black"
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="age ">Age</Label>
          <Input
            className="text-black"
            id="age"
            type="number"
            onChange={(e) =>
              setUserData({
                ...userData,
                age: e.target.value,
              })
            }
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="age ">phone</Label>
          <Input
            className="text-black"
            id="age"
            type="number"
            placeholder="+33123456789"
            onChange={(e) =>
              setUserData({
                ...userData,
                phone: e.target.value,
              })
            }
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="password">Password</Label>
          <Input
            className="text-black"
            id="password"
            type="password"
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-muted-foreground text-white">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline">Google</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-white text-black"
          onClick={() => handleOnclick()}
        >
          Sign-in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
