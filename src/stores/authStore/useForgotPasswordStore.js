import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const useForgotPasswordStore = create((set) => ({
    email: "",
    emailSent: false,
    error: null,

    setEmail: (newEmail) => set({ email: newEmail }),
    resetState: () => set({ email: "", emailSent: false, error: null }),

    sendVerificationEmail: async (email) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            console.log("From useForgotPassStore", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Email submission failed.");
            }

            toast({
                title: "Success",
                description: "A verification link was sent to your email",
                variant: "ourSuccess",
            });

            set({ emailSent: true, error: null });
        } catch (error) {
            console.error("Error:", error);
            set({ error: error.message });
            toast({
                title: "Error",
                description: error.message,
                variant: "ourDestructive",
            });
        }
    },
}));

export default useForgotPasswordStore;