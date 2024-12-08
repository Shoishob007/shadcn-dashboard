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
import { StepsList } from "./components/List";
import { stepsData } from "./components/stepsData";

export function BasicInfoTab({ form }) {
  const [steps, setSteps] = useState([""]);
  const [activeTagIndex, setActiveTagIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && steps[index].trim() !== "") {
      const newSteps = [...steps];
      newSteps.push("");
      setSteps(newSteps);
    }
  };

  const handleStepSelection = (step) => {
    setInputValue(step);
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
            <FormLabel>Job Overview</FormLabel>
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

      {/* {steps.map((step, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`steps[${index}]`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2"> */}
      {/* Badge with sequential number */}
      {/* <div className="bg-black text-white rounded-full h-5 w-5 flex items-center justify-center text-sm">
                  {index + 1}
                </div> */}
      {/* <div className="text-sm flex items-center">
                  {" "}
                  Step <span> {index + 1}:</span>
                </div> */}
      {/* Input field for step */}
      {/* <FormControl>
                  <Input
                    {...field}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder={`Step ${index + 1} title`}
                    className="dark:border-gray-300"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )} */}
      {/* />
      ))} */}

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
