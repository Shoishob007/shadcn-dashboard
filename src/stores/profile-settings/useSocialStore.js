import { create } from "zustand";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid"

const socialMediaIds = {
    facebook: "f42982dd-4eba-4e8e-9294-6a9458fe0826",
    linkedin: "b8418d31-0265-4cee-bdec-9c16fa160c1d",
    twitter: "c8418d31-0265-4cee-bdec-9c16fa160c1e",
    github: "d8418d31-0265-4cee-bdec-9c16fa160c1f",
    instagram: "e8418d31-0265-4cee-bdec-9c16fa160c1g",
    youtube: "f8418d31-0265-4cee-bdec-9c16fa160c1h"
};

const useSocialStore = create((set, get) => ({
    socialDetails: null,
    formData: {
        github: "",
        twitter: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        youtube: "",
    },
    loading: false,

    setFormData: (newData) =>
        set((state) => ({ formData: { ...state.formData, ...newData } })),

    fetchSocialDetails: async (token) => {
        set({ loading: true });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch social links.");

            const data = await response.json();
            const socialLinks = data.docs[0].socialLinks || [];

            // Converting array to object format for form data
            const socialData = socialLinks.reduce((acc, link) => {
                const platform = Object.entries(socialMediaIds).find(
                    ([_, id]) => id === link.socialMedia
                )?.[0];
                if (platform) {
                    acc[platform] = link.socialMediaUrl;
                }
                return acc;
            }, {});

            set({
                socialDetails: socialLinks,
                formData: socialData
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error fetching social links",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },

    saveSocial: async (token, orgID, customFormData = null) => {
        set({ loading: true });
        try {
            const formDataToUse = customFormData || get().formData;

            // Converting form data to required format
            const socialLinks = Object.entries(formDataToUse)
                .filter(([_, url]) => url.trim() !== "")
                .map(([platform, url]) => ({
                    socialMedia: socialMediaIds[platform],
                    socialMediaUrl: url
                }));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ socialLinks }),
                }
            );

            if (!response.ok) throw new Error("Failed to save social links.");

            const updatedData = await response.json();
            set({ socialDetails: updatedData.doc.socialLinks });

            toast({
                title: "Social links updated successfully!",
                variant: "ourSuccess",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error updating social links",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useSocialStore;