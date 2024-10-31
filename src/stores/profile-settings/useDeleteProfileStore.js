import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const useDeleteProfileStore = create((set) => ({
    formData: {
        password: "",
    },

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    resetFormData: () => set({
        formData: {
            password: "",
        }
    }),

    deleteProfile: async (password) => {
        try {
            console.log("Submitted details:", password);
            // here goes the password saving logic
            toast({ title: "Account deleted successfully!", variant: "success" });
        } catch (error) {
            console.error("Error in deleting account:", error);
            toast({ title: "Error in deleting account", variant: "destructive" });
        }
    },
}));

export default useDeleteProfileStore;