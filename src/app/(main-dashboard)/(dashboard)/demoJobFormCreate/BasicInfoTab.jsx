import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { StepsList } from "./components/List";
import { stepsData } from "./components/stepsData";
import { orgSettings } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/org-settings";
import { X } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function BasicInfoTab({ form, jobRoles = [], designations = [] }) {
  const [responsibilitiesContent, setResponsibilitiesContent] = useState("");
  const [benefitsContent, setBenefitsContent] = useState("");
  const [stepsData, setStepsData] = useState([]);
  const [stepsIds, setStepsIds] = useState([]);
  const currentSubscriptionId = orgSettings.docs[0]?.subscriptionId;

  // Job Role state
  const [jobRoleInputValue, setJobRoleInputValue] = useState("");
  const [jobRoleSuggestions, setJobRoleSuggestions] = useState([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);

  // Designation state
  const [designation, setDesignation] = useState("");
  const [designationInputValue, setDesignationInputValue] = useState("");
  const [designationSuggestions, setDesignationSuggestions] = useState([]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  useEffect(() => {
    const fetchHiringStages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages`
        );
        const data = await response.json();
        const steps = data.docs.map((step) => ({
          id: step.id,
          title: step.title,
        }));
        setStepsData(steps);

        console.log("steps ::", data);
      } catch (error) {
        console.error("Error fetching hiring stages:", error);
      }
    };

    fetchHiringStages();
  }, []);

  useEffect(() => {
    const responsibilities = form.getValues("responsibilities") || [];
    const employeeBenefits = form.getValues("employeeBenefits") || [];

    if (Array.isArray(responsibilities)) {
      const content = responsibilities.map((item) => `<p>${item}</p>`).join("");
      setResponsibilitiesContent(content);
    }

    if (Array.isArray(employeeBenefits)) {
      const content = employeeBenefits.map((item) => `<p>${item}</p>`).join("");
      setBenefitsContent(content);
    }
  }, [form]);

  const handleJobRoleInputChange = (e) => {
    const value = e.target.value;
    setJobRoleInputValue(value);

    if (value) {
      const filtered = jobRoles
        .filter(
          (role) =>
            role.title.toLowerCase().includes(value.toLowerCase()) &&
            !selectedJobRoles.includes(role.title)
        )
        .slice(0, 5);
      console.log("Filtered roles:", filtered);

      setJobRoleSuggestions(filtered);
    } else {
      setJobRoleSuggestions([]);
    }
  };

  const handleDesignationInputChange = (e) => {
    const value = e.target.value;
    setDesignationInputValue(value);

    if (value) {
      const filtered = designations
        .filter((designation) =>
          designation.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      console.log("Filtered Designations:", filtered);
      setDesignationSuggestions(filtered);
    } else {
      setDesignationSuggestions([]);
    }
  };

  const handleJobRoleSelect = (role) => {
    if (!selectedJobRoles.includes(role.title)) {
      setSelectedJobRoles([...selectedJobRoles, role.title]);
      form.setValue("jobRole", [...selectedJobRoles, role.title]);
    }
    setJobRoleInputValue("");
    setJobRoleSuggestions([]);
  };

  const handleDesignationSelect = (designation) => {
    setDesignation(designation.title);
    form.setValue("designation", designation.title);
    setDesignationInputValue(designation.title);
    setDesignationSuggestions([]);
  };

  const removeJobRole = (roleToRemove) => {
    const updatedRoles = selectedJobRoles.filter(
      (role) => role !== roleToRemove
    );
    setSelectedJobRoles(updatedRoles);
    form.setValue("jobRole", updatedRoles);
  };

  const handleResponsibilitiesChange = (content) => {
    setResponsibilitiesContent(content);

    const items = content
      .split("</p>")
      .map((item) => item.replace(/<p>|<br>/g, "").trim())
      .filter(Boolean);

    form.setValue("responsibilities", items);
  };

  const handleBenefitsChange = (content) => {
    setBenefitsContent(content);

    const items = content
      .split("</p>")
      .map((item) => item.replace(/<p>|<br>/g, "").trim())
      .filter(Boolean);

    form.setValue("employeeBenefits", items);
  };

  const handleStepsChange = (steps) => {
    const selectedIds = steps.map((step) => step.id);
    setStepsIds(selectedIds);

    form.setValue("steps", steps);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Demo Job Title"
                className="dark:border-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Overview</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Detailed Job Overview..."
                className="min-h-[70px] sm:min-h-[100px] dark:border-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Role</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedJobRoles.map((role, index) => (
                <div
                  key={index}
                  className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                >
                  {role}
                  <button
                    type="button"
                    className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                    onClick={() => removeJobRole(role)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative">
              <FormControl>
                <Input
                  value={jobRoleInputValue}
                  onChange={handleJobRoleInputChange}
                  placeholder="Type to search job roles..."
                  className="dark:border-gray-400"
                />
              </FormControl>
              {jobRoleSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                  {jobRoleSuggestions.map((role, index) => (
                    <li
                      key={index}
                      onClick={() => handleJobRoleSelect(role)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {role.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Designation</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  value={designationInputValue}
                  onChange={handleDesignationInputChange}
                  placeholder="Type to search designations..."
                  className="dark:border-gray-400"
                />
              </FormControl>
              {designationSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                  {designationSuggestions.map((designation, index) => (
                    <li
                      key={index}
                      onClick={() => handleDesignationSelect(designation)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {designation.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employeeBenefits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employee Benefits</FormLabel>
            <FormControl>
              <ReactQuill
                value={benefitsContent}
                onChange={handleBenefitsChange}
                modules={modules}
                theme="snow"
                className="dark:bg-gray-800 dark:text-gray-400"
                placeholder="Detailed Employee Benefits..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="responsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Responsibilities</FormLabel>
            <FormControl>
              <ReactQuill
                value={responsibilitiesContent}
                onChange={handleResponsibilitiesChange}
                modules={modules}
                theme="snow"
                className="dark:bg-gray-800 dark:text-gray-400 react-quill"
                placeholder="Detailed Job Responsibilities..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {currentSubscriptionId !== 1 && (
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recruiting Steps</FormLabel>
              <FormControl>
                <StepsList
                  availableSteps={stepsData}
                  selectedSteps={field.value || []}
                  onStepsChange={handleStepsChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
