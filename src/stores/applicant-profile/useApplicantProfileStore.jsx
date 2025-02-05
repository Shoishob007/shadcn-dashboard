import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useApplicantProfileStore = create((set, get) => ({
  profileDetails: null,
  formData: {
    firstName: null,
    lastName: null,
    name: null,
    email: null,
    phone: null,
    address: null,
    bloodGroup: null,
    applicantWebsiteUrl: null,
    cv: null,
    img: null,
    designation: null,
    industryType: [],
    jobRole: [],
    skills: [],
    educations: [],
    experiences: [],
    trainingAndCertifications: [],
    academicActivity: [],
    extracurricularActivity: [],
    socialLinks: [],
  },
  loading: false,
  error: null,

  setFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  fetchApplicantProfile: async (accessToken, applicantID) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applicant profile");
      }

      const profile = await response.json();
      set({
        profileDetails: profile,
        formData: { ...get().formData, ...profile },
      });
    } catch (error) {
      console.error("Error fetching applicant profile:", error);
      set({ error: error.message });
      toast({
        title: "Error fetching profile.",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },

  saveApplicantProfile: async (token, applicantID) => {
    set({ loading: true, error: null });

    try {
      const transformedFormData = {
        ...get().formData,
        img: get().formData?.img?.id,
        cv: get().formData?.cv?.id,
        socialLinks: get().formData.socialLinks?.map((link) => ({
          socialMediaUrl: link.socialMediaUrl,
          socialMedia: link.socialMedia?.id,
        })),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transformedFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update applicant profile");
      }

      const updatedProfile = await response.json();
      set({
        profileDetails: updatedProfile,
        formData: { ...get().formData, ...updatedProfile },
      });

      toast({
        title: "Success!",
        description: "Profile updated successfully.",
        variant: "ourSuccess",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      set({ error: error.message });
      toast({
        title: "Error updating profile.",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useApplicantProfileStore;
