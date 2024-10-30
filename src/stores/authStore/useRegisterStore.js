import { create } from 'zustand';
import { toast } from "@/hooks/use-toast";

const useRegisterStore = create((set) => ({
    formData: {
        name: "",
        email: "",
        password: "",
        role: "org",
    },
    submitted: false,

    setFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
    })),

    resetFormData: () => set({
        formData: {
            name: "",
            email: "",
            password: "",
            role: "org",
        },
        submitted: false,
    }),

    registerUser: async (data) => {
        const { name, email, password, role } = data;
        const provider = "credentials";

        try {

            const payload = {
                name,
                provider,
                email,
                password,
                role,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(errorData.message || "Registration failed.");
            }

            set({ submitted: true });
            toast({ title: "Registration Successful" });
        } catch (error) {
            console.error("Registration Failed:", error);
            toast({ title: "Registration Failed", description: error.message });
        }
    },
}));

export default useRegisterStore;