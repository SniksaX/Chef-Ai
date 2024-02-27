import HistoryPage from "@/components/crm/history";

export default function Component() {
  return <HistoryPage />;
}

// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/95y11yQ3mqh
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <div className="bg-white p-6 grid grid-cols-4 gap-6">
//       <div className="flex flex-col">
//         <img
//           alt="Pear and Gorgonzola Cheese Pizza"
//           className="rounded-lg"
//           height="200"
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "250/200",
//             objectFit: "cover",
//           }}
//           width="250"
//         />
//         <Badge className="absolute mt-2 ml-2" variant="secondary">
//           Featured
//         </Badge>
//         <h3 className="mt-4 text-xl font-semibold">Pear and Gorgonzola Cheese Pizza</h3>
//         <div className="flex items-center mt-1">
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <span className="ml-2 text-lg font-semibold">5.0</span>
//         </div>
//         <span className="text-sm text-gray-500">2 ratings</span>
//         <div className="flex items-center mt-2">
//           <ClockIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Prep Time: 10 mins</span>
//         </div>
//         <div className="flex items-center mt-1">
//           <MicrowaveIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Cook Time: 15 mins</span>
//         </div>
//         <Button className="mt-4" variant="outline">
//           Bakery
//         </Button>
//       </div>
//       <div className="flex flex-col">
//         <img
//           alt="Mushroom and cream cheese pizza"
//           className="rounded-lg"
//           height="200"
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "250/200",
//             objectFit: "cover",
//           }}
//           width="250"
//         />
//         <Badge className="absolute mt-2 ml-2">Picked</Badge>
//         <h3 className="mt-4 text-xl font-semibold">Mushroom and cream cheese pizza</h3>
//         <div className="flex items-center mt-1">
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-gray-300" />
//           <span className="ml-2 text-lg font-semibold">4.0</span>
//         </div>
//         <span className="text-sm text-gray-500">1 ratings</span>
//         <div className="flex items-center mt-2">
//           <ClockIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Prep Time: 28 mins</span>
//         </div>
//         <div className="flex items-center mt-1">
//           <MicrowaveIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Cook Time: 10 mins</span>
//         </div>
//         <Button className="mt-4" variant="outline">
//           Bakery
//         </Button>
//       </div>
//       <div className="flex flex-col">
//         <img
//           alt="Vegan lasagne with eggplant bechamel"
//           className="rounded-lg"
//           height="200"
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "250/200",
//             objectFit: "cover",
//           }}
//           width="250"
//         />
//         <Badge className="absolute mt-2 ml-2">Picked</Badge>
//         <h3 className="mt-4 text-xl font-semibold">Vegan lasagne with eggplant bechamel</h3>
//         <div className="flex items-center mt-1">
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <span className="ml-2 text-lg font-semibold">5.0</span>
//         </div>
//         <span className="text-sm text-gray-500">1 ratings</span>
//         <div className="flex items-center mt-2">
//           <ClockIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Prep Time: 35 mins</span>
//         </div>
//         <div className="flex items-center mt-1">
//           <MicrowaveIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Cook Time: 12 mins</span>
//         </div>
//         <Button className="mt-4" variant="outline">
//           Budget
//         </Button>
//       </div>
//       <div className="flex flex-col">
//         <img
//           alt="Sneaky pumpkin and cheese muffins"
//           className="rounded-lg"
//           height="200"
//           src="/placeholder.svg"
//           style={{
//             aspectRatio: "250/200",
//             objectFit: "cover",
//           }}
//           width="250"
//         />
//         <Badge className="absolute mt-2 ml-2" variant="secondary">
//           Featured
//         </Badge>
//         <h3 className="mt-4 text-xl font-semibold">Sneaky pumpkin and cheese muffins</h3>
//         <div className="flex items-center mt-1">
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarIcon className="text-yellow-400" />
//           <StarHalfIcon className="text-yellow-400" />
//           <span className="ml-2 text-lg font-semibold">4.5</span>
//         </div>
//         <span className="text-sm text-gray-500">2 ratings</span>
//         <div className="flex items-center mt-2">
//           <ClockIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Prep Time: 15 mins</span>
//         </div>
//         <div className="flex items-center mt-1">
//           <MicrowaveIcon className="text-gray-500" />
//           <span className="ml-1 text-sm text-gray-500">Cook Time: 10 mins</span>
//         </div>
//         <Button className="mt-4" variant="outline">
//           Bakery
//         </Button>
//       </div>
//     </div>
//   )
// }

// function ClockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   )
// }

// function MicrowaveIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="15" x="2" y="4" rx="2" />
//       <rect width="8" height="7" x="6" y="8" rx="1" />
//       <path d="M18 8v7" />
//       <path d="M6 19v2" />
//       <path d="M18 19v2" />
//     </svg>
//   )
// }

// function StarHalfIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
//     </svg>
//   )
// }

// function StarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   )
// }
