// import { create } from "zustand";

// export const useIndustryTypeStore = create((set) => ({
//     industryTypes: [],
//     selectedIndustryTypes: [],
//     setIndustryTypes: (types) => set({ industryTypes: types }),
//     addIndustryType: (type) =>
//         set((state) => ({
//             selectedIndustryTypes: state.selectedIndustryTypes.includes(type)
//                 ? state.selectedIndustryTypes
//                 : [...state.selectedIndustryTypes, type],
//         })),
//     removeIndustryType: (type) =>
//         set((state) => ({
//             selectedIndustryTypes: state.selectedIndustryTypes.filter((t) => t !== type),
//         })),
//     resetIndustryTypes: () => set({ selectedIndustryTypes: [] }),
// }));