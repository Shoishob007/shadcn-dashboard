import React, { createContext, useContext, useState } from "react";

const JobFormContext = createContext(undefined);

export function JobFormProvider({ children }) {
  const [requirementsContent, setRequirementsContent] = useState(""); // Keep requirements here

  return (
    <JobFormContext.Provider
      value={{
        requirementsContent,
        setRequirementsContent,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
}

export function useJobForm() {
  const context = useContext(JobFormContext);
  if (context === undefined) {
    throw new Error("useJobForm must be used within a JobFormProvider");
  }
  return context;
}
