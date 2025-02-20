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
import { useEffect, useState, useCallback } from "react";
import { orgSettings } from "@/app/(main-dashboard)/(dashboard)/demoAppList/components/org-settings";
import { X } from "lucide-react";
import {
  allDesignation,
  allJobRoles,
} from "@/stores/job-createStore/component/JobCreateData";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function BasicInfoTab({ form, callback }) {
  const [responsibilitiesContent, setResponsibilitiesContent] = useState("");
  const [benefitsContent, setBenefitsContent] = useState("");
  const currentSubscriptionId = orgSettings.docs[0]?.subscriptionId;

  // Job Role state
  const [jobRoleInputValue, setJobRoleInputValue] = useState("");
  const [jobRoleSuggestions, setJobRoleSuggestions] = useState([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);

  // Designation state
  const [selectedDesignation, setSelectedDesignation] = useState(null);
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

  // Initialize Job Roles and Designation from Form Values
  useEffect(() => {
    const formValues = form.getValues();

    // Initialize job roles
    if (formValues?.jobRole && Array.isArray(formValues.jobRole)) {
      const initialJobRoles = formValues.jobRole
        .map((jobRole) => {
          if (typeof jobRole === "object" && jobRole.id) {
            return jobRole;
          } else {
            const foundJobRole = allJobRoles.docs.find((j) => j.id === jobRole);
            return foundJobRole
              ? { id: foundJobRole.id, title: foundJobRole.title }
              : null;
          }
        })
        .filter(Boolean);
      setSelectedJobRoles(initialJobRoles);
    }

    // Initialize designation
    if (formValues?.designation) {
      const initialDesignation =
        typeof formValues.designation === "object" && formValues.designation.id
          ? formValues.designation
          : allDesignation.docs.find((d) => d.id === formValues.designation) ||
            null;
      setSelectedDesignation(initialDesignation);
      setDesignationInputValue(initialDesignation?.title || "");
    }
  }, [form]);

  // Update Callback when Job Roles or Designation change
  useEffect(() => {
    const callbackData = {
      jobRole: selectedJobRoles.map((jobRole) => jobRole.id),
      designation: selectedDesignation?.id || null,
    };
    callback(callbackData);
  }, [callback, selectedDesignation?.id, selectedJobRoles]);

  // Initialize Responsibilities and Benefits content from Form Values
  useEffect(() => {
    setResponsibilitiesContent(form.getValues("responsibilities") || "");
    setBenefitsContent(form.getValues("employeeBenefits") || "");
  }, [form]);

  const handleJobRoleInputChange = (e) => {
    const value = e.target.value;
    setJobRoleInputValue(value);

    if (value) {
      const filtered = allJobRoles.docs
        .filter(
          (role) =>
            role.title.toLowerCase().includes(value.toLowerCase()) &&
            !selectedJobRoles.some((r) => r.id === role.id)
        )
        .slice(0, 5);
      setJobRoleSuggestions(filtered);
    } else {
      setJobRoleSuggestions([]);
    }
  };

  const handleDesignationInputChange = (e) => {
    const value = e.target.value;
    setDesignationInputValue(value);

    if (value) {
      const filtered = allDesignation.docs
        .filter(
          (designation) =>
            designation.title.toLowerCase().includes(value.toLowerCase()) &&
            (!selectedDesignation || selectedDesignation.id !== designation.id)
        )
        .slice(0, 5);
      setDesignationSuggestions(filtered);
    } else {
      setDesignationSuggestions([]);
    }
  };

  const handleJobRoleSelect = (role) => {
    setSelectedJobRoles((prevRoles) => [...prevRoles, role]);
    setJobRoleInputValue("");
    setJobRoleSuggestions([]);
  };

  const handleDesignationSelect = (designation) => {
    setSelectedDesignation(designation);
    setDesignationInputValue(designation.title);
    setDesignationSuggestions([]);
  };

  const removeJobRole = (roleId) => {
    setSelectedJobRoles((prevRoles) =>
      prevRoles.filter((role) => role.id !== roleId)
    );
  };

  const handleResponsibilitiesChange = (content) => {
    setResponsibilitiesContent(content);
    form.setValue("responsibilities", content);
  };

  const handleBenefitsChange = (content) => {
    setBenefitsContent(content);
    form.setValue("employeeBenefits", content);
  };

  return (
    <div className="space-y-4">
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
          <div>
            <FormLabel className="font-medium">Required Job Roles</FormLabel>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedJobRoles.map((role) => (
                <div
                  key={role.id}
                  className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                >
                  {role.title}
                  <button
                    type="button"
                    className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                    onClick={() => removeJobRole(role.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <Input
                type="text"
                value={jobRoleInputValue}
                onChange={handleJobRoleInputChange}
                placeholder="Type to search job roles..."
                className="border text-sm w-full rounded-md px-3 py-2"
              />
              {jobRoleSuggestions.length > 0 && (
                <ul className="absolute bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                  {jobRoleSuggestions.map((role) => (
                    <li
                      key={role.id}
                      onClick={() => handleJobRoleSelect(role)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {role.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Designation</FormLabel>
            <div className="relative mt-2">
              <Input
                type="text"
                value={designationInputValue}
                onChange={handleDesignationInputChange}
                placeholder="Type to search designations..."
                className="border text-sm w-full rounded-md px-3 py-2"
              />
              {designationSuggestions.length > 0 && (
                <ul className="absolute bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10 w-full">
                  {designationSuggestions.map((designation) => (
                    <li
                      key={designation.id}
                      onClick={() => handleDesignationSelect(designation)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {designation.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedDesignation && (
              <div className="flex flex-wrap gap-2 mt-1">
                <div
                  key={selectedDesignation.id}
                  className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
                >
                  {selectedDesignation.title}
                  <button
                    type="button"
                    className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                    onClick={() => setSelectedDesignation(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
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
    </div>
  );
}
