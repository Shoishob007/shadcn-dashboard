import { create } from "zustand";

export const useStudyFieldStore = create((set) => ({
  fieldOfStudyTags: [],
  addFieldOfStudy: (studyField) =>
    set((state) => ({
      fieldOfStudyTags: state.fieldOfStudyTags.some((s) => s.id === studyField.id)
        ? state.fieldOfStudyTags
        : [...state.fieldOfStudyTags, studyField],
    })),
  removeFieldOfStudy: (studyFieldId) =>
    set((state) => ({
      fieldOfStudyTags: state.fieldOfStudyTags.filter((s) => s.id !== studyFieldId),
    })),
  initializeFieldOfStudy: (studyFields = []) => {
    set({ fieldOfStudyTags: Array.isArray(studyFields) ? studyFields : [] });
  },
  resetStudyFields: () => set({ fieldOfStudyTags: [] }),
}));