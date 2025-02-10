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
import { useJobForm } from "./context/JobFormContext";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function RequirementsTab({ form }) {
  const formContext = useFormContext();
  const [skillInputValue, setSkillInputValue] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [degreeInputValue, setDegreeInputValue] = useState("");
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);

  const [studyInputValue, setStudyInputValue] = useState("");
  const [studySuggestions, setStudySuggestions] = useState([]);
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

  useEffect(() => {
    const defaultValues = formContext.getValues();

    if (defaultValues?.skills?.length > 0) {
      const skills = defaultValues.skills
        .map((id) => {
          const skill = allSkills.docs.find((s) => s.id === id);
          return skill ? { id: skill.id, title: skill.title } : null;
        })
        .filter(Boolean);
      setSelectedSkills(skills);
      console.log("skills :: ", skills);
    }

    if (defaultValues?.degreeLevel?.length > 0) {
      const degrees = defaultValues.degreeLevel
        .map((id) => {
          const degree = degreeLevelData.docs.find((d) => d.id === id);
          return degree ? { id: degree.id, title: degree.title } : null;
        })
        .filter(Boolean);
      setSelectedDegrees(degrees);
      console.log("Degrees :: ", degrees);
    }

    if (defaultValues?.fieldOfStudy?.length > 0) {
      const fields = defaultValues.fieldOfStudy
        .map((id) => {
          const field = fieldOfStudyData.docs.find((f) => f.id === id);
          return field ? { id: field.id, title: field.title } : null;
        })
        .filter(Boolean);
      setSelectedFieldsOfStudy(fields);
    }

    const requirements = defaultValues?.requirements || [];
    if (Array.isArray(requirements)) {
      const content = requirements.map((item) => `<p>${item}</p>`).join("");
      setRequirementsContent(content);
    }
  }, [formContext]);

  useEffect(() => {
    const skillIds = selectedSkills.map((skill) => skill.id);
    formContext.setValue("skills", skillIds);
  }, [selectedSkills, formContext]);

  useEffect(() => {
    const degreeIds = selectedDegrees.map((degree) => degree.id);
    formContext.setValue("degreeLevel", degreeIds);
  }, [selectedDegrees, formContext]);

  useEffect(() => {
    const fieldIds = selectedFieldsOfStudy.map((field) => field.id);
    formContext.setValue("fieldOfStudy", fieldIds);
  }, [selectedFieldsOfStudy, formContext]);

  const handleRequirementsChange = (content) => {
    setRequirementsContent(content);
    const items = content
      .split("</p>")
      .map((item) => item.replace(/<p>|<br>/g, "").trim())
      .filter(Boolean);
    formContext.setValue("requirements", items, {
      shouldDirty: true,
      shouldTouch: true,
    });
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
    setSelectedSkills([
      ...selectedSkills,
      { id: skill.id, title: skill.title },
    ]);
    setSkillInputValue("");
    setSkillSuggestions([]);
  };

  const handleDegreeSelect = (degree) => {
    setSelectedDegrees([
      ...selectedDegrees,
      { id: degree.id, title: degree.title },
    ]);
    setDegreeInputValue("");
    setDegreeSuggestions([]);
  };

  const handleStudyFieldSelect = (field) => {
    setSelectedFieldsOfStudy([
      ...selectedFieldsOfStudy,
      { id: field.id, title: field.title },
    ]);
    setStudyInputValue("");
    setStudySuggestions([]);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" {...formContext.register("skills")} />
      <input type="hidden" {...formContext.register("degreeLevel")} />
      <input type="hidden" {...formContext.register("fieldOfStudy")} />

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
                    onClick={() =>
                      setSelectedSkills(
                        selectedSkills.filter((s) => s.id !== skill.id)
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <Input
                {...field}
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
                      onClick={() =>
                        setSelectedDegrees(
                          selectedDegrees.filter((d) => d.id !== degree.id)
                        )
                      }
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <Input
                  {...field}
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
            </div>
          )}
        />

        <FormField
          control={formContext.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Fields of Study</FormLabel>
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
                      onClick={() =>
                        setSelectedFieldsOfStudy(
                          selectedFieldsOfStudy.filter((f) => f.id !== field.id)
                        )
                      }
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <Input
                  {...field}
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
            </div>
          )}
        />
      </div>
    </div>
  );
}
