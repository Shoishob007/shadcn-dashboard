// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { cn } from "../lib/utils";
// import { role } from "./RoleManagement";
// import { Nav } from "./ui/nav";
// import useLayoutStore from "@/stores/useLayoutStore";
// import { SidebarLinks } from "./SidebarLinks";

// export default function SideNavbar() {
//   const { status, data: session } = useSession();
//   const { isCollapsed } = useLayoutStore();
//   const { applicantLinks, organizationLinks } = SidebarLinks();

//   if (status === "loading") {
//     return (
//       <div className="flex flex-col-reverse items-center justify-center h-40">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div
//         className={cn(
//           "h-[calc(100vh-1rem)] sticky border-r pb-10 pt-6 bg-white dark:bg-gray-700 my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-hidden", // Make overflow hidden here
//           isCollapsed ? "w-16" : "w-[220px]"
//         )}
//       >
//         {/* Fixed logo section */}
//         <div className="items-center text-center sm:mx-auto mb-4">
//           <Link href={"/"}>
//             <Image
//               src="/assests/hh-logo.png"
//               alt="Logo"
//               width={120}
//               height={120}
//               className={`rounded-lg items-center text-center inline ${
//                 isCollapsed ? "p-2" : "p-0"
//               }`}
//             />
//           </Link>
//         </div>

//         {/* Scrollable menu section */}
//         <div className="overflow-y-auto h-[calc(100vh-14rem)]">
//           <Nav
//             isCollapsed={isCollapsed}
//             links={role === "applicant" ? applicantLinks : organizationLinks}
//           />
//         </div>
//       </div>
//     </>
//   );
// }




// "use client";
// import { useSession, signIn, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { cn } from "../lib/utils";
// import { role } from "./RoleManagement";
// import { Nav } from "./ui/nav";
// import useLayoutStore from "@/stores/useLayoutStore";
// import { SidebarLinks } from "./SidebarLinks";

// export default function SideNavbar() {
//   const { status, data: session } = useSession();
//   const { isCollapsed } = useLayoutStore();
//   const { applicantLinks, organizationLinks } = SidebarLinks();

//   if (status === "loading") {
//     return (
//       <div className="flex flex-col-reverse items-center justify-center h-40">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "h-[calc(100vh-1rem)] sticky border-r bg-white dark:bg-gray-700 my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out flex flex-col",
//         isCollapsed ? "w-16" : "w-[220px]"
//       )}
//     >
//       {/* Top section with logo */}
//       <div className="items-center text-center sm:mx-auto mb-4">
//         <Link href={"/"}>
//           <Image
//             src="/assests/hh-logo.png"
//             alt="Logo"
//             width={120}
//             height={120}
//             className={`rounded-lg items-center text-center inline ${
//               isCollapsed ? "p-2" : "p-0"
//             }`}
//           />
//         </Link>
//       </div>

//       <div className="flex-grow overflow-y-auto mb-4">
        
//         <Nav
//           isCollapsed={isCollapsed}
//           links={role === "applicant" ? applicantLinks.filter(link => link.label !== "Get Started") : organizationLinks.filter(link => link.label !== "Get Started")}
//         />
//       </div>

//       <div className="flex justify-center pb-4 mt-auto">
//         {session ? (
//           <button
//             onClick={() => signOut()}
//             className="bg-primary hover:bg-primary-dark text-white font-medium text-sm py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             onClick={() => signIn()}
//             className="bg-primary hover:bg-primary-dark text-white font-medium text-sm py-2 px-4 rounded"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { role } from "./RoleManagement";
import { Nav } from "./ui/nav";
import useLayoutStore from "@/stores/useLayoutStore";
import { SidebarLinks } from "./SidebarLinks";
import { LogOut } from "lucide-react";

export default function SideNavbar() {
  const { status, data: session } = useSession();
  const { isCollapsed } = useLayoutStore();
  const { applicantLinks, organizationLinks } = SidebarLinks();

  if (status === "loading") {
    return (
      <div className="flex flex-col-reverse items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-[calc(100vh-1rem)] sticky border-r bg-white dark:bg-gray-700 my-2 ml-4 shadow-md rounded-lg transition-all duration-300 ease-in-out flex flex-col py-6",
        isCollapsed ? "w-16" : "w-[220px]"
      )}
    >
      {/* Top section with logo */}
      <div className="items-center text-center sm:mx-auto mb-4">
        <Link href={"/"}>
          <Image
            src="/assests/hh-logo.png"
            alt="Logo"
            width={120}
            height={120}
            className={`rounded-lg items-center text-center inline ${
              isCollapsed ? "p-2" : "p-0"
            }`}
          />
        </Link>
      </div>

      <div className="flex-grow overflow-y-auto mb-4">
        <Nav
          isCollapsed={isCollapsed}
          links={
            role === "applicant"
              ? applicantLinks.filter(link => link.label !== "Get Started")
              : organizationLinks.filter(link => link.label !== "Get Started")
          }
        />
      </div>

      {session && (
        <div className="flex justify-center mt-auto px-4 ml-4">
          {isCollapsed ? (
            <span
              onClick={signOut}
              className="w-full cursor-pointer"
            >
              <span className="sr-only">Logout</span>
              <LogOut width={16} height={16} />
            </span>
          ) : (
            <button
              onClick={signOut}
              className="w-full flex gap-4 cursor-pointer items-center text-xs font-medium"
            >
              <span className="font-medium"><LogOut width={12} height={12} /></span>
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
