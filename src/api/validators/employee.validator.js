import { z } from 'zod';

const employeeDetailsSchema = z.object({
    
    aadhaarNo: z.string({ required_error: "Aadhaar No is required" })
        .min(12, { message: "Aadhaar number must be at least 12 numbers." })
        .max(12, { message: "Aadhaar should not be more than 12 numbers." }),
    
    panNo: z.string({ required_error: "Pan No is required" })
        .trim()
        .min(10, { message: "Pan number must be at least 10 characters." })
        .max(10, { message: "Pan should not be more than 10 characters." }),
    
    allocatedLocationId: z.string({ required_error:  "Location allocation is required"})
        .min(1)
        .max(1),    

    empId: z.string({ required_error: "Employee id is required"})
});




export { employeeDetailsSchema };