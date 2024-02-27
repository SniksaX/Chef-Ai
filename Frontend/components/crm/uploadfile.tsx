"use client";

//frontend/components/crm//uploadfile.tsx
import { Button } from "@/components/ui/button";
import { pushImage } from "@/utils/UserData";
import { LoaderIcon } from "@/utils/animation";
import { SetStateAction, useState } from "react";

interface UploadWindowProps {
  onDetectionComplete?: (detectedIngredients: string[]) => void;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function UploadWindow({
  onDetectionComplete,
  setShowModal,
  setIsLoading,
  isLoading,
}: UploadWindowProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const sendImage = async () => {
    if (!selectedFiles.length) {
      alert("No files selected");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    const result = await pushImage(formData);
    if (result.success) {
      const detectionResults = result.data.detectionResult.content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length);
      onDetectionComplete?.(detectionResults);
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return !isLoading ? (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
      style={{ width: "70%", height: "60%" }}
    >
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center">Upload Files</h2>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-full h-64 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700">
            {selectedFiles.length > 0 && (
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
          <div className="flex">
            <Button
              variant="outline"
              onClick={() => {
                sendImage();
                setIsLoading(true);
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowModal(false);
              }}
            >
              close
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mb-2">
      <LoaderIcon className=" text-gray-600 animate-spin" />
    </div>
  );
}
