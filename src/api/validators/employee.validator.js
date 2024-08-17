import { z } from 'zod';

const employeeDetailsSchema = z.object({
    aadhaarNo: z.string({
        required_error: "Aadhaar No is required"
    })
    .min(12, { message: "Aadhaar number must be exactly 12 digits." })
    .max(12, { message: "Aadhaar number must be exactly 12 digits." })
    .refine(value => /^[0-9]{12}$/.test(value), {
        message: "Aadhaar number must be exactly 12 digits."
    }),

    panNo: z.string({
        required_error: "Pan No is required"
    })
    .trim()
    .length(10, { message: "Pan number must be exactly 10 characters." })
    .refine(value => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value), {
        message: "Pan number must be exactly 10 characters and follow the format: XXXXX1234X."
    }),

    allocatedLocationId: z.string({
        required_error: "Location allocation is required"
    }),

    empId: z.string({
        required_error: "Employee id is required"
    })
});


const employeeMonthlySalarySchema = z.object({
    id: z.number().optional(),
    empId: z.number({ required_error: "Select employee" }),

    month: z.number({ required_error: "Select month" }),
    year: z.number({ required_error: "Select year" }),

    paid: z.number({ required_error: "Select salary paid or not." }).nullable(),

    paidAmount: z.number({ 
        required_error: "Enter how much amount you have paid.",
    }).positive("Amount paid must be positive."),

    advanceAmountTaken: z.number({ 
        required_error: "Enter how much amount taken by employee." 
    }).positive("Advance amount must be positive."),

    totalMonthlyExpense: z.number({ 
        required_error: "Enter how much total monthly expense of employee." 
    }).positive("Total monthly expense must be positive."),
});



export { employeeDetailsSchema,  employeeMonthlySalarySchema};