// // "use client";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Textarea } from "@/components/ui/textarea";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm, useFieldArray } from "react-hook-form";
// // import { jobSchema } from "../../(dashboard)/schemas/jobFormSchema";
// // import {
// //   DollarSign,
// //   FileChartColumnIncreasing,
// //   ClipboardPenLine,
// //   SlidersHorizontal,
// //   CalendarFold,
// //   MapPin,
// //   SlidersVertical,
// //   File,
// //   ALargeSmall,
// // } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";
// // import { useSession } from "next-auth/react";
// // import { v4 as uuidv4 } from "uuid";

// // const CreateJobForm = ({ onClose }) => {
// //   const { data: session } = useSession();
// //   const organizationId = session?.organizationId;
// //   const accessToken = session?.access_token;
// //   const { toast } = useToast();

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     setValue,
// //     control,
// //   } = useForm({
// //     resolver: zodResolver(jobSchema),
// //     defaultValues: {
// //       employeeType: "full-time",
// //       jobType: "onsite",
// //       skills: [{ title: "" }],
// //       fieldOfStudy: [{ title: "" }],
// //     },
// //   });

// //   const {
// //     fields: skillFields,
// //     append: appendSkill,
// //     remove: removeSkill,
// //   } = useFieldArray({
// //     control,
// //     name: "skills",
// //   });

// //   const {
// //     fields: studyFields,
// //     append: appendStudy,
// //     remove: removeStudy,
// //   } = useFieldArray({
// //     control,
// //     name: "fieldOfStudy",
// //   });

// //   const onSubmit = async (data) => {
// //     console.log("Submitting data:", data);
// //     const requestData = {
// //       job: {
// //         organization: organizationId,
// //         title: data.jobTitle,
// //         description: data.jobDescription,
// //         requirements: data.jobRequirements,
// //         salary: data.jobSalary,
// //         location: data.jobLocation,
// //         phone: data.phone,
// //         email: data.email,
// //         contactInfo: data.contactInfo,
// //         publishDate: new Date().toISOString(),
// //         deadline: new Date(data.jobDeadline).toISOString(),
// //         jobStatus: true,
// //       },
// //       jobRole: [{ id: uuidv4(), title: data.jobDesignation }],
// //       skills: data.skills.map((skill) => ({
// //         id: uuidv4(),
// //         title: skill.title,
// //       })),
// //       degreeLevel: [{ id: uuidv4(), title: data.degreeLevel }],
// //       fieldOfStudy: data.fieldOfStudy.map((study) => ({
// //         id: uuidv4(),
// //         title: study.title,
// //       })),
// //     };

// //     console.log("Request Data:", requestData);

// //     try {
// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${accessToken}`,
// //           },
// //           body: JSON.stringify(requestData),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.statusText}`);
// //       }

// //       const responseData = await response.json();
// //       console.log("API Response:", responseData);

// //       toast({
// //         title: "Success",
// //         description: "Created the job successfully!",
// //         variant: "ourSuccess",
// //       });

// //       //   onClose();
// //     } catch (error) {
// //       console.error("Error creating job:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to create the job. Please try again.",
// //         variant: "ourDestructive",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center w-full">
// //       <div className="rounded-lg w-full">
// //         <form
// //           onSubmit={() => handleSubmit(onSubmit)}
// //           className="grid grid-cols-1 gap-4 w-full"
// //         >
// //           <Card className="shadow-none border-none">
// //             <CardHeader className="text-center">
// //               <CardTitle className="text-2xl font-semibold">
// //                 Create Job
// //               </CardTitle>
// //               <CardDescription>
// //                 Please fill up all the fields to create a new job!
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobTitle" className="mb-2">
// //                   Job Title
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <ALargeSmall className="mx-3 text-gray-400 w-4" />
// //                   <Input
// //                     id="jobTitle"
// //                     name="jobTitle"
// //                     {...register("jobTitle")}
// //                     required
// //                     className="!rounded-l-none"
// //                   />
// //                 </div>
// //                 {errors.jobTitle && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobTitle.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobDesignation" className="mb-2">
// //                   Job Designation
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
// //                   <Input
// //                     id="jobDesignation"
// //                     name="jobDesignation"
// //                     {...register("jobDesignation")}
// //                     required
// //                     className="!rounded-l-none"
// //                   />
// //                 </div>
// //                 {errors.jobDesignation && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobDesignation.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobDescription" className="mb-2">
// //                   Job Description
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <File className="mx-3 text-gray-400 w-4" />
// //                   <Textarea
// //                     id="jobDescription"
// //                     name="jobDescription"
// //                     {...register("jobDescription")}
// //                     required
// //                     className="!rounded-l-none !border-l-0"
// //                   />
// //                 </div>
// //                 {errors.jobDescription && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobDescription.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobRequirements" className="mb-2">
// //                   Job Requirements
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
// //                   <Textarea
// //                     id="jobRequirements"
// //                     name="jobRequirements"
// //                     {...register("jobRequirements")}
// //                     required
// //                     className="!rounded-l-none"
// //                   />
// //                 </div>
// //                 {errors.jobRequirements && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobRequirements.message}
// //                   </span>
// //                 )}
// //               </div>

