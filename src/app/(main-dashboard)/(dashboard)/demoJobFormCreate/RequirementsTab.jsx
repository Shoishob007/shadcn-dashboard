/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  allSkills,
  degreeLevelData,
  fieldOfStudyData,
} from "@/stores/job-createStore/component/JobCreateData";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function RequirementsTab({ callback }) {
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

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  // Initialize from form default values
  useEffect(() => {
    const defaultValues = formContext.getValues();
    console.log("Default Values:", defaultValues);

    // Handle skills initialization
    if (defaultValues?.skills?.length > 0) {
      // Check if the skills are already in object format
      const skills = defaultValues.skills
        .map((skill) => {
          if (typeof skill === "object" && skill.id) {
            console.log("Found skill object:", skill);
            return skill;
          } else {
            // If it's just an ID, find the corresponding skill object
            const foundSkill = allSkills.docs.find((s) => s.id === skill);
            console.log("Found skill by ID:", foundSkill);
            return foundSkill
              ? { id: foundSkill.id, title: foundSkill.title }
              : null;
          }
        })
        .filter(Boolean);

      console.log("Setting initial skills:", skills);
      setSelectedSkills(skills);
    }

    // Handle degree levels initialization
    if (defaultValues?.degreeLevel?.length > 0) {
      const degrees = defaultValues.degreeLevel
        .map((degree) => {
          if (typeof degree === "object" && degree.id) {
            console.log("Found degree object:", degree);
            return degree;
          } else {
            const foundDegree = degreeLevelData.docs.find(
              (d) => d.id === degree
            );
            console.log("Found degree by ID:", foundDegree);
            return foundDegree
              ? { id: foundDegree.id, title: foundDegree.title }
              : null;
          }
        })
        .filter(Boolean);

      console.log("Setting initial degrees:", degrees);
      setSelectedDegrees(degrees);
    }

    // Handle fields of study initialization
    if (defaultValues?.fieldOfStudy?.length > 0) {
      const fields = defaultValues.fieldOfStudy
        .map((field) => {
          if (typeof field === "object" && field.id) {
            console.log("Found field object:", field);
            return field;
          } else {
            const foundField = fieldOfStudyData.docs.find(
              (f) => f.id === field
            );
            console.log("Found field by ID:", foundField);
            return foundField
              ? { id: foundField.id, title: foundField.title }
              : null;
          }
        })
        .filter(Boolean);

      console.log("Setting initial fields:", fields);
      setSelectedFieldsOfStudy(fields);
    }

    const requirements = defaultValues?.requirements || "";
    setRequirementsContent(requirements);
  }, [formContext]);

  // Updating callback with selected values whenever they change
  useEffect(() => {
    const callbackData = {
      skills: selectedSkills.map((skill) => skill.id),
      degreeLevel: selectedDegrees.map((degree) => degree.id),
      fieldOfStudy: selectedFieldsOfStudy.map((field) => field.id),
    };
    console.log("Sending callback data:", callbackData);
    callback(callbackData);
  }, [selectedSkills, selectedDegrees, selectedFieldsOfStudy]);

  const handleRequirementsChange = (content) => {
    setRequirementsContent(content);
    formContext.setValue("requirements", content);
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInputValue(value);

    if (value) {
      const filtered = allSkills.docs
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

  const handleDegreeInputChange = (e) => {
    const value = e.target.value;
    setDegreeInputValue(value);

    if (value) {
      const filtered = degreeLevelData.docs
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

  const handleStudyFieldInputChange = (e) => {
    const value = e.target.value;
    setStudyInputValue(value);

    if (value) {
      const filtered = fieldOfStudyData.docs
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

  const handleSkillSelect = (skill) => {
    const newSkills = [...selectedSkills, { id: skill.id, title: skill.title }];
    console.log("Adding skill:", skill, "New skills:", newSkills);
    setSelectedSkills(newSkills);
    setSkillInputValue("");
    setSkillSuggestions([]);
  };

  const handleDegreeSelect = (degree) => {
    const newDegrees = [
      ...selectedDegrees,
      { id: degree.id, title: degree.title },
    ];
    console.log("Adding degree:", degree, "New degrees:", newDegrees);
    setSelectedDegrees(newDegrees);
    setDegreeInputValue("");
    setDegreeSuggestions([]);
  };

  const handleStudyFieldSelect = (field) => {
    const newFields = [
      ...selectedFieldsOfStudy,
      { id: field.id, title: field.title },
    ];
    console.log("Adding field:", field, "New fields:", newFields);
    setSelectedFieldsOfStudy(newFields);
    setStudyInputValue("");
    setStudySuggestions([]);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={formContext.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Requirements</FormLabel>
            <FormControl>
              <ReactQuill
                value={requirementsContent}
                onChange={handleRequirementsChange}
                modules={modules}
                theme="snow"
                placeholder="Detailed Job Requirements..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formContext.control}
        name="skills"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Required Skills</FormLabel>
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
                    onClick={() => {
                      const newSkills = selectedSkills.filter(
                        (s) => s.id !== skill.id
                      );
                      setSelectedSkills(newSkills);
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
                <ul className="absolute bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                  {skillSuggestions.map((skill) => (
                    <li
                      key={skill.id}
                      onClick={() => handleSkillSelect(skill)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {skill.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formContext.control}
          name="degreeLevel"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Degree Levels</FormLabel>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={degreeInputValue}
                  onChange={handleDegreeInputChange}
                  placeholder="Type to search degrees..."
                  className="border text-sm w-full rounded-md px-3 py-2"
                />
                {degreeSuggestions.length > 0 && (
                  <ul className="absolute bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                    {degreeSuggestions.map((degree) => (
                      <li
                        key={degree.id}
                        onClick={() => handleDegreeSelect(degree)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
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
                      onClick={() => {
                        const newDegrees = selectedDegrees.filter(
                          (d) => d.id !== degree.id
                        );
                        setSelectedDegrees(newDegrees);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        />

        <FormField
          control={formContext.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Fields of Study</FormLabel>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={studyInputValue}
                  onChange={handleStudyFieldInputChange}
                  placeholder="Type to search fields of study..."
                  className="border text-sm w-full rounded-md px-3 py-2"
                />
                {studySuggestions.length > 0 && (
                  <ul className="absolute bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                    {studySuggestions.map((field) => (
                      <li
                        key={field.id}
                        onClick={() => handleStudyFieldSelect(field)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
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
                      onClick={() => {
                        const newFields = selectedFieldsOfStudy.filter(
                          (f) => f.id !== field.id
                        );
                        setSelectedFieldsOfStudy(newFields);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
