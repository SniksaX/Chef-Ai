"use client";

//frontend/components/crm//uploadfile.tsx
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UploadWindow({
  setFileName,
}: {
  setFileName: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileNames = Array.from(event.target.files).map((file) => file.name);
      setSelectedFiles(fileNames);
      setFileName(fileNames);
    }
  };

  return (
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
                  <li key={index}>{file}</li>
                ))}
              </ul>
            )}
          </div>

          <input type="file" multiple onChange={handleFileChange} />
          <Button variant="outline">Submit</Button>
        </div>
      </div>
    </div>
  );
}
