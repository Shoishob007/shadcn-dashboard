import { create } from "zustand";

export const useStudyFieldStore = create((set) => ({
  fieldOfStudyTags: [],
  addFieldOfStudy: (studyField) =>
    set((state) => ({
      fieldOfStudyTags: state.fieldOfStudyTags.includes(studyField)
        ? state.fieldOfStudyTags
        : [...state.fieldOfStudyTags, studyField],
    })),
    removeFieldOfStudy: (studyField) =>
    set((state) => ({
      fieldOfStudyTags: state.fieldOfStudyTags.filter((s) => s !== studyField),
    })),
    initializeFieldOfStudy: (studyFields = []) => {
      set({ fieldOfStudyTags: Array.isArray(studyFields) ? studyFields : [] });
    },
    resetStudyFields: () => set({ fieldOfStudyTags: [] }),
}));