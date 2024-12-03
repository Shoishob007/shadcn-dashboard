import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "emblor";
import { useState } from "react";

export function BasicInfoTab({ form }) {
  const [steps, setSteps] = useState([]);
  const [activeTagIndex, setActiveTagIndex] = useState(null);
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
                placeholder="e.g. Senior Software Engineer"
                className="dark:border-gray-300"
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Detailed job description..."
                className="min-h-[70px] sm:min-h-[60px] dark:border-gray-300"
              />
            </FormControl>
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
              <Textarea
                {...field}
                placeholder="List of benefits..."
                className="min-h-[70px] sm:min-h-[60px] dark:border-gray-200"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobResponsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Responsibilities</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="List of benefits..."
                className="min-h-[70px] sm:min-h-[60px] dark:border-gray-200"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="steps"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recruiting Steps</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Place you step title"
                className="dark:border-gray-300"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={form.control}
        name="fieldOfStudy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recruiting Steps</FormLabel>
            <div className="flex flex-wrap gap-2">
              <TagInput
                tags={steps}
                setTags={(steps) => {
                  setSteps(steps);
                  field.onChange(steps);
                }}
                placeholder="Add your steps"
                styleClasses={{
                  tagList: {
                    container: "gap-1",
                  },
                  tag: {
                    body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                    closeButton:
                      "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                  },
                }}
                inlineTags={false}
                inputFieldPosition="top"
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  );
}
