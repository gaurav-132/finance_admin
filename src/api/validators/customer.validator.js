import { z } from "zod";

const customerSchema = z.object({
    aadhaarNumber: z
        .string({
            required_error: "Aadhaar number is required",
        })
        .min(12, { message: "Aadhaar number must be exactly 12 digits." })
        .max(12, { message: "Aadhaar number must be exactly 12 digits." })
        .refine((value) => /^[0-9]{12}$/.test(value), {
            message:
                "Aadhaar number must be exactly 12 digits and contain only numbers.",
        }),

    panNumber: z
        .string({
            required_error: "PAN number is required",
        })
        .trim()
        .length(10, { message: "PAN number must be exactly 10 characters." })
        .refine((value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value), {
            message:
            "PAN number must be exactly 10 characters and follow the format: XXXXX1234X.",
        }),

    chequePhoto: z.string().nullable(),

    firstName: z
        .string({
            required_error: "First name is required",
        })
        .min(1, { message: "First name cannot be empty." }),

    lastName: z
        .string({
            required_error: "Last name is required",
        })
        .min(1, { message: "Last name cannot be empty." }),

    mobileNumber: z
        .string({
            required_error: "Mobile number is required",
        })
        .min(10, { message: "Mobile number must be exactly 10 digits." })
        .max(10, { message: "Mobile number must be exactly 10 digits." })
        .refine((value) => /^[0-9]{10}$/.test(value), {
            message:
                "Mobile number must be exactly 10 digits and contain only numbers.",
        }),

    occupation: z
        .string({
            required_error: "Occupation is required",
        })
        .min(1, { message: "Occupation cannot be empty." }),

    permanentAddress: z
        .string({
            required_error: "Permanent address is required",
        })
        .min(1, { message: "Permanent address cannot be empty." }),

    currentAddress: z
        .string({
            required_error: "Current address is required",
        })
        .min(1, { message: "Current address cannot be empty." }),

    workLocation: z
        .string({
            required_error: "Work location is required",
        })
        .min(1, { message: "Work location cannot be empty." }),

    addedBy: z
        .number({
            required_error: "Added by information is required",
        })
        .min(1, { message: "Added by cannot be empty." }),
});


const collectionSchema = z.object({
    customerId: z.number({
            required_error: "Please add collection through a valid customer",
        }),
    
    loanId: z.number({
            required_error: "Please process this activity for a valid loan",
        }),
    
    amount: z.number({
            required_error: "Amount cannot be empty",
        }).min(0, "Amount must be a positive number"),
    
    date: z .string({
            required_error: "Date cannot be empty",
        })
        .transform(dateStr => {
            const parsedDate = new Date(dateStr);
            if (isNaN(parsedDate.getTime())) {
                throw new Error("Invalid date format");
            }
            return parsedDate;
        }),
    
    paymentMode: z.number({
            required_error: "Payment Mode cannot be empty",
        }).int().min(0, "Payment Mode must be a valid integer"),
});


export { customerSchema, collectionSchema };
