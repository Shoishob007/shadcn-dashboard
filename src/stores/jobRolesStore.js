import { create } from 'zustand';
import qs from 'qs';

export const useJobRolesStore = create((set) => ({
    jobRoles: { docs: [] },
    isLoading: false,
    error: null,

    fetchJobRoles: async (accessToken, orgID) => {
        set({ isLoading: true, error: null });
        try {
            const query = qs.stringify({
                where: {
                    'industryType.id': { $in: [orgID] }
                }
            }, { addQueryPrefix: true });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-roles${query}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch job roles: ${response.status}`);

            const data = await response.json();
            set({ jobRoles: data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching job roles:', error);
        }
    },
}));