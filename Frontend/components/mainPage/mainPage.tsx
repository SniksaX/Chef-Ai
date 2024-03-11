"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function MainPage() {
  const [showSetup, setshowSetup] = useState<boolean>(false);

  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800"></header>
      <section className="flex flex-col items-center justify-center flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to AI App
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Experience the future of AI technology today.
        </p>
        <Button
          className="mt-4 px-8 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={(e) => setshowSetup(true)}
        >
          Get Started
        </Button>
      </section>
      <section className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Card>
            <CardHeader>
              <AppleIcon className="h-8 w-8 text-gray-900 dark:text-gray-100" />
              <CardTitle>Intelligent Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              Our AI analyzes your data to provide valuable insights.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <DatabaseIcon className="h-8 w-8 text-gray-900 dark:text-gray-100" />
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              Efficiently manage and organize your data with our AI.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <LockIcon className="h-8 w-8 text-gray-900 dark:text-gray-100" />
              <CardTitle>Secure Processing</CardTitle>
            </CardHeader>
            <CardContent>
              Your data is safe with us. We prioritize security in all our
              processes.
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function AppleIcon(props: any) {
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
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function DatabaseIcon(props: any) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function LockIcon(props: any) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
