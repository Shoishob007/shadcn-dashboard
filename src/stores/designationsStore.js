import { create } from 'zustand';

export const useDesignationsStore = create((set) => ({
    designations: { docs: [] },
    isLoading: false,
    error: null,

    fetchDesignations: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/designations`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch designations: ${response.status}`);

            const data = await response.json();
            set({ designations: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching designations:', error);
        }
    },
}));