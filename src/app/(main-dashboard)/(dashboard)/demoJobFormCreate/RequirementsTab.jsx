import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useSkillsStore } from "@/stores/job-createStore/skillStore";
import { useDegreeLevelStore } from "@/stores/job-createStore/degreeLevelStore";
import { useStudyFieldStore } from "@/stores/job-createStore/studyFieldStore";
import { useState, useEffect } from "react";
import {
  allSkills,
  degreeLevelData,
  fieldOfStudyData,
} from "../../../../stores/job-createStore/component/JobCreateData";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function RequirementsTab({ form }) {
  const { skillTags, addSkill, removeSkill, initializeSkills } =
    useSkillsStore();
  const { degreeTags, addDegree, removeDegree, initializeDegrees } =
    useDegreeLevelStore();
  const {
    fieldOfStudyTags,
    addFieldOfStudy,
    removeFieldOfStudy,
    initializeFieldOfStudy,
  } = useStudyFieldStore();

  const [skillInputValue, setSkillInputValue] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [degreeInputValue, setDegreeInputValue] = useState("");
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [studyInputValue, setStudyInputValue] = useState("");
  const [studySuggestions, setStudySuggestions] = useState([]);
  const [requirementsContent, setRequirementsContent] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  // Initializing store values from form default values
  useEffect(() => {
    const defaultValues = form.getValues();
    // console.log("Default Values:", defaultValues);

    if (defaultValues?.skills?.length > 0) {
      initializeSkills(defaultValues.skills);
    }

    if (defaultValues?.degreeLevel) {
      initializeDegrees([defaultValues.degreeLevel]);
    }

    if (defaultValues?.fieldOfStudy?.length > 0) {
      initializeFieldOfStudy(defaultValues.fieldOfStudy);
    }

    const requirements = form.getValues("requirements") || [];

    if (Array.isArray(requirements)) {
      const content = requirements.map((item) => `<p>${item}</p>`).join("");
      setRequirementsContent(content);
    }
  }, [form, initializeSkills, initializeDegrees, initializeFieldOfStudy]);

  const handleRequirementsChange = (content) => {
    setRequirementsContent(content);

    const items = content
      .split("</p>")
      .map((item) => item.replace(/<p>|<br>/g, "").trim())
      .filter(Boolean);

    form.setValue("requirements", items);
  };

  // Syncing form values with store state
  useEffect(() => {
    if (skillTags.length > 0) {
      form.setValue("skills", skillTags);
    }
    if (degreeTags.length > 0) {
      form.setValue("degreeLevel", degreeTags);
    }
    if (fieldOfStudyTags.length > 0) {
      form.setValue("fieldOfStudy", fieldOfStudyTags);
    }
  }, [skillTags, degreeTags, fieldOfStudyTags, form]);

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInputValue(value);

    if (value) {
      const filtered = allSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(value.toLowerCase()) &&
            !skillTags.includes(skill)
        )
        .slice(0, 5);
      if (!filtered.includes(value)) {
        filtered.push(value);
      }
      setSkillSuggestions(filtered);
    } else {
      setSkillSuggestions([]);
    }
  };

  const handleDegreeInputChange = (e) => {
    const value = e.target.value;
    setDegreeInputValue(value);

    if (value) {
      const filtered = degreeLevelData
        .filter(
          (degree) =>
            degree.toLowerCase().includes(value.toLowerCase()) &&
            !degreeTags.includes(degree)
        )
        .slice(0, 5);

      if (!filtered.includes(value)) {
        filtered.push(value);
      }
      setDegreeSuggestions(filtered);
    } else {
      setDegreeSuggestions([]);
    }
  };

  const handleStudyFieldInputChange = (e) => {
    const value = e.target.value;
    setStudyInputValue(value);

    if (value) {
      const filtered = fieldOfStudyData
        .filter(
          (studyField) =>
            studyField.toLowerCase().includes(value.toLowerCase()) &&
            !fieldOfStudyTags.includes(studyField)
        )
        .slice(0, 5);
      if (!filtered.includes(value)) {
        filtered.push(value);
      }
      setStudySuggestions(filtered);
    } else {
      setStudySuggestions([]);
    }
  };

  const handleSkillSelect = (skill) => {
    addSkill(skill);
    setSkillInputValue("");
    setSkillSuggestions([]);
  };

  const handleDegreeSelect = (degree) => {
    // Clearing existing degrees before adding new one
    initializeDegrees([]);
    addDegree(degree);
    setDegreeInputValue("");
    setDegreeSuggestions([]);
  };

  const handleStudyFieldSelect = (studyField) => {
    addFieldOfStudy(studyField);
    setStudyInputValue("");
    setStudySuggestions([]);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
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
        control={form.control}
        name="skills"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Required Skills</FormLabel>
            <div className="flex flex-wrap gap-2 mt-1">
              {skillTags.map((skill, index) => (
                <div
                  key={index}
                  className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-4 w-4"/>
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
                  {skillSuggestions.map((skill, index) => (
                    <li
                      key={index}
                      onClick={() => handleSkillSelect(skill)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {skill}
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
          control={form.control}
          name="degreeLevel"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Degree Level</FormLabel>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={degreeInputValue}
                  onChange={handleDegreeInputChange}
                  placeholder="Type to search degrees..."
                  className="border text-sm w-full rounded-md px-3 py-2"
                />
                {degreeSuggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                    {degreeSuggestions.map((degree, index) => (
                      <li
                        key={index}
                        onClick={() => handleDegreeSelect(degree)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {degree}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {degreeTags.map((degree, index) => (
                  <div
                    key={index}
                    className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                    >
                    {degree}
                    <button
                      type="button"
                      className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground"
                      onClick={() => removeDegree(degree)}
                    >
                    <X className="h-4 w-4"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <div>
              <FormLabel className="font-medium">Field of Study</FormLabel>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={studyInputValue}
                  onChange={handleStudyFieldInputChange}
                  placeholder="Type to search field of study..."
                  className="border text-sm w-full rounded-md px-3 py-2"
                />
                {studySuggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                    {studySuggestions.map((studyField, index) => (
                      <li
                        key={index}
                        onClick={() => handleStudyFieldSelect(studyField)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {studyField}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {fieldOfStudyTags.map((studyField, index) => (
                  <div
                    key={index}
                    className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                    >
                    {studyField}
                    <button
                      type="button"
                      className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground"
                      onClick={() => removeFieldOfStudy(studyField)}
                    >
                    <X className="h-4 w-4"/>
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
