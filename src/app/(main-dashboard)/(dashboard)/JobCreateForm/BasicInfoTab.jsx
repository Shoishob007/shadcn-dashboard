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
import { X } from "lucide-react";
import { useJobRolesStore } from "@/stores/jobRolesStore";
import { useDesignationsStore } from "@/stores/designationsStore";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function BasicInfoTab({ form, callback, orgID, accessToken }) {
  // Get data from stores
  const {
    jobRoles,
    isLoading: rolesLoading,
    error: rolesError,
    fetchJobRoles,
  } = useJobRolesStore();

  const {
    designations,
    isLoading: designationsLoading,
    error: designationsError,
    fetchDesignations,
  } = useDesignationsStore();

  const [benefitsContent, setBenefitsContent] = useState("");
  const [jobRoleInputValue, setJobRoleInputValue] = useState("");
  const [jobRoleSuggestions, setJobRoleSuggestions] = useState([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState([]);
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

  // Fetch data on component mount
  useEffect(() => {
    if (accessToken) {
      fetchJobRoles(accessToken, orgID);
      fetchDesignations(accessToken);
    }
  }, [accessToken, orgID, fetchJobRoles, fetchDesignations]);

  // Initialize from form default values - similar to RequirementsTab
  useEffect(() => {
    const formValues = form.getValues();

    // Initialize job roles - handle both object and ID formats
    if (formValues?.jobRole?.length > 0 && jobRoles.docs.length > 0) {
      const initialJobRoles = formValues.jobRole
        .map((jobRole) => {
          if (typeof jobRole === "object" && jobRole.id) {
            return jobRole;
          } else {
            const foundJobRole = jobRoles.docs.find((j) => j.id === jobRole);
            return foundJobRole
              ? { id: foundJobRole.id, title: foundJobRole.title }
              : null;
          }
        })
        .filter(Boolean);

      if (initialJobRoles.length > 0) {
        setSelectedJobRoles(initialJobRoles);
      }
    }

    // Initialize designation
    if (formValues?.designation && designations.docs.length > 0) {
      const designationId = formValues.designation;
      const initialDesignation = designations.docs.find(
        (d) => d.id === designationId
      );
      if (initialDesignation) {
        setDesignationInputValue(initialDesignation.title);
        form.setValue("designation", designationId);
      }
    }

    setBenefitsContent(formValues.employeeBenefits || "");
  }, [form, jobRoles.docs, designations.docs]);

  // Update form value and callback whenever selectedJobRoles changes
  useEffect(() => {
    const jobRoleIds = selectedJobRoles.map((role) => role.id);

    // Update form value
    form.setValue("jobRole", jobRoleIds);

    // Update callback
    callback({
      jobRole: jobRoleIds,
      designation: form.getValues("designation"),
    });
  }, [selectedJobRoles, form, callback]);

  // Also update callback when designation changes
  useEffect(() => {
    callback({
      jobRole: selectedJobRoles.map((role) => role.id),
      designation: form.getValues("designation"),
    });
  }, [form.watch("designation"), selectedJobRoles, callback]);

  // Job role input change handler
  const handleJobRoleInputChange = (e) => {
    const value = e.target.value;
    setJobRoleInputValue(value);

    if (value) {
      const filtered = jobRoles.docs
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

  // Job role selection handler
  const handleJobRoleSelect = (role) => {
    setSelectedJobRoles((prev) => [...prev, role]);
    setJobRoleInputValue("");
    setJobRoleSuggestions([]);
  };

  // Remove job role
  const removeJobRole = (roleId) => {
    setSelectedJobRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  // Designation handlers
  const handleDesignationInputChange = (e) => {
    const value = e.target.value;
    setDesignationInputValue(value);

    if (value) {
      const filtered = designations.docs
        .filter((designation) =>
          designation.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setDesignationSuggestions(filtered);
    } else {
      setDesignationSuggestions([]);
    }
  };

  const handleDesignationSelect = (designation) => {
    form.setValue("designation", designation.id);
    setDesignationInputValue(designation.title);
    setDesignationSuggestions([]);
  };

  const removeDesignation = () => {
    form.setValue("designation", "");
    setDesignationInputValue("");
  };

  // Benefits handler
  const handleBenefitsChange = (content) => {
    setBenefitsContent(content);
    form.setValue("employeeBenefits", content);
  };

  return (
    <div className="space-y-4">
      {/* Error messages */}
      {rolesError && (
        <div className="text-sm text-red-500">
          Job roles error: {rolesError}
        </div>
      )}
      {designationsError && (
        <div className="text-sm text-red-500">
          Designations error: {designationsError}
        </div>
      )}

      {/* Job Overview */}
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

      {/* Job Roles */}
      <FormField
        control={form.control}
        name="jobRole"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Job Roles</FormLabel>
            {rolesLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading job roles...
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      />

      {/* Designation */}
      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <div>
            <FormLabel className="font-medium">Designation</FormLabel>
            {designationsLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading designations...
              </div>
            ) : (
              <>
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
                {form.getValues("designation") && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="relative h-7 bg-gray-100 dark:bg-gray-500 dark:text-gray-200 border border-input rounded-md font-medium text-xs ps-2 pe-7 flex items-center">
                      {
                        designations.docs.find(
                          (d) => d.id === form.getValues("designation")
                        )?.title
                      }
                      <button
                        type="button"
                        className="absolute top-2/3 -right-1 -translate-y-1/2 rounded-full flex size-6 transition-colors outline-none text-muted-foreground/80 hover:text-foreground"
                        onClick={removeDesignation}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            <FormMessage />
          </div>
        )}
      />

      {/* Employee Benefits */}
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
    </div>
  );
}
