import { create } from "zustand";

const useRoleStore = create((set) => ({
  currentRole: "applicant",
  setRole: (role) => set({ currentRole: role }),
}));

export default useRoleStore;
