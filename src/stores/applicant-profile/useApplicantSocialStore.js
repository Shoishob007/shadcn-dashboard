import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

const useApplicantSocialStore = create((set, get) => ({
  applicants: [],
  loading: false,

  fetchApplicants: async (token) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch applicants.");

      const data = await response.json();
      set({ applicants: data });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching applicants",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },

  addApplicant: async (token, applicantData) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applicantData),
        }
      );

      if (!response.ok) throw new Error("Failed to add applicant.");

      const newApplicant = await response.json();
      set((state) => ({ applicants: [...state.applicants, newApplicant] }));

      toast({
        title: "Success!",
        description: "Applicant added successfully.",
        variant: "ourSuccess",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error adding applicant!",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateApplicant: async (token, applicantId, updatedData) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update applicant.");

      const updatedApplicant = await response.json();
      set((state) => ({
        applicants: state.applicants.map((applicant) =>
          applicant.id === applicantId ? updatedApplicant : applicant
        ),
      }));

      toast({
        title: "Success!",
        description: "Applicant updated successfully.",
        variant: "ourSuccess",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating applicant!",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteApplicant: async (token, applicantId) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete applicant.");

      set((state) => ({
        applicants: state.applicants.filter(
          (applicant) => applicant.id !== applicantId
        ),
      }));

      toast({
        title: "Deleted!",
        description: "Applicant removed successfully.",
        variant: "ourSuccess",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting applicant!",
        description: error.message,
        variant: "ourDestructive",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useApplicantSocialStore;
