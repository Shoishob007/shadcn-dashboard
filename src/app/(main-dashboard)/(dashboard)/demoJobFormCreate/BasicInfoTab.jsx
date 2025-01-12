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
// import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { StepsList } from "./components/List";
import { stepsData } from "./components/stepsData";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function BasicInfoTab({ form }) {
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [responsibilitiesContent, setResponsibilitiesContent] = useState("");
  const [benefitsContent, setBenefitsContent] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };
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
                className="min-h-[70px] sm:min-h-[100px] dark:border-gray-400 "
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
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Backend Developer"
                className="dark:border-gray-400"
              />
            </FormControl>
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
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Senior Software Engineer"
                className="dark:border-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
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

      {/* Job Responsibilities */}
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
                className="dark:bg-gray-800 dark:text-gray-400"
                placeholder="Detailed Job Responsibilities..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Recruiting Steps</FormLabel>
        <StepsList
          availableSteps={stepsData}
          selectedSteps={selectedSteps}
          onStepsChange={setSelectedSteps}
        />
      </div>
    </div>
  );
}
