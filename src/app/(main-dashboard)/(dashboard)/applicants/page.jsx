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
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import complexityPhoto from "../../../../../public/assests/complexity.png";
// import labyrinth from "../../../../../public/assests/labyrinth.png";
// import framework from "../../../../../public/assests/framework.png";

// const ApplicantsPage = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleNavigation = (route) => {
//     router.push(route);
//   };

//   const pageTitle = FormatTitle(pathname);

//   return (
//     <>
//       {" "}
//       <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
//       <div className="flex flex-col space-y-4 items-center  text-center justify-center">
//         <div className="w-full grid grid-cols-1 gap-6">
//           {/* For applicants data */}
//           <div className="flex">
//             <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//               <Image
//                 src={complexityPhoto}
//                 alt="complexity"
//                 width={160}
//                 className="p-4 ml-10"
//               />
//             </div>
//             <Card
//               className="cursor-pointer flex-1 shadow-none border-none hover:border-gray-950 transition-shadow duration-300 ease-in-out rounded-l-none"
//               onClick={() => handleNavigation("/applicants/view")}
//             >
//               <CardHeader>
//                 <CardTitle className="text-xl">View All Applicants</CardTitle>
//                 <CardDescription className="text-xs md:text-sm">
//                   Browse and manage all the applicants available for the jobs.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="text-sm">
//                 Click to view the list of applicants regardless the job
//                 positions.
//               </CardContent>
//             </Card>
//           </div>

//           {/* for shortlisted applicants */}
//           <div className="flex">
//             <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//               <Image
//                 src={labyrinth}
//                 alt="complexity"
//                 width={160}
//                 className="p-4 ml-10"
//               />
//             </div>
//             <Card
//               className="cursor-pointer flex-1 shadow-none hover:border-gray-950 border-none transition-shadow duration-300 ease-in-out rounded-l-none"
//               onClick={() => handleNavigation("/applicants/view/shortlisted")}
//             >
//               <CardHeader>
//                 <CardTitle className="text-xl">
//                   View Shortlisted Applicants
//                 </CardTitle>
//                 <CardDescription className="text-xs md:text-sm">
//                   Browse and manage the shortlisted applicants
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="text-sm">
//                 Click to view all the shortlisted applicants along with the
//                 respective jobs.
//               </CardContent>
//             </Card>
//           </div>

//           <div className="flex">
//             <div className="dark:text-gray-200 bg-white dark:bg-gray-700 rounded-l-lg hidden md:block">
//               <Image
//                 src={framework}
//                 alt="complexity"
//                 width={160}
//                 className="p-4 ml-10"
//               />
//             </div>
//             <Card
//               className="cursor-pointer flex-1 hover:border-gray-950 shadow-none border-none transition-shadow duration-300 ease-in-out rounded-l-none"
//               onClick={() => handleNavigation("/applicants/view/hired")}
//             >
//               <CardHeader>
//                 <CardTitle className="text-xl">View Hired Applicants</CardTitle>
//                 <CardDescription className="text-xs md:text-sm">
//                   Browse and manage the hired applicants
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="text-sm">
//                 Click to view all the hired applicants along with the respective
//                 designation.
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ApplicantsPage;
