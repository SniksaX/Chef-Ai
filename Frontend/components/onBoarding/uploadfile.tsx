//frontend//components/crm/uploadfile.tsx

import { SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pushImage } from "@/utils/UserData";
import { Progress } from "@radix-ui/react-progress";
import { LoaderIcon } from "@/utils/animation";

interface UploadWindowProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setCustomIngredients: React.Dispatch<SetStateAction<string[]>>;
}

export default function UploadWindow({
  setShowModal,
  setCustomIngredients,
}: UploadWindowProps) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);

    if (files.length > 3) {
      setError("You can only upload up to 3 images.");
      setImagePreviews([]);
      setSelectedFiles([]);
      return;
    }

    setError("");
    setImagePreviews([]);
    setSelectedFiles(files);

    files.forEach((file: any) => {
      if (file.type.substr(0, 5) === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handlePreviousClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imagePreviews.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imagePreviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleSubmit = async () => {
    if (!selectedFiles.length) {
      alert("No files selected");
      return;
    }
    setShowProgress(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    const result = await pushImage(formData);
    if (result.success) {
      const detectedIngredients =
        result.data.detectionResult.split(/[\d\.]+\s*/);
      // .map((ingredient) => ingredient.trim())
      // .filter((ingredient) => ingredient.length > 0);

      setCustomIngredients(detectedIngredients);
      setShowModal(false);
    } else {
      setError("Failed to upload images. Please try again.");
    }
  };

  if (!showProgress) {
    return (
      <div className="grid w-full max-w-md bg-slate-100 border-collapse items-center gap-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="border-collapse border-gray-300 rounded-md p-4 relative">
          {imagePreviews.length > 0 ? (
            <img
              alt="Image Preview"
              className="object-cover"
              height={400}
              src={imagePreviews[currentImageIndex]}
              width={400}
            />
          ) : (
            <img
              alt="Placeholder"
              className="object-cover"
              height={400}
              src="/placeholder.svg"
              width={400}
            />
          )}
          <p className="text-center text-gray-500">Image Preview</p>
          {imagePreviews.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between">
              <Button className="p-2" onClick={handlePreviousClick}>
                {"<"}
              </Button>
              <Button className="p-2" onClick={handleNextClick}>
                {">"}
              </Button>
            </div>
          )}
        </div>
        <Label htmlFor="image">Select Image</Label>
        <Input
          className="border-gray-300 p-2 rounded-md"
          id="image"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <div className="flex flex-col items-center gap-2">
          <Button className="w-1/2" onClick={handleSubmit}>
            Upload Image
          </Button>
          <Button className="w-1/2" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
        <div className="h-2 bg-gray-200 rounded-md">
          <div className="h-full bg-green-500 w-1/2" />
        </div>
        <p className="text-center text-gray-500">50% Generating</p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center mb-2">
        <LoaderIcon className=" text-gray-600 animate-spin" />
      </div>
    );
  }
}

// import { Button } from "@/components/ui/button";
// import { pushImage } from "@/utils/UserData";
// import { LoaderIcon } from "@/utils/animation";
// import { SetStateAction, useState } from "react";

// interface UploadWindowProps {
//   onDetectionComplete?: (detectedIngredients: string[]) => void;
//   setShowModal: React.Dispatch<SetStateAction<boolean>>;
//   setIsLoading: React.Dispatch<SetStateAction<boolean>>;
//   isLoading: boolean;
// }

// export default function UploadWindow({
//   onDetectionComplete,
//   setShowModal,
//   setIsLoading,
//   isLoading,
// }: UploadWindowProps) {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFiles(Array.from(event.target.files));
//     }
//   };

//   const sendImage = async () => {
//     if (!selectedFiles.length) {
//       alert("No files selected");
//       return;
//     }

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append("file", file);
//     });

//     const result = await pushImage(formData);
//     if (result.success) {
//       const detectionResults = result.data.detectionResult.content
//         .split("\n")
//         .map((line) => line.trim())
//         .filter((line) => line.length);
//       onDetectionComplete?.(detectionResults);
//       setIsLoading(false);
//       setShowModal(false);
//     }
//   };

//   return !isLoading ? (
//     <div
//       className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
//       style={{ width: "70%", height: "60%" }}
//     >
//       <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-md shadow-md dark:bg-gray-800">
//         <h2 className="text-2xl font-bold text-center">Upload Files</h2>
//         <div className="flex flex-col items-center space-y-2">
//           <div className="w-full h-64 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700">
//             {selectedFiles.length > 0 && (
//               <ul>
//                 {selectedFiles.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <input
//             type="file"
//             multiple
//             accept="image/jpeg,image/png"
//             onChange={handleFileChange}
//           />
//           <div className="flex">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 sendImage();
//                 setIsLoading(true);
//               }}
//             >
//               Submit
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setShowModal(false);
//               }}
//             >
//               close
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex justify-center items-center mb-2">
//       <LoaderIcon className=" text-gray-600 animate-spin" />
//     </div>
//   );
// }
