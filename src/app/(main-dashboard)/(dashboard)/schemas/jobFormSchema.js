import { z } from 'zod';

export const basicInfoSchema = z.object({
    title: z.string().min(3, "Job title is required and must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobRole: z.string().min(1, "Job role is required"),
    designation: z.string().optional(),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    employeeBenefits: z.array(z.string()),
});

export const employmentSchema = z.object({
    jobType: z.string().min(1, "Job type is required"),
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
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    degreeLevel: z.array(z.string()).min(1, "At least one degree is required"),
    fieldOfStudy: z.array(z.string()).optional(),
});

export const locationSchema = z.object({
    address: z.string().optional(), 
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone number is required"),
    contactInfo: z.string().optional(),
});

export const jobSchema = z.object({
    title: z.string().min(3, "Job title is required and must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobRole: z.string().min(1, "Job role is required"),
    designation: z.string().optional(),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    employeeBenefits: z.array(z.string()),
    requirements: z.array(z.string()).min(1, "At least one requirement is required"),
    jobType: z.string().min(1, "Job type is required"),
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
});