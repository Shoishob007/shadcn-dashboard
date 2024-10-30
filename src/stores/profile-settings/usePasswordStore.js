import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const usePasswordStore = create((set, get) => ({
    formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    },

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    resetFormData: () => set({
        formData: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    }),

    savePassword: async (formData) => {
        try {
            console.log("Saving password:", { ...formData, ...get().formData });
            // here goes the password saving logic
            toast({ title: "Password updated successfully!", variant: "success" });
        } catch (error) {
            console.error("Error saving new password:", error);
            toast({ title: "Error updating password", variant: "destructive" });
        }
    },
}));

export default usePasswordStore;