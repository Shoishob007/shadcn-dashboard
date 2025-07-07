/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useSkillsStore } from "@/stores/skillsStore";
import { useDegreeLevelsStore } from "@/stores/degreeLevelsStore";
import { useFieldOfStudiesStore } from "@/stores/fieldOfStudiesStore";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function RequirementsTab({ callback, accessToken }) {
  // data from stores
  const {
    skills,
    isLoading: skillsLoading,
    error: skillsError,
    fetchSkills,
  } = useSkillsStore();
  const {
    degreeLevels,
    isLoading: degreesLoading,
    error: degreesError,
    fetchDegreeLevels,
  } = useDegreeLevelsStore();
  const {
    fieldOfStudies,
    isLoading: fieldsLoading,
    error: fieldsError,
    fetchFieldOfStudies,
  } = useFieldOfStudiesStore();

  const formContext = useFormContext();
  const [skillInputValue, setSkillInputValue] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [degreeInputValue, setDegreeInputValue] = useState("");
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [studyInputValue, setStudyInputValue] = useState("");
  const [studySuggestions, setStudySuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState([]);
  const [requirementsContent, setRequirementsContent] = useState("");

  // Track initialization state
  const hasInitialized = useRef(false);
  const lastCallbackData = useRef("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  // all data on component mount
  useEffect(() => {
    if (accessToken) {
      fetchSkills(accessToken);
      fetchDegreeLevels(accessToken);
      fetchFieldOfStudies(accessToken);
    }
  }, [accessToken, fetchSkills, fetchDegreeLevels, fetchFieldOfStudies]);

  // Initialize form data once
  useEffect(() => {
    if (hasInitialized.current) return;
    if (
      skills.docs.length === 0 ||
      degreeLevels.docs.length === 0 ||
      fieldOfStudies.docs.length === 0
    )
      return;

    const defaultValues = formContext.getValues();

    if (defaultValues?.skills?.length > 0) {
      const skillsData = defaultValues.skills
        .map((skill) => {
          if (typeof skill === "object" && skill.id) {
            return skill;
          } else {
            const foundSkill = skills.docs.find((s) => s.id === skill);
            return foundSkill
              ? { id: foundSkill.id, title: foundSkill.title }
              : null;
          }
        })
        .filter(Boolean);
      setSelectedSkills(skillsData);
    }

    if (defaultValues?.degreeLevel?.length > 0) {
      const degrees = defaultValues.degreeLevel
        .map((degree) => {
          if (typeof degree === "object" && degree.id) {
            return degree;
          } else {
            const foundDegree = degreeLevels.docs.find((d) => d.id === degree);
            return foundDegree
              ? { id: foundDegree.id, title: foundDegree.title }
              : null;
          }
        })
        .filter(Boolean);
      setSelectedDegrees(degrees);
    }

    if (defaultValues?.fieldOfStudy?.length > 0) {
      const fields = defaultValues.fieldOfStudy
        .map((field) => {
          if (typeof field === "object" && field.id) {
            return field;
          } else {
            const foundField = fieldOfStudies.docs.find((f) => f.id === field);
            return foundField
              ? { id: foundField.id, title: foundField.title }
              : null;
          }
        })
        .filter(Boolean);
      setSelectedFieldsOfStudy(fields);
    }

    const requirements = defaultValues?.requirements || "";
    setRequirementsContent(requirements);
    hasInitialized.current = true;
  }, [formContext, skills.docs, degreeLevels.docs, fieldOfStudies.docs]);

  // Memoized callback to prevent recreation on every render
  const stableCallback = useCallback(callback, []);

  const updateCallback = useCallback(
    (data) => {
      const dataString = JSON.stringify(data);
      if (lastCallbackData.current !== dataString) {
        lastCallbackData.current = dataString;
        stableCallback(data);
      }
    },
    [stableCallback]
  );

  // Updating form values whenever selections change
  useEffect(() => {
    if (!hasInitialized.current) return;

    const skillIds = selectedSkills.map((skill) => skill.id);
    const degreeIds = selectedDegrees.map((degree) => degree.id);
    const fieldIds = selectedFieldsOfStudy.map((field) => field.id);

    formContext.setValue("skills", skillIds);
    formContext.setValue("degreeLevel", degreeIds);
    formContext.setValue("fieldOfStudy", fieldIds);

    const callbackData = {
      skills: skillIds,
      degreeLevel: degreeIds,
      fieldOfStudy: fieldIds,
    };

    updateCallback(callbackData);
  }, [
    selectedDegrees,
    selectedFieldsOfStudy,
    selectedSkills,
    updateCallback,
    formContext,
  ]);

  // Handling requirements
  const handleRequirementsChange = useCallback(
    (content) => {
      setRequirementsContent(content);
      formContext.setValue("requirements", content);
      // Triggerring form validation
      formContext.trigger("requirements");
    },
    [formContext]
  );

  // Skill handlers
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInputValue(value);

    if (value) {
      const filtered = skills.docs
        .filter(
          (skill) =>
            skill.title.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSkills.some((s) => s.id === skill.id)
        )
        .slice(0, 5);
      setSkillSuggestions(filtered);
    } else {
      setSkillSuggestions([]);
    }
  };

  const handleSkillSelect = (skill) => {
    const newSkills = [...selectedSkills, { id: skill.id, title: skill.title }];
    setSelectedSkills(newSkills);
    setSkillInputValue("");
    setSkillSuggestions([]);
  };

  const removeSkill = (skillId) => {
    const newSkills = selectedSkills.filter((s) => s.id !== skillId);
    setSelectedSkills(newSkills);
  };

  // Degree level
  const handleDegreeInputChange = (e) => {
    const value = e.target.value;
    setDegreeInputValue(value);

    if (value) {
      const filtered = degreeLevels.docs
        .filter(
          (degree) =>
            degree.title.toLowerCase().includes(value.toLowerCase()) &&
            !selectedDegrees.some((d) => d.id === degree.id)
        )
        .slice(0, 5);
      setDegreeSuggestions(filtered);
    } else {
      setDegreeSuggestions([]);
    }
  };

  const handleDegreeSelect = (degree) => {
    const newDegrees = [
      ...selectedDegrees,
      { id: degree.id, title: degree.title },
    ];
    setSelectedDegrees(newDegrees);
    setDegreeInputValue("");
    setDegreeSuggestions([]);
  };

  const removeDegree = (degreeId) => {
    const newDegrees = selectedDegrees.filter((d) => d.id !== degreeId);
    setSelectedDegrees(newDegrees);
  };

  // fileds of study handlers
  const handleStudyFieldInputChange = (e) => {
    const value = e.target.value;
    setStudyInputValue(value);

    if (value) {
      const filtered = fieldOfStudies.docs
        .filter(
          (field) =>
            field.title.toLowerCase().includes(value.toLowerCase()) &&
            !selectedFieldsOfStudy.some((f) => f.id === field.id)
        )
        .slice(0, 5);
      setStudySuggestions(filtered);
    } else {
      setStudySuggestions([]);
    }
  };

  const handleStudyFieldSelect = (field) => {
    const newFields = [
      ...selectedFieldsOfStudy,
      { id: field.id, title: field.title },
    ];
    setSelectedFieldsOfStudy(newFields);
    setStudyInputValue("");
    setStudySuggestions([]);
  };

  const removeFieldOfStudy = (fieldId) => {
    const newFields = selectedFieldsOfStudy.filter((f) => f.id !== fieldId);
    setSelectedFieldsOfStudy(newFields);
  };

  return (
    <div className="space-y-4">
      {/* Error messages */}
      {skillsError && (
        <div className="text-sm text-red-500">Skills error: {skillsError}</div>
      )}
      {degreesError && (
        <div className="text-sm text-red-500">
          Degree levels error: {degreesError}
        </div>
      )}
      {fieldsError && (
        <div className="text-sm text-red-500">
          Fields of study error: {fieldsError}
        </div>
      )}

      {/* Requirements editor*/}
      <FormField
        control={formContext.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Requirements</FormLabel>
            <FormControl>
              <div
                className="requirements-editor-container"
                style={{
                  isolation: "isolate",
                  position: "relative",
                  zIndex: 1,
                  pointerEvents: "auto",
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <ReactQuill
                  value={requirementsContent}
                  onChange={handleRequirementsChange}
                  modules={modules}
                  theme="snow"
                  placeholder="Detailed Job Requirements..."
                  style={{ pointerEvents: "auto" }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Skills section */}
      <FormField
        control={formContext.control}
        name="skills"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Required Skills</FormLabel>
            {skillsLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading skills...
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                    >
                      {skill.title}
                      <button
                        type="button"
                        className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeSkill(skill.id);
                        }}
                        style={{
                          zIndex: 1001,
                          pointerEvents: "auto",
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2">
                  <Input
                    type="text"
                    value={skillInputValue}
                    onChange={handleSkillInputChange}
                    placeholder="Type to search skills..."
                    className="border text-sm w-full rounded-md px-3 py-2"
                  />
                  {skillSuggestions.length > 0 && (
                    <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                      {skillSuggestions.map((skill) => (
                        <li
                          key={skill.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSkillSelect(skill);
                          }}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          style={{
                            pointerEvents: "auto",
                          }}
                        >
                          {skill.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Degree levels */}
        <FormField
          control={formContext.control}
          name="degreeLevel"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Degree Levels</FormLabel>
              {degreesLoading ? (
                <div className="text-sm text-muted-foreground">
                  Loading degree levels...
                </div>
              ) : (
                <>
                  <div className="relative mt-2">
                    <Input
                      type="text"
                      value={degreeInputValue}
                      onChange={handleDegreeInputChange}
                      placeholder="Type to search degrees..."
                      className="border text-sm w-full rounded-md px-3 py-2"
                    />
                    {degreeSuggestions.length > 0 && (
                      <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                        {degreeSuggestions.map((degree) => (
                          <li
                            key={degree.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDegreeSelect(degree);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            style={{
                              pointerEvents: "auto",
                            }}
                          >
                            {degree.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedDegrees.map((degree) => (
                      <div
                        key={degree.id}
                        className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                      >
                        {degree.title}
                        <button
                          type="button"
                          className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeDegree(degree.id);
                          }}
                          style={{
                            zIndex: 1001,
                            pointerEvents: "auto",
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        />

        {/* Fields of study */}
        <FormField
          control={formContext.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Fields of Study</FormLabel>
              {fieldsLoading ? (
                <div className="text-sm text-muted-foreground">
                  Loading fields of study...
                </div>
              ) : (
                <>
                  <div className="relative mt-2">
                    <Input
                      type="text"
                      value={studyInputValue}
                      onChange={handleStudyFieldInputChange}
                      placeholder="Type to search fields of study..."
                      className="border text-sm w-full rounded-md px-3 py-2"
                    />
                    {studySuggestions.length > 0 && (
                      <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-50 w-full">
                        {studySuggestions.map((field) => (
                          <li
                            key={field.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStudyFieldSelect(field);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            style={{
                              pointerEvents: "auto",
                            }}
                          >
                            {field.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedFieldsOfStudy.map((field) => (
                      <div
                        key={field.id}
                        className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                      >
                        {field.title}
                        <button
                          type="button"
                          className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeDegree(field.id);
                          }}
                          style={{
                            pointerEvents: "auto",
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}