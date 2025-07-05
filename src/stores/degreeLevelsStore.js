import { create } from 'zustand';

export const useDegreeLevelsStore = create((set) => ({
    degreeLevels: { docs: [] },
    isLoading: false,
    error: null,

    fetchDegreeLevels: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch degree levels: ${response.status}`);

            const data = await response.json();
            set({ degreeLevels: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching degree levels:', error);
        }
    },
}));