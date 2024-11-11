import { z } from 'zod';

export const jobSchema = z.object({
    jobTitle: z.string().min(2, "Put a valid job title"),
    jobDesignation: z.string().min(2, "Put a valid job designation"),
    jobDescription: z.string().min(10, "Put a valid job description"),
    jobRequirements: z.string().min(8, "Put valid requirements"),
    jobSkills: z.string().min(8, "Put valid requirements"),
    employeeType: z.string(),
    jobType: z.string(),
    jobSalary: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    jobDeadline: z.string(),
    jobLocation: z.string(),

});