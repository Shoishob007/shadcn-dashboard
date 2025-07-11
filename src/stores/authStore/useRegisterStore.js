import { toast } from "@/hooks/use-toast";
import { create } from "zustand";

const useRegisterStore = create((set) => ({
  formData: {
    email: "",
    password: "",
    role: "org",
  },
  submitted: false,

  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  resetFormData: () =>
    set({
      formData: {
        email: "",
        password: "",
        role: "org",
      },
      submitted: false,
    }),

  registerUser: async (data) => {
    const { email, password, role } = data;
    const provider = "credentials";

    try {
      const payload = {
        provider,
        email,
        password,
        role,
      };

      console.log("Payload :: ", JSON.stringify(payload))

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

      console.log("Response JSON :: ", response.json())

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Registration failed.");
      }

      set({ submitted: true });
      toast({ title: "Registration Successful", variant: "ourSuccess" });
    } catch (error) {
      console.error("Registration Failed:", error);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  },
}));

export default useRegisterStore;