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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  basicInfoSchema,
  employmentSchema,
  jobSchema,
  locationSchema,
  requirementsSchema,
} from "../../schemas/jobFormSchema";
import {
  Briefcase,
  GraduationCap,
  Mouse as House,
  MapPin,
  ScrollText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { orgSettings } from "../../demoAppList/components/org-settings";
import PricingDialogue from "../../demoJobList/components/pricingDialogue";
import { useSession } from "next-auth/react";
import qs from "qs";
import { BasicInfoTab } from "../BasicInfoTab";
import { EmploymentTab } from "../EmploymentTab";
import { RequirementsTab } from "../RequirementsTab";
import { LocationTab } from "../LocationTab";

const tabs = ["Basic Info", "Employment", "Requirements", "Location"];

const CreateJobForm = ({
  onClose,
  jobId,
  initialData,
  isDialogOpen = false,
}) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2MGQ5MDRmLTI1MGItNDEwZS04YmI0LTQ5NzU1YzlmMTJlNyIsImNvbGxlY3Rpb24iOiJ1c2VycyIsImVtYWlsIjoiYmFkaG9uLmFsYW0zMkBnbWFpbC5jb20iLCJwcm92aWRlciI6ImNyZWRlbnRpYWxzIiwiaWF0IjoxNzM4NzUxMzM2LCJleHAiOjIxNzA3NTEzMzZ9.mOug1_RB0G1q0r9MZPMVHAR3RXpkBL1rRJEnYK9EOLY";
  const [isEditMode, setIsEditMode] = useState(Boolean(jobId));
  const [formData, setFormData] = useState({
    steps: initialData?.steps || [],
    skills: initialData?.skills || [],
    degreeLevel: initialData?.degreeLevel || [],
    fieldOfStudy: initialData?.fieldOfStudy || [],
    employeeType: initialData?.employeeType || "",
  });

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      steps: initialData?.steps || [],
      employeeType: initialData?.employeeType || "",
      skills: initialData?.skills || [],
      degreeLevel: initialData?.degreeLevel || [],
      fieldOfStudy: initialData?.fieldOfStudy || [],
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
  const [jobRoles, setJobRoles] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const maxPost = orgSettings.docs[0]?.subscriptionId === 1 ? 3 : Infinity;
  const industryTypeIds = useMemo(() => {
    return session?.industryType?.map((industry) => industry.id) || [];
  }, [session?.industryType]);

  useEffect(() => {
    if (!industryTypeIds || !accessToken) return;

    const fetchJobRoles = async () => {
      try {
        const query = qs.stringify(
          {
            where: {
              "industryType.id": {
                $in: industryTypeIds,
              },
            },
          },
          { encode: false }
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-roles?${query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.docs) {
          setJobRoles(data.docs);
          const filteredRoles = data.docs.filter((role) =>
            role.industryTypeId.some((industry) =>
              industryTypeIds.includes(industry.id)
            )
          );
          setFilteredJobRoles(filteredRoles);
        }
      } catch (error) {
        console.error("Failed to fetch job roles:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const query = qs.stringify(
          {
            where: {
              "industryType.id": {
                $in: industryTypeIds,
              },
            },
          },
          { encode: false }
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/designations?${query}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.docs) {
          setDesignations(data.docs);
          const filteredDesignations = data.docs.filter((designation) =>
            designation.industryTypeId.some((industry) =>
              industryTypeIds.includes(industry.id)
            )
          );
          setFilteredDesignations(filteredDesignations);
        }
      } catch (error) {
        console.error("Failed to fetch designations:", error);
      }
    };

    const fetchJobTypes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-types`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data.docs) {
          setJobTypes(
            data.docs.map((jobType) => ({
              id: jobType.id,
              title: jobType.title,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch job types:", error);
      }
    };

    const fetchEmployeeTypes = async () => {
      // console.log("Access Token : ", accessToken);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee-types`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data.docs) {
          setEmployeeTypes(
            data.docs.map((employeeType) => ({
              id: employeeType.id,
              title: employeeType.title,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch employee types:", error);
      }
    };

    fetchJobRoles();
    fetchDesignations();
    fetchJobTypes();
    fetchEmployeeTypes();
  }, [industryTypeIds, accessToken]);

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
      });
      return false;
    }

    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (validateCurrentTab()) {
      if (currentTab <= tabs.length - 1) {
        nextTab();
      }
    }
  };

  const onSubmit = async (data) => {
    if (isPricingDialogOpen) {
      return;
    }

    const result = jobSchema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        form.setError(error.path[0], { message: error.message });
      });
      return;
    }

    if (currentTab === tabs.length - 1) {
      const payload = {
        ...data,
        ...formData,
      };

      console.log("Payload sent :: ", payload);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error("Error:", error);
          throw new Error(`request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response data :: ", responseData)

        if (isEditMode) {
          toast({
            title: "Success!",
            description: "Job updated successfully!",
            variant: "ourSuccess",
          });
        } else {
          toast({
            title: "Success",
            description: "Job created successfully!",
            variant: "ourSuccess",
          });
          setPostCount((prev) => prev + 1);
        }

        handleFormReset();
        onClose?.();
      } catch (error) {
        console.error("Error submitting job:", error);
        toast({
          title: "Error!",
          description: "Failed to submit job. Please try again.",
          variant: "ourDestructive",
        });
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
      steps: [],
    });
    setFormData({
      skills: [],
      degreeLevel: [],
      fieldOfStudy: [],
      employeeType: "",
    });
  };

  const handleDiscardEditing = () => {
    setIsEditMode(false);
    onClose?.();
    handleFormReset();
  };

  const handleCallback = useCallback((data) => {
    setFormData(data);
    console.log("Unga Bunga Data :: ", data);
  }, []);

const handleStepCallback = useCallback((data) => {
  setFormData((prev) => ({ ...prev, ...data }));
  console.log("Steps Data :: ", data);
}, []);


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
      <Card className="w-full max-w-5xl mx-auto p-6 overflow-y-auto">
        <CardHeader className="text-center p-4">
          <CardTitle className="text-lg sm:text-2xl font-semibold">
            {isEditMode ? "Edit Your Job" : "Create New Job"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Fill the job details across all sections below to create a job
          </CardDescription>
        </CardHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <Tabs value={tabs[currentTab]} className="space-y-4">
                <TabsList className="grid grid-cols-4 gap-4 bg-gray-200 dark:bg-gray-900 px-1 py-0">
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
                  <BasicInfoTab
                    form={form}
                    jobRoles={filteredJobRoles}
                    designations={filteredDesignations}
                    callback={(x) => handleStepCallback(x)}
                  />
                </TabsContent>

                <TabsContent value="Employment">
                  <EmploymentTab
                    form={form}
                    jobTypes={jobTypes}
                    employeeTypes={employeeTypes}
                  />
                </TabsContent>

                <TabsContent value="Requirements">
                  <RequirementsTab
                    form={form}
                    callback={(x) => handleCallback(x)}
                  />
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
        </FormProvider>
      </Card>
      {isPricingDialogOpen && (
        <PricingDialogue onClose={() => setIsPricingDialogOpen(false)} />
      )}
    </>
  );
};

export default CreateJobForm;
