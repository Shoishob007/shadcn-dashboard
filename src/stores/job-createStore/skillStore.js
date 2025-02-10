import { create } from "zustand";

export const useSkillsStore = create((set) => ({
  skillTags: [],
  addSkill: (skill) =>
    set((state) => ({
      skillTags: state.skillTags.some((s) => s.id === skill.id)
        ? state.skillTags
        : [...state.skillTags, skill],
    })),
  removeSkill: (skillId) =>
    set((state) => ({
      skillTags: state.skillTags.filter((s) => s.id !== skillId),
    })),
  initializeSkills: (skills = []) => {
    set({ skillTags: Array.isArray(skills) ? skills : [] });
  },
  resetSkills: () => set({ skillTags: [] }),
}));