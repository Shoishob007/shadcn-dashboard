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
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            callbackUrl: "/",
        });

        if (result?.error) {
            console.error(result.error);
            toast({
                title: "Can't Sign in!",
                description: "Invalid credentials",
                variant: "ourDestructive",
            });
        } else if (result?.url) {
            router.push(result.url);
            toast({
                title: "Signed In!",
                description: "You have signed in successfully.",
                variant: "ourSuccess",
            });
        }
    },
}));

export default useLoginStore;