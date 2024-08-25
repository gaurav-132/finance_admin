import { z } from "zod";

const addLocationSchema = z.object({
  locationName: z
    .string({ required_error: "Location Name is required" })
    .trim(),
});

export { addLocationSchema };