// //               {/* Skills */}
// //               <div>
// //                 <Label htmlFor="skills" className="mb-2">
// //                   Skills
// //                 </Label>
// //                 {skillFields.map((item, index) => (
// //                   <div key={item.id} className="flex items-center mb-2">
// //                     <Input
// //                       {...register(`skills.${index}.title`)}
// //                       placeholder={`Skill ${index + 1}`}
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => removeSkill(index)}
// //                       className="text-red-500 ml-2 hover:text-red-700 transition-colors duration-200"
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 ))}
// //                 <button
// //                   type="button"
// //                   onClick={() => appendSkill({ title: "" })}
// //                   className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
// //                 >
// //                   + Add Skill
// //                 </button>
// //               </div>

// //               {/* Degree Level */}
// //               <div className="flex flex-col">
// //                 <Label htmlFor="degreeLevel" className="mb-2">
// //                   Degree Level
// //                 </Label>
// //                 <Input id="degreeLevel" {...register("degreeLevel")} required />
// //                 {errors.degreeLevel && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.degreeLevel.message}
// //                   </span>
// //                 )}
// //               </div>

// //               {/* Field of Study */}
// //               <div>
// //                 <Label htmlFor="fieldOfStudy" className="mb-2">
// //                   Field of Study
// //                 </Label>
// //                 {studyFields.map((item, index) => (
// //                   <div key={item.id} className="flex items-center mb-2">
// //                     <Input
// //                       {...register(`fieldOfStudy.${index}.title`)}
// //                       placeholder={`Field of Study ${index + 1}`}
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => removeStudy(index)}
// //                       className="text-red-500 ml-2 hover:text-red-700 transition-colors duration-200"
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 ))}
// //                 <button
// //                   type="button"
// //                   onClick={() => appendStudy({ title: "" })}
// //                   className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
// //                 >
// //                   + Add Field of Study
// //                 </button>
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="phone" className="mb-2">
// //                   Phone
// //                 </Label>
// //                 <Input id="phone" {...register("phone")} required />
// //                 {errors.phone && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.phone.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="email" className="mb-2">
// //                   Email
// //                 </Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   {...register("email")}
// //                   required
// //                 />
// //                 {errors.email && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.email.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="employeeType" className="mb-2">
// //                   Employee Type
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <SlidersHorizontal className="mx-3 text-gray-400 w-4" />
// //                   <Select
// //                     id="employeeType"
// //                     name="employeeType"
// //                     onValueChange={(value) => setValue("employeeType", value)}
// //                     className="!rounded-l-none"
// //                   >
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select Category" />
// //                     </SelectTrigger>
// //                     <SelectContent position="popper">
// //                       <SelectItem value="full-time">Full-Time</SelectItem>
// //                       <SelectItem value="part-time">Part-Time</SelectItem>
// //                       <SelectItem value="contractual">Contractual</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //                 {errors.employeeType && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.employeeType.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobType" className="mb-2">
// //                   Job Type
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <SlidersVertical className="mx-3 text-gray-400 w-4" />
// //                   <Select
// //                     id="jobType"
// //                     name="jobType"
// //                     onValueChange={(value) => setValue("jobType", value)}
// //                     className="!rounded-l-none"
// //                   >
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select Nature" />
// //                     </SelectTrigger>
// //                     <SelectContent position="popper">
// //                       <SelectItem value="onsite">Onsite</SelectItem>
// //                       <SelectItem value="remote">Remote</SelectItem>
// //                       <SelectItem value="hybrid">Hybrid</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //                 {errors.jobType && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobType.message}
// //                   </span>
// //                 )}
// //               </div>

