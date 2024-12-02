import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "emblor";
import { useState } from "react";

export function RequirementsTab({ form }) {
  const [skillTags, setSkillTags] = useState([]);
  const [degreeTags, setDegreeTags] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [activeTagIndex, setActiveTagIndex] = useState(null);
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

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Required Skills</FormLabel>
            <div className="flex flex-wrap gap-2">
              <TagInput
                tags={skillTags}
                setTags={(newSkills) => {
                  setSkillTags(newSkills);
                  field.onChange(newSkills);
                }}
                placeholder="Add skills"
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
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="degreeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree Level</FormLabel>
              <div className="flex flex-wrap gap-2">
                <TagInput
                  tags={degreeTags}
                  setTags={(degreeTags) => {
                    setDegreeTags(degreeTags);
                    field.onChange(degreeTags);
                  }}
                  placeholder="Add degrees"
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
        />

        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Study</FormLabel>
              <div className="flex flex-wrap gap-2">
                <TagInput
                  tags={fieldOfStudy}
                  setTags={(fieldOfStudy) => {
                    setFieldOfStudy(fieldOfStudy);
                    field.onChange(fieldOfStudy);
                  }}
                  placeholder="Add fields Of Study"
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
        />
      </div>
    </div>
  );
}
