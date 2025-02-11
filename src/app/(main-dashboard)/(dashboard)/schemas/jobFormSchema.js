import { z } from 'zod';

export const basicInfoSchema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobRole: z.array(z.string()).optional(),
    designation: z.string().optional(),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    employeeBenefits: z.string().optional(),
    hiringStages: z.array(z.string()).optional(),
});

export const employmentSchema = z.object({
    jobType: z.string().min(1, "Job type is required"),
    employeeType: z.string().min(1, "Employee type is required"),
    salary: z.string().min(1, "Salary is required"),
    deadline: z.preprocess(
        (arg) => {
            if (typeof arg === "string") {
                return new Date(arg);
            }
            return arg;
        },
        z.date().refine((date) => date > new Date(), {
            message: "Date must be in the future",
        })
    ),
});

export const requirementsSchema = z.object({
    requirements: z.string().optional(),
        skills: z.array(z.string()).optional(),
        degreeLevel: z.array(z.string()).optional(),
        fieldOfStudy: z.array(z.string()).optional(),
});

export const locationSchema = z.object({
    address: z.string().optional(), 
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone number is required"),
    contactInfo: z.string().optional(),
});

export const jobSchema = z.object({
    title: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobRole: z.array(z.string()).optional(),
    designation: z.string().optional(),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    employeeBenefits: z.string().optional(),
    requirements: z.string().optional(),
    skills: z.array(z.string()).optional(),
    degreeLevel: z.array(z.string()).optional(),
    fieldOfStudy: z.array(z.string()).optional(),    
    jobType: z.string().min(1, "Job type is required"),
    employeeType: z.string().min(1, "Employee type is required"),

    salary: z.string().min(1, "Salary is required"),
    deadline: z.preprocess(
        (arg) => {
            if (typeof arg === "string") {
                return new Date(arg);
            }
            return arg;
        },
        z.date().refine((date) => date > new Date(), {
            message: "Date must be in the future",
        })
    ),
    address: z.string().optional(),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    contactInfo: z.string().optional(),
    hiringStages: z.array(z.string()).optional(),
});