// //               <div className="grid grid-cols-2 gap-4 w-full">
// //                 <div className="flex flex-col">
// //                   <Label htmlFor="jobSalary" className="mb-2">
// //                     Job Salary
// //                   </Label>
// //                   <div className="flex items-center border dark:border-gray-200 rounded-md w-full">
// //                     <DollarSign className="mx-3 text-gray-400 w-4" />
// //                     <Input
// //                       id="jobSalary"
// //                       name="jobSalary"
// //                       {...register("jobSalary", {
// //                         required: "Salary is required",
// //                       })}
// //                       className="!rounded-l-none w-full"
// //                     />
// //                   </div>
// //                   {errors.jobSalary && (
// //                     <span className="text-xs text-red-500">
// //                       {errors.jobSalary.message}
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div className="flex flex-col">
// //                   <Label htmlFor="jobDeadline" className="mb-2">
// //                     Application Deadline
// //                   </Label>
// //                   <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                     <CalendarFold className="mx-3 text-gray-400 w-4" />
// //                     <Input
// //                       id="jobDeadline"
// //                       name="jobDeadline"
// //                       type="date"
// //                       {...register("jobDeadline")}
// //                       className="!rounded-l-none"
// //                     />
// //                   </div>
// //                   {errors.jobDeadline && (
// //                     <span className="text-xs text-red-500">
// //                       {errors.jobDeadline.message}
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="flex flex-col">
// //                 <Label htmlFor="jobLocation" className="mb-2">
// //                   Job Location
// //                 </Label>
// //                 <div className="flex items-center border dark:border-gray-200 rounded-md">
// //                   <MapPin className="mx-3 text-gray-400 w-4" />
// //                   <Input
// //                     id="jobLocation"
// //                     name="jobLocation"
// //                     {...register("jobLocation")}
// //                     className="!rounded-l-none"
// //                   />
// //                 </div>
// //                 {errors.jobLocation && (
// //                   <span className="text-xs text-red-500">
// //                     {errors.jobLocation.message}
// //                   </span>
// //                 )}
// //               </div>
// //             </CardContent>
// //             <CardFooter className="flex justify-center gap-10">
// //               <Button
// //                 variant="outline"
// //                 className="border dark:border-gray-200 dark:hover:bg-gray-900"
// //                 onClick={onClose}
// //               >
// //                 Cancel
// //               </Button>

// //               <Button type="submit" onClick={() => handleSubmit(onSubmit)}>
// //                 Create
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateJobForm;









// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { jobSchema } from "../../../schemas/jobFormSchema";
// import {
//   DollarSign,
//   FileChartColumnIncreasing,
//   File,
//   ClipboardPenLine,
//   SlidersHorizontal,
//   SlidersVertical,
//   CalendarFold,
//   MapPin,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// const CreateJobForm = ({ jobId, onClose }) => {
//   const { data: session } = useSession();
//   const [jobData, setJobData] = useState(null);

//   const organizationId = session?.organizationId;
//   const accessToken = session?.access_token;
//   const { toast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm({
//     resolver: zodResolver(jobSchema),
//     defaultValues: {
//       employeeType: "full-time",
//       jobType: "onsite",
//       skills: [],
//       jobRole: [],
//       degreeLevel: [],
//       fieldOfStudy: [],
//     },
//   });

//   useEffect(() => {
//     if (jobId) {
//       const fetchJobDetails = async () => {
//         try {
//           const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Failed to fetch job details.");
//           }

//           const data = await response.json();
//           setJobData(data);
//           reset(data);
//         } catch (error) {
//           console.error("Error fetching job details:", error);
//         }
//       };

//       fetchJobDetails();
//     }
//   }, [jobId, accessToken, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/job-details/${jobId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({ ...data, organization: organizationId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Error updating job details.");
//       }

//       toast({
//         title: "Success",
//         description: "Job details updated successfully!",
//         variant: "ourSuccess",
//       });
//       onClose();
//     } catch (error) {
//       console.error("Error updating job:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update the job. Please try again.",
//         variant: "ourDestructive",
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <div className="rounded-lg w-full">
//         <Card className="shadow-none border-none">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-semibold">Edit Job</CardTitle>
//             <CardDescription>
//               Please fill up all the fields to update the job!
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="grid grid-cols-1 gap-4 w-full"
//             >
//               <div className="flex flex-col">
//                 <Label htmlFor="title" className="mb-2">
//                   Job Title
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
//                   <Input
//                     id="title"
//                     name="title"
//                     {...register("title")}
//                     required
//                     className="!rounded-l-none"
//                     defaultValue={jobData?.title}
//                   />
//                 </div>
//                 {errors.title && (
//                   <span className="text-xs text-red-500">
//                     {errors.title.message}
//                   </span>
//                 )}
//               </div>

