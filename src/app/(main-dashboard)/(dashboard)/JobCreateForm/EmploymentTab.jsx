// components/EmploymentTab.js
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useJobTypesStore } from "@/stores/jobTypesStore";
import { useEmployeeTypesStore } from "@/stores/employeeTypesStore";

export function EmploymentTab({ form, accessToken }) {
  // data from stores
  const {
    jobTypes,
    isLoading: typesLoading,
    error: typesError,
    fetchJobTypes,
  } = useJobTypesStore();

  const {
    employeeTypes,
    isLoading: empTypesLoading,
    error: empTypesError,
    fetchEmployeeTypes,
  } = useEmployeeTypesStore();

  // data on component mount
  useEffect(() => {
    if (accessToken) {
      fetchJobTypes(accessToken);
      fetchEmployeeTypes(accessToken);
    }
  }, [accessToken, fetchJobTypes, fetchEmployeeTypes]);

  // Initializing from form default values
  useEffect(() => {
    const formValues = form.getValues();

    if (formValues?.jobType) {
      const initialJobType =
        typeof formValues.jobType === "object" && formValues.jobType.id
          ? formValues.jobType
          : jobTypes.docs.find((j) => j.id === formValues.jobType) || null;
      if (initialJobType) {
        form.setValue("jobType", initialJobType.id);
      }
    }

    if (formValues?.employeeType) {
      const initialEmployeeType =
        typeof formValues.employeeType === "object" &&
        formValues.employeeType.id
          ? formValues.employeeType
          : employeeTypes.docs.find((e) => e.id === formValues.employeeType) ||
            null;
      if (initialEmployeeType) {
        form.setValue("employeeType", initialEmployeeType.id);
      }
    }
  }, [form, jobTypes.docs, employeeTypes.docs]);

  return (
    <div className="space-y-4">
      {/* Error messages */}
      {typesError && (
        <div className="text-sm text-red-500">
          Job types error: {typesError}
        </div>
      )}
      {empTypesError && (
        <div className="text-sm text-red-500">
          Employee types error: {empTypesError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="employeeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              {empTypesLoading ? (
                <div className="text-sm text-muted-foreground">
                  Loading employee types...
                </div>
              ) : (
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={empTypesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeTypes.docs?.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              {typesLoading ? (
                <div className="text-sm text-muted-foreground">
                  Loading job types...
                </div>
              ) : (
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={typesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.docs?.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="salary"
          type="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl className="dark:border-gray-400 ">
                <Input {...field} placeholder="e.g. 80,000 - 100,000 BDT" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl className="dark:border-gray-400 ">
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  min={0}
                  placeholder="e.g. 3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish Date</FormLabel>
              <FormControl className="dark:border-gray-400 ">
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl className="dark:border-gray-400">
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
