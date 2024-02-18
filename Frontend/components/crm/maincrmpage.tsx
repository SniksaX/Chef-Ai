//Frontend/Components/crm/mainCrmPage.tsx

"use client";

import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { Textarea } from "../ui/textarea";
import UploadWindow from "./uploadfile";
import SetShitUp from "../setshitup";

export default function MainCrm() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSetup, setShowSetup] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [conversation, setConversation] = useState<
    Array<{ type: "user" | "ai"; text: string }>
  >([]);
  const [fileName, setFileName] = useState<string[]>([]);

  useEffect(() => {
    if (fileName.length > 0) {
      setMessage(
        (prevMessage) => prevMessage + `${fileName.join("\n") + "\n"}`
      );
    }
  }, [fileName]);

  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();
    if (!message) return;
    setConversation((prev) => [...prev, { type: "user", text: message }]);

    const aiResponse = "hello world";
    setConversation((prev) => [...prev, { type: "ai", text: aiResponse }]);
    setMessage("");
  };

  const handleupload = () => {
    setShowModal(true);
  };

  return (
    <div key="1" className="flex h-screen">
      <aside className="w-16 flex flex-col items-center bg-gray-100 p-4 space-y-4">
        <LayoutDashboardIcon className="h-6 w-6" />
        <MailIcon className="h-6 w-6" />
        <BarChartIcon className="h-6 w-6" />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-gray-200">
          <h1 className="text-lg font-semibold">AI Assistant Dashboard</h1>
          <nav className="flex space-x-4">
            <Button variant="ghost">Settings</Button>
            <Button variant="ghost">Help</Button>
            <Button variant="ghost">Logout</Button>
          </nav>
        </header>
        <section className="flex-1 p-4">
          <div className="flex flex-col h-full bg-white shadow rounded-lg p-4">
            <div className="flex-1 overflow-y-auto h-80">
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      alt="User"
                      src="/placeholder.svg?height=40&width=40"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">User</span>
                </div>
                <span className="text-sm text-gray-500">Today, 5:00 PM</span>
              </div>
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg ? (
                    <p
                      className={
                        msg.type === "user"
                          ? "px-4 py-2 rounded-lg bg-blue-500 text-white break-words max-w-md"
                          : "px-4 py-2 rounded-lg bg-blue-300 text-gray-800 break-words max-w-md"
                      }
                    >
                      {msg.text}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center p-2 border rounded-md">
              <Textarea
                className="w-full p-2 rounded-m  text-blue-900"
                placeholder="Give the Ai a context of how you want the answer to be"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) handleMessageSubmit(e);
                }}
              />
              <Button
                className="ml-2"
                variant="outline"
                onClick={() => handleupload()}
              >
                <PaperclipIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      <aside className="w-16 flex flex-col items-center bg-gray-100 p-4 space-y-4">
        <GaugeIcon className="h-6 w-6" />
        <BellIcon className="h-6 w-6" />
        <UserCircleIcon className="h-6 w-6" />
        <CalendarIcon className="h-6 w-6" />
      </aside>
      <Modal isvisible={showModal} onClose={() => setShowModal(false)}>
        <UploadWindow setFileName={setFileName} />
      </Modal>
      <Modal isvisible={showSetup} onClose={() => setShowSetup(false)}>
        <SetShitUp setShowSetup={setShowSetup} />
      </Modal>
    </div>
  );
}

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function GaugeIcon(props) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LayoutDashboardIcon(props) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function UserCircleIcon(props) {
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
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function PaperclipIcon(props) {
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
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
