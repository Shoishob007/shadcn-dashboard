import { create } from "zustand";

export const useSkillsStore = create((set) => ({
  skillTags: [],
  addSkill: (skill) =>
    set((state) => ({
      skillTags: state.skillTags.includes(skill)
        ? state.skillTags
        : [...state.skillTags, skill],
    })),
  removeSkill: (skill) =>
    set((state) => ({
      skillTags: state.skillTags.filter((s) => s !== skill),
    })),
}));