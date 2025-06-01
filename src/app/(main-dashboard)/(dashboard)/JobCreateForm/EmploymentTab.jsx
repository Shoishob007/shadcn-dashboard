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
import { allEmploymentTypes, allJobTypes } from "@/stores/job-createStore/component/JobCreateData";
import { useEffect, useState } from "react";

export function EmploymentTab({ form, callback }) {
    const [selectedEmployeeType, setSelectedEmployeeType] = useState(null);
    const [employeeTypeInputValue, setEmployeeTypeInputValue] = useState("");
    const [employeeTypeSuggestions, setEmployeeTypeSuggestions] = useState([]);

      const [selectedJobType, setSelectedJobType] = useState(null);
      const [jobTypeInputValue, setJobTypeInputValue] = useState("");
      const [jobTypeSuggestions, setJobTypeSuggestions] = useState([]);

       // Initialize Job Roles and Designation from Form Values
        useEffect(() => {
          const formValues = form.getValues();

          // Initialize employeeType
          if (formValues?.employeeType) {
            const initialEmployeeType =
              typeof formValues.employeeType === "object" &&
              formValues.employeeType.id
                ? formValues.employeeType
                : allEmploymentTypes.docs.find(
                    (d) => d.id === formValues.employeeType
                  ) || null;
            setSelectedEmployeeType(initialEmployeeType);
            setEmployeeTypeInputValue(initialEmployeeType?.title || "");
          }

          // Initialize employeeType
          if (formValues?.jobType) {
            const initialJobType =
              typeof formValues.jobType === "object" && formValues.jobType.id
                ? formValues.employeeType
                : allJobTypes.docs.find((d) => d.id === formValues.jobType) ||
                  null;
            setSelectedJobType(initialJobType);
            setJobTypeInputValue(initialJobType?.title || "");
          }
        }, [form]);

        // useEffect(() => {
        //   const callbackData = {
        //     employeeType: selectedEmployeeType?.id || null,
        //     jobType: selectedJobType?.id || null,
        //   };
        //   callback(callbackData);
        // }, [callback, selectedEmployeeType?.id, selectedJobType?.id]);
      
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="employeeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Type" />
                  </SelectTrigger>
                  <SelectContent area-label="employeeType">
                    {allEmploymentTypes.docs?.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {allJobTypes.docs?.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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
