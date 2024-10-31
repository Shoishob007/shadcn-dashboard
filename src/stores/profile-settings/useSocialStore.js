import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const useSocialStore = create((set, get) => ({
    formData: {
        github: "",
        twitter: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        youtube: "",
    },

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    saveSocial: async (formData) => {
        set({ loading: true });
        try {
            console.log("Saving Social links:", { ...formData, ...get().formData });
            // here goes the social links saving logic
            toast({ title: "Social links updated successfully!", variant: "ourSuccess" });
            console.log(formData)
        } catch (error) {
            console.error("Error saving social links:", error);
            toast({ title: "Error updating social links", variant: "ourDestructive" });
        }
    },
}));

export default useSocialStore;