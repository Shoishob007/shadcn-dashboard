/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useGeneralStore = create((set, get) => ({
    orgDetails: null,
    formData: {
        orgName: "",
        orgEmail: "",
    },
    loading: false,

    // Fetching organization details
    fetchOrgDetails: async (token, orgID) => {
        set({ loading: true });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch organization details");
            }

            const data = await response.json();
            const org = data.docs[0];
            set({
                orgDetails: org,
                formData: {
                    orgName: org.orgName || "",
                    orgEmail: org.orgEmail || "",
                },
            });
        } catch (error) {
            console.error("Error fetching organization details:", error);
            toast({
                title: "Error fetching organization details",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },

    // Updating organization details
    saveInfo: async (token, orgID) => {
        set({ loading: true });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(get().formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update organization details");
            }

            toast({
                title: "Organization details updated successfully!",
                variant: "ourSuccess",
            });

            // Re-fetching updated details
            await get().fetchOrgDetails(token, orgID);
        } catch (error) {
            console.error("Error updating organization details:", error);
            toast({
                title: "Error updating organization details",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },

    setFormData: (newData) =>
        set((state) => ({
            formData: { ...state.formData, ...newData },
        })),
}));

export default useGeneralStore;