//               {/* Designation */}
//               <div className="flex flex-col">
//                 <Label htmlFor="designation" className="mb-2">
//                   Job Designation
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <FileChartColumnIncreasing className="mx-3 text-gray-400 w-4" />
//                   <Input
//                     id="designation"
//                     name="designation"
//                     {...register("designation")}
//                     required
//                     className="!rounded-l-none"
//                     defaultValue={jobData?.designation}
//                   />
//                 </div>
//                 {errors.designation && (
//                   <span className="text-xs text-red-500">
//                     {errors.designation.message}
//                   </span>
//                 )}
//               </div>

//               {/* Job Description */}
//               <div className="flex flex-col">
//                 <Label htmlFor="description" className="mb-2">
//                   Job Description
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <File className="mx-3 text-gray-400 w-4" />
//                   <Textarea
//                     id="description"
//                     name="description"
//                     {...register("description")}
//                     required
//                     className="!rounded-l-none !border-l-0"
//                     defaultValue={jobData?.description}
//                   />
//                 </div>
//                 {errors.description && (
//                   <span className="text-xs text-red-500">
//                     {errors.description.message}
//                   </span>
//                 )}
//               </div>

//               {/* Job Requirements */}
//               <div className="flex flex-col">
//                 <Label htmlFor="requirements" className="mb-2">
//                   Job Requirements
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <ClipboardPenLine className="mx-3 text-gray-400 w-4" />
//                   <Textarea
//                     id="requirements"
//                     name="requirements"
//                     {...register("requirements")}
//                     required
//                     className="!rounded-l-none"
//                     defaultValue={jobData?.requirements}
//                   />
//                 </div>
//                 {errors.requirements && (
//                   <span className="text-xs text-red-500">
//                     {errors.requirements.message}
//                   </span>
//                 )}
//               </div>

//               {/* Employee Type */}
//               <div className="flex flex-col">
//                 <Label htmlFor="employeeType" className="mb-2">
//                   Employee Type
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <SlidersHorizontal className="mx-3 text-gray-400 w-4" />
//                   <Select
//                     id="employeeType"
//                     name="employeeType"
//                     onValueChange={(value) => setValue("employeeType", value)}
//                     className="!rounded-l-none"
//                     defaultValue={jobData?.employeeType}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Category" />
//                     </SelectTrigger>
//                     <SelectContent position="popper">
//                       <SelectItem value="full-time">Full-Time</SelectItem>
//                       <SelectItem value="part-time">Part-Time</SelectItem>
//                       <SelectItem value="contractual">Contractual</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {errors.employeeType && (
//                   <span className="text-xs text-red-500">
//                     {errors.employeeType.message}
//                   </span>
//                 )}
//               </div>

//               {/* Job Type */}
//               <div className="flex flex-col">
//                 <Label htmlFor="jobType" className="mb-2">
//                   Job Type
//                 </Label>
//                 <div className="flex items-center border dark:border-gray-200 rounded-md">
//                   <SlidersVertical className="mx-3 text-gray-400 w-4" />
//                   <Select
//                     id="jobType"
//                     name="jobType"
//                     onValueChange={(value) => setValue("jobType", value)}
//                     className="!rounded-l-none"
//                     defaultValue={jobData?.jobType}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Type" />
//                     </SelectTrigger>
//                     <SelectContent position="popper">
//                       <SelectItem value="onsite">Onsite</SelectItem>
//                       <SelectItem value="remote">Remote</SelectItem>
//                       <SelectItem value="hybrid">Hybrid</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {errors.jobType && (
//                   <span className="text-xs text-red-500">
//                     {errors.jobType.message}
//                   </span>
//                 )}
//               </div>

//               <div className="flex gap-4 justify-center mt-5">
//                 <Button
//                   className="!w-[150px]"
//                   variant="destructive"
//                   type="button"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </Button>
//                 <Button className="!w-[150px]" type="submit">
//                   Update
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreateJobForm;

