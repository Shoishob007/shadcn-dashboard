import { z } from 'zod';

export const jobSchema = z.object({
    title: z.string().min(2, "Put a valid job title"),
    designation: z.string().min(2, "Put a valid job designation"),
    description: z.string().min(10, "Put a valid job description"),
    requirements: z.string().min(8, "Put valid requirements"),
    employeeBenefits: z.string().min(8, "Put valid employee benefits"),
    skills: z.string().min(8, "Put valid requirements"),
    employeeType: z.string(),
    jobRole: z.string(),
    fieldOfStudy: z.string(),
    degreeLevel: z.string(),
    jobType: z.string(),
    salary: z.number().refine((val) => !Number.isNaN(parseInt(val)), {
        message: "Expected number, received invalid input"
    }),
    yearOfExperience: z.number().refine((val) => !Number.isNaN(parseInt(val)), {
        message: "Expected number, received invalid input"
    }),
    deadline: z.string(),
    location: z.string(),

});