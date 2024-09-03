import { z } from "zod";

const addLocationSchema = z.object({
  id: z.number().optional(),
  locationName: z
    .string({ required_error: "Location Name is required" })
    .trim(),
});

export { addLocationSchema };
