import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";
import { signIn } from 'next-auth/react';


const useLoginStore = create((set) => ({
    formData: {
        email: "",
        password: "",
    },

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    resetFormData: () => set({
        formData: {
            email: "",
            password: "",
        },
    }),

    loginUser: async (data, router) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: "/",
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            router.push(result?.url || "/");
            toast({
                title: "Signed In!",
                description: "You have signed in successfully.",
                variant: "ourSuccess",
            });
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Can't Sign in!",
                description: error.message || "Invalid credentials",
                variant: "ourDestructive",
            });
        }
      },
}));

export default useLoginStore;