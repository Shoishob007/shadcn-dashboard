import { z } from 'zod';
const passwordValidation = /^(?=.*[\d!@#$%^&*]).{6,}$/;

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z.object({
    name: z.string().min(4, "Name should be at least of 4 charachters").max(40, "Name should be no longer than 20 characters"),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long').regex(passwordValidation, { message: "Password must contain at-least a number or special character" }),
    role: z.enum(['org', 'applicant'], 'Role is required'),
});

export const forgotPassSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export const resetPassSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long').regex(passwordValidation, { message: "Password must contain at-least a number or special character" }),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long').regex(passwordValidation, { message: "Password must contain at-least a number or special character" }),

});