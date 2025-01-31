import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useProfileStore = create((set, get) => ({
    profileDetails: null,
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
    },
    loading: false,
    error: null,

    setFormData: (newData) =>
        set((state) => ({
            formData: { ...state.formData, ...newData },
        })),

    fetchProfile: async (accessToken, orgID) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch profile details");
            }

            const profile = await response.json();
            // console.log(profile)
            set({
                profileDetails: profile,
                formData: { ...get().formData, ...profile },
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

        console.log("Image id::", get().formData)

        try {
            const transformedFormData = {
                ...get().formData,
                img: get().formData?.img?.id,
                socialLinks: get().formData.socialLinks?.map((link) => ({
                    socialMediaUrl: link.socialMediaUrl,
                    socialMedia: link.socialMedia?.id,
                })),
            };

            console.log("Transformed Data ::", transformedFormData)

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
            set({
                profileDetails: updatedProfile,
                formData: { ...get().formData, ...updatedProfile },
            });

            toast({
                title: "Success!",
                description:"Profile updated successfully.",
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
