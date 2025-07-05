import { create } from 'zustand';

export const useFieldOfStudiesStore = create((set) => ({
    fieldOfStudies: { docs: [] },
    isLoading: false,
    error: null,

    fetchFieldOfStudies: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch fields of study: ${response.status}`);

            const data = await response.json();
            set({ fieldOfStudies: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching fields of study:', error);
        }
    },
}));