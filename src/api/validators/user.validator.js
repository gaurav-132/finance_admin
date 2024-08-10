import {z} from 'zod';



const addUserSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' })
        .min(1, { message: "First name cannot be empty" })
        .max(255, { message: "First name should not be more than 255 characters" })
        .trim(),

    lastName: z.string({ required_error: 'Last name is required' })
        .min(1, { message: "Last name cannot be empty" })
        .max(255, { message: "Last name should not be more than 255 characters" })
        .trim(),

    mobile: z.string({ required_error: "Mobile is required" })
        .length(10, { message: "Phone number must be exactly 10 characters" }),

    password: z.string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(1024, { message: "Password should not be more than 1024 characters" }),

    isAdmin: z.number({ required_error: "Is admin field is required" }),

    isActive: z.number({ required_error: "Is Active field is required" }),
});


const loginSchema = z.object({
    mobile: z.string({ required_error: "Mobile is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 characters" })
        .max(10, { message: "Phone should not be more than 10 characters" }),

    password: z.string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(1024, { message: "Password should not be more than 1024 characters" }),
})




export { addUserSchema, loginSchema };