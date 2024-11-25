import { z } from 'zod';

export const jobSchema = z.object({
    title: z.string().min(2, "Put a valid job title"),
    designation: z.string().min(2, "Put a valid job designation"),
    description: z.string().min(10, "Put a valid job description"),
    requirements: z.string().min(8, "Put valid requirements"),
    skills: z.string().min(8, "Put valid requirements"),
    employeeType: z.string(),
    jobType: z.string(),
    salary: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    deadline: z.string(),
    location: z.string(),

});