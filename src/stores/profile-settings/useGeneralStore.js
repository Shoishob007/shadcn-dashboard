import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const useGeneralStore = create((set, get) => ({
    formData: {
        name: "",
        email: "",
    },

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    saveInfo: async (sessionUser) => {
        set({ loading: true });
        try {
            console.log("Saving profile info:", { ...sessionUser, ...get().formData });
            // here goes the profile info saving logic
            toast({ title: "Profile updated successfully!", variant: "success" });
        } catch (error) {
            console.error("Error saving profile details:", error);
            toast({ title: "Error updating profile details", variant: "destructive" });
        }
    },
}));

export default useGeneralStore;