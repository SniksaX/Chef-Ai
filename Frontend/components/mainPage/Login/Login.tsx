"use client ";

import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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

const LoginPage = () => {
  const router = useRouter();

  const handleOnclick = () => {
    router.push("/crm");
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white bg-transparent">
          Login
        </CardTitle>
        <CardDescription className="text-white bg-transparent">
          Enter your email and password below to Login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"></div>
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="email ">Email</Label>
          <Input
            className="text-black"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2 text-white">
          <Label htmlFor="password">Password</Label>
          <Input
            className="text-black"
            id="password"
            type="password"
            // onChange={(e) => setPassword(e.target.value)}
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
        {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-red-500"></p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none">
              Close
            </button>
          </div>
        </div> */}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-white text-black"
          onClick={() => handleOnclick()}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
