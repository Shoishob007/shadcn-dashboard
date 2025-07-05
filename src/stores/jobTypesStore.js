import { create } from 'zustand';

export const useJobTypesStore = create((set) => ({
    jobTypes: { docs: [] },
    isLoading: false,
    error: null,

    fetchJobTypes: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-types`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch job types: ${response.status}`);

            const data = await response.json();
            set({ jobTypes: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching job types:', error);
        }
    },
}));