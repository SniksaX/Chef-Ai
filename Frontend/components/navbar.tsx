"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import LoginPage from "./mainPage/Login/Login";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/register");
  };
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Inc</span>
        </Link>
        <nav className="hidden md:flex gap-4 p-2">
          <button className="text-sm font-medium hover:underline underline-offset-4 hover:bg-white text-black">
            Home
          </button>
          <Modal isvisible={showModal} onClose={() => setShowModal(false)}>
            <LoginPage />
          </Modal>

          <button
            className="text-sm font-medium hover:underline underline-offset-4 bg-white hover:bg-white text-black"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
          <button
            className="text-sm font-medium hover:underline underline-offset-4 bg-white hover:bg-white text-black"
            onClick={handleSignUp}
          >
            Sign-up
          </button>
        </nav>
      </header>
    </div>
  );
};

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Navbar;
