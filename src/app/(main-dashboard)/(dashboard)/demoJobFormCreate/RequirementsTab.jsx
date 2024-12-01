import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RequirementsTab({ form }) {
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
                className="min-h-[120px]"
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
            <FormControl className="dark:border-gray-300 ">
              <Input {...field} placeholder="e.g. React, Node.js, TypeScript" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="degreeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree Level</FormLabel>
              <FormControl className="dark:border-gray-300 ">
                <Input {...field} placeholder="e.g. Bachelor's, Master's" />
              </FormControl>
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
              <FormControl className="dark:border-gray-300 ">
                <Input
                  {...field}
                  placeholder="e.g. Computer Science, Engineering"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
