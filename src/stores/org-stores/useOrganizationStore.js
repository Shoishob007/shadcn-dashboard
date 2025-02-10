import { create } from 'zustand';

const useOrganizationStore = create((set) => ({
    industryTypes: [],

    setIndustryTypes: (industryTypes) => set({ industryTypes }),

    fetchOrganizations: async (accessToken) => {
        console.log("Starting fetchOrganizations with token:", accessToken?.slice(0, 10));

        if (!accessToken) {
            console.error("No access token provided");
            return null;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch organizations: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data.docs?.[0]?.industryType) {
                const industryTypes = data.docs[0].industryType.map(type => ({
                    id: type.id,
                    title: type.title,
                }));
                console.log("Setting industry types:", industryTypes);
                set({ industryTypes });
                return industryTypes;
            } else {
                console.log("No industry types found in response");
                return null;
            }
        } catch (error) {
            console.error("Error in fetchOrganizations:", error);
            return null;
        }
    },
}));

export default useOrganizationStore;