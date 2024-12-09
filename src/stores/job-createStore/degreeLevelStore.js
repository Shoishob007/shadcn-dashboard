import { create } from "zustand";

export const useDegreeLevelStore = create((set) => ({
  degreeTags: [],
  addDegree: (degree) =>
    set((state) => ({
        degreeTags: state.degreeTags.includes(degree)
        ? state.degreeTags
        : [...state.degreeTags, degree],
    })),
  removeDegree: (degree) =>
    set((state) => ({
        degreeTags: state.degreeTags.filter((d) => d !== degree),
    })),
    initializeDegrees: (degrees = []) => {
      set({ degreeTags: Array.isArray(degrees) ? degrees : [] });
    },
    resetDegrees: () => set({ degreeTags: [] }),
}));