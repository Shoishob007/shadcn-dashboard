import { z } from 'zod';

export const jobSchema = z.object({
    title: z.string().min(2, "Put a valid job title"),
    designation: z.string().min(2, "Put a valid job designation"),
    description: z.string().min(10, "Put a valid job description"),
    requirements: z.string().min(8, "Put valid requirements"),
    jobCategory: z.string(),
    jobType: z.string(),
    salaryRange: z.string().min(3, "Salary range is required"),
    deadline: z.string().optional(),
});