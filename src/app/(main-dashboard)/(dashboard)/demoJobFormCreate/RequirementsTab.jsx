import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSkillsStore } from "@/stores/job-createStore/skillStore";
import { useDegreeLevelStore } from "@/stores/job-createStore/degreeLevelStore";
import { useStudyFieldStore } from "@/stores/job-createStore/studyFieldStore";
import { TagInput } from "emblor";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { allSkills, degreeLevelData,fieldOfStudyData } from "../../../../stores/job-createStore/component/JobCreateData";

export function RequirementsTab({ form }) {
  // const [fieldOfStudy, setFieldOfStudy] = useState([]);
  // const [activeTagIndex, setActiveTagIndex] = useState(null);
  const { skillTags, addSkill, removeSkill } = useSkillsStore();
  const { degreeTags, addDegree, removeDegree } = useDegreeLevelStore();
  const { studyFieldTags, addStudyField, removeStudyField } = useStudyFieldStore();
  const { control, handleSubmit } = useForm();
  const [skillInputValue, setSkillInputValue] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [degreeInputValue, setDegreeInputValue] = useState("");
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [studyInputValue, setStudyInputValue] = useState("");
  const [studySuggestions, setStudySuggestions] = useState([]);

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInputValue(value);

    // Filter skills dynamically
    if (value) {
      const filtered = allSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(value.toLowerCase()) &&
            !skillTags.includes(skill)
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

    // Filter degrees dynamically
    if (value) {
      const filtered = degreeLevelData
        .filter(
          (degree) =>
            degree.toLowerCase().includes(value.toLowerCase()) &&
            !degreeTags.includes(degree)
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

    // Filter degrees dynamically
    if (value) {
      const filtered = fieldOfStudyData
        .filter(
          (studyField) =>
            studyField.toLowerCase().includes(value.toLowerCase()) &&
            !studyFieldTags.includes(studyField)
        )
        .slice(0, 5);
      setStudySuggestions(filtered);
    } else {
      setStudySuggestions([]);
    }
  };

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    addSkill(skill);
    setSkillInputValue("");
    setSkillSuggestions([]);
  };

  const handleDegreeSelect = (degree) => {
    addDegree(degree);
    setDegreeInputValue("");
    setDegreeSuggestions([]);
  };

  const handleStudyFieldSelect = (studyField) => {
    addStudyField(studyField);
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
            <FormControl className="dark:border-gray-300 ">
              <Textarea
                {...field}
                placeholder="List all job requirements..."
                className="min-h-[60px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Required Skills</FormLabel>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((skill, index) => (
                <div
                  key={index}
                  className="relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="absolute top-1/3 -right-3 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground"
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <input
                type="text"
                value={skillInputValue}
                onChange={handleSkillInputChange}
                placeholder="Type to search skills..."
                className="border text-sm w-full rounded-md px-3 py-2"
              />
              {skillSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                  {skillSuggestions.map((skill, index) => (
                    <li
                      key={index}
                      onClick={() => handleSkillSelect(skill)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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
      <Controller
  name="degreeLevel"
  control={control}
  render={({ field }) => (
    <div>
      <FormLabel className="font-medium">Degree Level</FormLabel>
      <div className="relative mt-2">
        <input
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
            className="relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
          >
            {degree}
            <button
              type="button"
              className="absolute top-1/3 -right-3 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground"
              onClick={() => removeDegree(degree)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
/>

<Controller
  name="studyField"
  control={control}
  render={({ field }) => (
    <div>
      <FormLabel className="font-medium">Field of Study</FormLabel>
      <div className="relative mt-2">
        <input
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
        {studyFieldTags.map((studyField, index) => (
          <div
            key={index}
            className="relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
          >
            {studyField}
            <button
              type="button"
              className="absolute top-1/3 -right-3 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground"
              onClick={() => removeStudyField(studyField)}
            >
              ×
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
