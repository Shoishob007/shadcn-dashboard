import React, { createContext, useContext, useState } from 'react';

const JobFormContext = createContext(undefined);

export function JobFormProvider({ children }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState([]);

  const resetFormData = () => {
    setSelectedSkills([]);
    setSelectedDegrees([]);
    setSelectedFieldsOfStudy([]);
  };

  return (
    <JobFormContext.Provider
      value={{
        selectedSkills,
        setSelectedSkills,
        selectedDegrees,
        setSelectedDegrees,
        selectedFieldsOfStudy,
        setSelectedFieldsOfStudy,
        resetFormData,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
}

export function useJobForm() {
  const context = useContext(JobFormContext);
  if (context === undefined) {
    throw new Error('useJobForm must be used within a JobFormProvider');
  }
  return context;
}