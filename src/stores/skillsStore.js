import { create } from 'zustand';

export const useSkillsStore = create((set) => ({
    skills: { docs: [] },
    isLoading: false,
    error: null,

    fetchSkills: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch skills: ${response.status}`);
            }

            const data = await response.json();
            set({ skills: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching skills:', error);
        }
    },
}));