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

    setFormData: (newData) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...newData,
                industryType: Array.isArray(newData?.industryType)
                    ? newData.industryType
                    : state.formData.industryType || [],
            },
        })),

    fetchIndustryTypes: async (accessToken) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/industry-types`,
                {
                    method: "GET",
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
            set({ industryTypes: Array.isArray(data?.docs) ? data.docs : [] });

        } catch (error) {
            console.error("Error fetching industry types:", error);
            toast({
                title: "Error fetching industry types.",
                description: error.message,
                variant: "ourDestructive",
            });
        }
    },

    fetchProfile: async (accessToken, orgID) => {
        console.log("triggered")
        set({ loading: true, error: null });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "GET",
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
            set({
                profileDetails: profile,
                formData: {
                    ...get().formData,
                    ...profile,
                    industryType: Array.isArray(profile?.industryType)
                        ? profile.industryType
                        : [],
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
                industryType: get().formData?.industryType?.map(industry => industry.id),
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
            const processedProfile = {
                ...updatedProfile.doc,
                industryType: Array.isArray(updatedProfile.doc?.industryType)
                    ? updatedProfile.doc.industryType
                    : [],
            };

            set({
                profileDetails: processedProfile,
                formData: {
                    ...get().formData,
                    ...processedProfile,
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