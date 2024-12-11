"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { BasicInfoTab } from "./BasicInfoTab";
import { EmploymentTab } from "./EmploymentTab";
import { RequirementsTab } from "./RequirementsTab";
import { LocationTab } from "./LocationTab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobSchema } from "../schemas/jobFormSchema";
import { Briefcase, GraduationCap, MapPin, ScrollText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";

const tabs = ["Basic Info", "Employment", "Requirements", "Location"];

const CreateJobForm = ({ onClose, jobId, initialData }) => {
  //   const { data: session } = useSession();
  const { toast } = useToast();
  const isEditMode = Boolean(jobId);

  const form = useForm({
    defaultValues: {
      jobStatus: initialData?.jobStatus ?? true,
      publishDate:
        initialData?.publishDate ?? new Date().toISOString().split("T")[0],
      skills: initialData?.skills ?? [],
      fieldOfStudy: initialData?.fieldOfStudy ?? [],
      degreeLevel: initialData?.degreeLevel ?? "",
      ...(initialData || {
        jobStatus: true,
      }),
    },
  });

  const { reset } = form;
  const [currentTab, setCurrentTab] = useState(0);

  const nextTab = () =>
    setCurrentTab((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
  const prevTab = () => setCurrentTab((prev) => (prev > 0 ? prev - 1 : prev));

  const handleNext = async (e) => {
    e.preventDefault();

    if (currentTab < tabs.length - 1) {
      nextTab();
    }
  };

  const onSubmit = async (data) => {
    if (isEditMode) {
      if (currentTab === tabs.length - 1) {
        toast({
          title: "Success",
          description: "Job updated successfully!",
          variant: "ourSuccess",
        });
        console.log(data);
        reset();
      } else {
        if (currentTab === tabs.length - 1) {
          toast({
            title: "Success",
            description: "Job created successfully!",
            variant: "ourSuccess",
          });
          console.log(data);
          reset();
        }
      }

      //   try {
      //     const requestData = {
      //       organization: session?.organizationId,
      //       ...data,
      //     };
      //     const response = await fetch(
      //       `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${session?.access_token}`,
      //         },
      //         body: JSON.stringify(requestData),
      //       }
      //     );
      //     if (!response.ok) {
      //       throw new Error(`Error: ${response.statusText}`);
      //     }
      //     toast({
      //       title: "Success",
      //       description: "Job created successfully!",
      //       variant: "ourSuccess",
      //     });
      //     onClose();
      //   } catch (error) {
      //     toast({
      //       title: "Error",
      //       description: "Failed to create job. Please try again.",
      //       variant: "ourDestructive",
      //     });
      //   }
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto p-6">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-lg sm:text-2xl font-semibold">
          {isEditMode ? "Edit Your Job" : "Create New Job"}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Fill in the job details across all sections below
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <Tabs value={tabs[currentTab]} className="space-y-4">
              <TabsList className="grid grid-cols-4 gap-4 dark:bg-gray-900">
                {/* Displaying only icons only on small screens */}
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="sm:flex items-center "
                  >
                    {index === 0 && <ScrollText className="w-4 h-4 mr-2" />}
                    {index === 1 && <Briefcase className="w-4 h-4 mr-2" />}
                    {index === 2 && <GraduationCap className="w-4 h-4 mr-2" />}
                    {index === 3 && <MapPin className="w-4 h-4 mr-2" />}
                    <span className="hidden sm:inline">{tab}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="Basic Info">
                <BasicInfoTab form={form} />
              </TabsContent>

              <TabsContent value="Employment">
                <EmploymentTab form={form} />
              </TabsContent>

              <TabsContent value="Requirements">
                <RequirementsTab form={form} />
              </TabsContent>

              <TabsContent value="Location">
                <LocationTab form={form} />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              className="px-2 py-1 border border-gray-400"
              onClick={onClose}
            >
              Cancel
            </Button>

            <div className="flex items-center gap-2">
              {currentTab > 0 && (
                <Button type="button" className="px-3 py-1" onClick={prevTab}>
                  Prev
                </Button>
              )}
              {currentTab < tabs.length - 1 ? (
                <Button
                  type="button"
                  className="px-3 py-1"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button className="px-3 py-1" type="submit">
                  {isEditMode ? "Update" : "Create"}
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateJobForm;
