import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useProfileStore = create((set, get) => ({
    profileDetails: null,
    industryTypes: [],
    formData: {
        orgName: "",
        orgEmail: "",
        orgTagline: "",
        orgMission: "",
        orgVision: "",
        orgAddress: "",
        orgPhone: "",
        orgEstablishedYear: 2024,
        orgWebsiteUrl: "",
        industryType: [],
    },
    loading: false,
    error: null,

    setFormData: (newData) => set((state) => ({
        formData: {
            ...state.formData,
            ...newData
        }
    })),

    // available industry types
    fetchIndustryTypes: async (accessToken) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/industry-types`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch industry types");
            }

            const data = await response.json();
            // Storing the fetched industry types
            set({ industryTypes: data?.docs || [] });
        } catch (error) {
            console.error("Error fetching industry types:", error);
            set({ industryTypes: [] });
            toast({
                title: "Error fetching industry types.",
                description: error.message,
                variant: "ourDestructive",
            });
            throw error;
        }
    },

    fetchProfile: async (accessToken, orgID) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile details");
            }

            const profile = await response.json();
            console.log("profile ::: ", profile);

            const industryTypeIds = Array.isArray(profile.industryType)
                ? profile.industryType.map((industry) => industry.id) // Extracting IDs
                : profile.industryType
                    ? [profile.industryType.id]
                    : [];

            console.log("Processed industryTypeIds:", industryTypeIds);

            set({
                profileDetails: profile,
                formData: {
                    ...get().formData,
                    ...profile,
                    industryType: industryTypeIds,
                },
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            set({ error: error.message });
            toast({
                title: "Error fetching profile.",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },

    saveProfile: async (token, orgID) => {
        set({ loading: true, error: null });
        try {
            const transformedFormData = {
                ...get().formData,
                img: get().formData?.img?.id,
                industryType: get().formData.industryType || [],
                socialLinks: get().formData?.socialLinks?.map((link) => ({
                    socialMediaUrl: link?.socialMediaUrl,
                    socialMedia: link?.socialMedia?.id,
                })),
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(transformedFormData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update organization profile");
            }

            const updatedProfile = await response.json();

            // Update state 
            set({
                profileDetails: updatedProfile.doc,
                formData: {
                    ...get().formData,
                    ...updatedProfile.doc,
                    industryType: updatedProfile.doc.industryType.map((industry) => industry.id), // array of IDs
                },
            });

            toast({
                title: "Success!",
                description: "Profile updated successfully.",
                variant: "ourSuccess",
            });
        } catch (error) {
            console.error("Error saving profile:", error);
            set({ error: error.message });
            toast({
                title: "Error updating profile.",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useProfileStore;