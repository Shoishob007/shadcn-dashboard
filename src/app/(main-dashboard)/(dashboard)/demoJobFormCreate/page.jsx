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
import {
  basicInfoSchema,
  employmentSchema,
  jobSchema,
  locationSchema,
  requirementsSchema,
} from "../schemas/jobFormSchema";
import {
  Briefcase,
  GraduationCap,
  House,
  MapPin,
  ScrollText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { orgSettings } from "../demoAppList/components/org-settings";
import PricingDialogue from "../demoJobList/components/pricingDialogue";

const tabs = ["Basic Info", "Employment", "Requirements", "Location"];

const CreateJobForm = ({
  onClose,
  jobId,
  initialData,
  isDialogOpen = false,
}) => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(Boolean(jobId));

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      // jobStatus: initialData?.jobStatus ?? true,
      // description: initialData?.description || "",
      // responsibilities: initialData?.responsibilities || [],
      // employeeBenefits: initialData?.employeeBenefits || [],
      // requirements: initialData?.requirements || [],
      // contactInfo: initialData?.contactInfo || "",
      // publishDate:
      //   initialData?.publishDate ?? new Date().toISOString().split("T")[0],
      //   address: initialData?.address || "",
      //   email: initialData?.email || "",
      // skills: initialData?.skills ?? [],
      // fieldOfStudy: initialData?.fieldOfStudy ?? [],
      // degreeLevel: initialData?.degreeLevel ?? [],
      ...(initialData || {
        jobStatus: true,
      }),
    },
  });

  const { reset, clearErrors } = form;
  const [currentTab, setCurrentTab] = useState(0);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [postCount, setPostCount] = useState(
    orgSettings.docs[0]?.numberOfJobPosted
  );
  const maxPost = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;

  const nextTab = () =>
    setCurrentTab((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
  const prevTab = () => setCurrentTab((prev) => (prev > 0 ? prev - 1 : prev));

  const validateCurrentTab = () => {
    let schema;
    switch (currentTab) {
      case 0:
        schema = basicInfoSchema;
        break;
      case 1:
        schema = employmentSchema;
        break;
      case 2:
        schema = requirementsSchema;
        break;
      case 3:
        schema = locationSchema;
        break;
      default:
        return true;
    }

    const fieldsToClear = Object.keys(schema.shape);
    fieldsToClear.forEach((field) => clearErrors(field));

    const result = schema.safeParse(form.getValues());
    if (!result.success) {
      result.error.errors.forEach((error) => {
        form.setError(error.path[0], { message: error.message });
        console.log(result.error.errors);
      });
      return false;
    }

    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (validateCurrentTab()) {
      if (currentTab < tabs.length - 1) {
        nextTab();
      }
    }
  };

  const onSubmit = async (data) => {
    console.log("right after submission :: ", data)
    if (isPricingDialogOpen) {
      return;
    }

    const result = jobSchema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        form.setError(error.path[0], { message: error.message });
      });
      console.log(result.error.errors);
      return;
    }

    if (currentTab === tabs.length - 1) {
      if (isEditMode) {
        toast({
          title: "Success",
          description: "Job updated successfully!",
          variant: "ourSuccess",
        });
        console.log(data);
        handleFormReset();
        onClose?.();
      } else {
        toast({
          title: "Success",
          description: "Job created successfully!",
          variant: "ourSuccess",
        });
        console.log(data);
        handleFormReset();
      }
    }
  };

  const handleFormReset = () => {
    reset();
    form.reset({
      skills: [],
      degreeLevel: [],
      fieldOfStudy: [],
      requirements: [],
      address: "",
      email: "",
    });
  };

  const handleDiscardEditing = () => {
    setIsEditMode(false);
    onClose?.();
    handleFormReset();
  };

  return (
    <>
      {!isDialogOpen && !isEditMode && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/demoJobFormCreate">
                Job Form
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <Card
        className={`w-full max-w-5xl mx-auto p-6 overflow-y-auto `}
      >
        <CardHeader className="text-center p-4">
          <CardTitle className="text-lg sm:text-2xl font-semibold">
            {isEditMode ? "Edit Your Job" : "Create New Job"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Fill the job details across all sections below to create a job
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <Tabs value={tabs[currentTab]} className="space-y-4">
                <TabsList className="grid grid-cols-4 gap-4 bg-gray-200 dark:bg-gray-900 px-1 py-0">
                  {/* Displaying only icons on small screens */}
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      onClick={() => setCurrentTab(index)}
                      className="sm:flex py-1 items-center data-[state=active]:border-b-2 data-[state=active]:bg-gray-900 data-[state=active]:text-gray-200 dark:data-[state=active]:bg-gray-200 dark:data-[state=active]:text-gray-900 rounded-sm"
                    >
                      {index === 0 && (
                        <ScrollText className="w-4 h-4 mr-2 shrink-0" />
                      )}
                      {index === 1 && (
                        <Briefcase className="w-4 h-4 mr-2 shrink-0" />
                      )}
                      {index === 2 && (
                        <GraduationCap className="w-4 h-4 mr-2 shrink-0" />
                      )}
                      {index === 3 && (
                        <MapPin className="w-4 h-4 mr-2 shrink-0" />
                      )}
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
                className="px-2 py-1 border border-gray-400 hover:bg-gray-200"
                onClick={handleDiscardEditing}
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
                ) : isEditMode ? (
                  <Button className="px-3 py-1" type="submit">
                    Update
                  </Button>
                ) : (
                  <Button
                    className="px-3 py-1"
                    type="submit"
                    onClick={() => {
                      if (postCount >= maxPost) {
                        setIsPricingDialogOpen(true);
                      } else {
                        setPostCount((prev) => prev + 1);
                      }
                    }}
                  >
                    Create
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {/* Rendering the Modal */}
      {isPricingDialogOpen && (
        <PricingDialogue onClose={() => setIsPricingDialogOpen(false)} />
      )}
    </>
  );
};

export default CreateJobForm;
