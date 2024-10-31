import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";


const useProfileStore = create((set, get) => ({
    formData: {
        name: "",
        email: "",
        location: "",
        bio: "",
        website: "",
        company: "",
        position: "",
        achievements: "",
    },
    loading: false,

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    saveProfile: async (sessionUser) => {
        set({ loading: true });
        try {
            console.log("Saving profile data:", { ...sessionUser, ...get().formData });
            // here goes the profile saving logic
            toast({ title: "Profile updated successfully!", variant: "ourSuccess" });
        } catch (error) {
            console.error("Error saving profile:", error);
            toast({ title: "Error updating profile.", variant: "ourDestructive" });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useProfileStore;