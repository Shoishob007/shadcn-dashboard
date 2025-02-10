import { create } from "zustand";

export const useDegreeLevelStore = create((set) => ({
  degreeTags: [],
  addDegree: (degree) =>
    set((state) => ({
      degreeTags: state.degreeTags.some((d) => d.id === degree.id)
        ? state.degreeTags
        : [...state.degreeTags, degree],
    })),
  removeDegree: (degreeId) =>
    set((state) => ({
      degreeTags: state.degreeTags.filter((d) => d.id !== degreeId),
    })),
  initializeDegrees: (degrees = []) => {
    set({ degreeTags: Array.isArray(degrees) ? degrees : [] });
  },
  resetDegrees: () => set({ degreeTags: [] }),
}));