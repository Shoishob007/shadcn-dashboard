// "use client";

// import PageTitle from "@/components/PageTitle";
// import FormatTitle from "@/components/TitleFormatter";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { usePathname, useRouter } from "next/navigation";
// import complexityPhoto from "../../../../../public/assests/complexity.png";
// import internet from "../../../../../public/assests/internet.png";
// import puzzle from "../../../../../public/assests/puzzle.png";
// import algorithm from "../../../../../public/assests/algorithm.png";

// import Image from "next/image";

// const JobsPage = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pageTitle = FormatTitle(pathname);

//   const handleNavigation = (route) => {
//     router.push(route);
//   };

//   return (
//     <div className="flex flex-col space-y-4 w-full">
//       <PageTitle title={pageTitle} className={"ml-2"} />

//       <div className="grid grid-cols-1 gap-6 md:w-full text-center">
//         {/* For jobs data */}
//         <div className="flex">
//           <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//             <Image
//               src={complexityPhoto}
//               alt="complexity"
//               width={160}
//               className="p-4 ml-10"
//             />
//           </div>
//           <Card
//             className="cursor-pointer flex-1 hover:border-gray-950 border-none shadow-none rounded-l-none transition-shadow duration-300 ease-in-out"
//             onClick={() => handleNavigation("/jobs/view")}
//           >
//             <CardHeader>
//               <CardTitle>View All Jobs</CardTitle>
//               <CardDescription className="text-xs md:text-sm">
//                 Browse and manage all the job postings available on the
//                 platform.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="text-sm">
//               Click to view the list of available job positions.
//             </CardContent>
//           </Card>
//         </div>

//         {/* for creating jobs */}
//         <div className="flex">
//           <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//             <Image
//               src={internet}
//               alt="complexity"
//               width={160}
//               className="p-4 ml-10"
//             />
//           </div>
//           <Card
//             className="cursor-pointer flex-1 hover:border-gray-950 border-none shadow-none rounded-l-none transition-shadow duration-300 ease-in-out"
//             onClick={() => handleNavigation("/jobs/create")}
//           >
//             <CardHeader>
//               <CardTitle>Create a New Job</CardTitle>
//               <CardDescription className="text-xs md:text-sm">
//                 Post a new job and manage your job listings effectively.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="text-sm">
//               Click to create a new job posting.
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex">
//           <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//             <Image
//               src={puzzle}
//               alt="complexity"
//               width={160}
//               className="p-4 ml-10"
//             />
//           </div>
//           <Card
//             className="cursor-pointer flex-1 hover:border-gray-950 border-none shadow-none rounded-l-none transition-shadow duration-300 ease-in-out"
//             onClick={() => handleNavigation("/jobs/view/open")}
//           >
//             <CardHeader>
//               <CardTitle>View Open Jobs</CardTitle>
//               <CardDescription className="text-xs md:text-sm">
//                 Browse and manage all the open jobs on the platform.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="text-sm">
//               Click to view the list of available open job positions.
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex">
//           <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//             <Image
//               src={algorithm}
//               alt="complexity"
//               width={160}
//               className="p-4 ml-10"
//             />
//           </div>
//           <Card
//             className="cursor-pointer flex-1 hover:border-gray-950 border-none shadow-none rounded-l-none transition-shadow duration-300 ease-in-out"
//             onClick={() => handleNavigation("/jobs/view/closed")}
//           >
//             <CardHeader>
//               <CardTitle>View Closed Jobs</CardTitle>
//               <CardDescription>
//                 Browse and manage all the closed jobs on the platform.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="text-sm">
//               Click to view the list of available closed job positions.
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobsPage;
