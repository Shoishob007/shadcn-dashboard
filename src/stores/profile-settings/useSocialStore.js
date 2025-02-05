import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const socialMediaIds = {
    facebook: "49dd568e-60cf-4f75-b310-be373e19daba",
    linkedin: "49dd568e-60cf-4f75-b310-be373e19daba",
    twitter: "49dd568e-60cf-4f75-b310-be373e19daba",
    github: "49dd568e-60cf-4f75-b310-be373e19daba",
    instagram: "49dd568e-60cf-4f75-b310-be373e19daba",
    youtube: "49dd568e-60cf-4f75-b310-be373e19daba"
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

    fetchSocialDetails: async (token, orgID) => {
        set({ loading: true });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch social links.");

            const data = await response.json();
            const socialLinks = data.socialLinks || [];

            console.log("Fetched social links:", socialLinks);

            const socialData = socialLinks.reduce((acc, link) => {
                const platform = Object.entries(socialMediaIds).find(
                    ([_, id]) => id === link.socialMedia.id
                )?.[0];
                if (platform) {
                    acc[platform] = link.socialMediaUrl || "";
                }
                return acc;
            }, {});

            const resetFormData = {
                github: "",
                twitter: "",
                linkedin: "",
                facebook: "",
                instagram: "",
                youtube: "",
            };

            set({
                socialDetails: socialLinks,
                formData: { ...resetFormData, ...socialData },
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

    saveSocial: async (token, orgID, customFormData = null, imageId) => {
        set({ loading: true });
        try {
            const formDataToUse = customFormData || get().formData;

            const socialLinks = Object.entries(formDataToUse)
                .filter(([_, url]) => url && url.trim() !== "")
                .map(([platform, url]) => ({
                    socialMediaUrl: url,
                    socialMedia: socialMediaIds[platform],
                }));

            console.log("Payload sent: ", socialLinks);

            const payload = {
                socialLinks: socialLinks,
                img: imageId,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error("Failed to save social links.");
            }

            const updatedData = await response.json();

            const newSocialLinks = updatedData.doc.socialLinks;
            const newSocialData = newSocialLinks.reduce((acc, link) => {
                const platform = Object.entries(socialMediaIds).find(
                    ([_, id]) => id === link.socialMedia.id
                )?.[0];
                if (platform) {
                    acc[platform] = link.socialMediaUrl || "";
                }
                return acc;
            }, {});

            const resetFormData = {
                github: "",
                twitter: "",
                linkedin: "",
                facebook: "",
                instagram: "",
                youtube: "",
            };

            set({
                socialDetails: newSocialLinks,
                formData: { ...resetFormData, ...newSocialData },
            });

            toast({
                title: "Success!",
                description: "Social links updated successfully.",
                variant: "ourSuccess",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error updating social links!",
                description: error.message,
                variant: "ourDestructive",
            });
        } finally {
            set({ loading: false });
        }
    },

}));

export default useSocialStore;
