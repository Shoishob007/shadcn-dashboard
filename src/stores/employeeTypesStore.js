import { create } from 'zustand';

export const useEmployeeTypesStore = create((set) => ({
    employeeTypes: { docs: [] },
    isLoading: false,
    error: null,

    fetchEmployeeTypes: async (accessToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employee-types`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch employee types: ${response.status}`);

            const data = await response.json();
            set({ employeeTypes: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching employee types:', error);
        }
    },
}));