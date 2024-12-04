import { create } from "zustand";

export const useStudyFieldStore = create((set) => ({
  studyFieldTags: [],
  addStudyField: (studyField) =>
    set((state) => ({
      studyFieldTags: state.studyFieldTags.includes(studyField)
        ? state.studyFieldTags
        : [...state.studyFieldTags, studyField],
    })),
  removeStudyField: (studyField) =>
    set((state) => ({
      studyFieldTags: state.studyFieldTags.filter((s) => s !== studyField),
    })),
}));