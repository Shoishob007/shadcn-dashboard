import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useApplicantProfileStore = create((set, get) => ({
  applicantDetails: null,
  industryTypes: [],
  formData: {
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "",
    applicantWebsiteUrl: "",
    designation: "",
    jobRole: [],
    industryType: [],
    cv: null,
    img: null,
    contactInfo: "",
    skills: [],
    educations: [],
    experiences: [],
    academicActivity: [],
    extracurricularActivity: [],
    trainingAndCertifications: [],
    socialLinks: [],
  },
  loading: false,
  error: null,

  setFormData: (newData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...newData,
      },
    })),

  fetchIndustryTypes: async (accessToken) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/industry-types`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch industry types");
      }

      const data = await response.json();
      set({ industryTypes: data?.docs || [] });
    } catch (error) {
      console.error("Error fetching industry types:", error);
      set({ industryTypes: [] });
      toast({
        title: "Error fetching industry types.",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  },

  fetchApplicantProfile: async (accessToken, applicantID) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applicant profile");
      }

      const profile = await response.json();

      set({
        applicantDetails: profile,
        formData: {
          ...get().formData,
          ...profile,
          industryType: Array.isArray(profile.industryType)
            ? profile.industryType.map((industry) => industry.id)
            : profile.industryType
            ? [profile.industryType.id]
            : [],
        },
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
        industryType: get().formData.industryType || [],
        socialLinks: get().formData?.socialLinks?.map((link) => ({
          socialMediaUrl: link?.socialMediaUrl,
          socialMedia: link?.socialMedia?.id,
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
        applicantDetails: updatedProfile.doc,
        formData: {
          ...get().formData,
          ...updatedProfile.doc,
          industryType: updatedProfile.doc.industryType.map(
            (industry) => industry.id
          ),
        },
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
