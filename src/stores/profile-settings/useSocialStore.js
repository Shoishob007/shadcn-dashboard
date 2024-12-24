import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const socialMediaIds = {
    facebook: "e3541401-a2ec-47fa-8768-b802edb3715b",
    linkedin: "b8418d31-0265-4cee-bdec-9c16fa160c1d",
    twitter: "7f13a915-d487-49a4-a0c3-757d614457d4",
    github: "560de6f7-56fb-4216-8c92-17395384a027",
    instagram: "d99e22a1-c01d-44bb-9075-643c7518c7a0",
    youtube: "6c129b19-7082-41d3-b98b-985fda3ee14e"
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

            // Mapping the socialLinks array to formData
            const socialData = socialLinks.reduce((acc, link) => {
                const platform = Object.entries(socialMediaIds).find(
                    ([_, id]) => id === link.socialMedia.id
                )?.[0];
                if (platform) {
                    acc[platform] = link.socialMediaUrl || "";
                }
                return acc;
            }, {});

            // Reset all platforms to empty strings first
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

            // Preparing the updated social links with only the relevant changes
            const socialLinks = Object.entries(formDataToUse)
                .filter(([_, url]) => url && url.trim() !== "")
                .map(([platform, url]) => ({
                    socialMedia: socialMediaIds[platform],
                    socialMediaUrl: url,
                }));

            // console.log("Social Links:", socialLinks);

            const payload = {
                socialLinks: socialLinks,
                img: imageId,
            };
            console.log("Payload sent: ", payload)

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


            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error("Failed to save social links.");
            }

            const updatedData = await response.json();

             // Updating the store with the new data immediately
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
 
             // Resetting form data with new values
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
                description:"Social links updated successfully.",
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