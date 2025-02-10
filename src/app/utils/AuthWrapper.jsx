// "use client";

// import { useEffect } from "react";
// import useIndustryTypeStore from "@/stores/authStore/useIndustryTypeStore";

// export default function AuthWrapper({ children }) {
//   const setIndustryType = useIndustryTypeStore(
//     (state) => state.setIndustryType
//   );

//   useEffect(() => {
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop()?.split(";").shift();
//     };

//     const industryTypeCookie = getCookie("industryType");
//     if (industryTypeCookie) {
//       try {
//         const industryType = JSON.parse(industryTypeCookie);
//         setIndustryType(industryType);
//       } catch (error) {
//         console.error("Error parsing industry type:", error);
//       }
//     }
//   }, [setIndustryType]);

//   return <>{children}</>;
// }
